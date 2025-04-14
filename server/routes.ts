import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { calculateBatteryPrice } from "./gemini"; // Changed from OpenAI to Gemini
import { batteryPricingSchema, insertIdeaSchema, insertBatterySchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to get analytics data
  app.get("/api/analytics", async (req: Request, res: Response) => {
    try {
      const analytics = await storage.getAnalytics();
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch analytics data" });
    }
  });

  // Test endpoint for Gemini API
  app.get("/api/test-gemini", async (req: Request, res: Response) => {
    try {
      // Test with some sample battery data
      const testBattery = {
        type: "ev_standard",
        model: "Tata Nexon EV",
        age: 2,
        capacity: 30,
        condition: "good"
      };
      
      const estimate = await calculateBatteryPrice(testBattery);
      res.json({ success: true, estimate });
    } catch (error) {
      console.error("Gemini API test error:", error);
      res.status(500).json({ success: false, error: "Failed to test Gemini API" });
    }
  });

  // API endpoint to get battery pricing estimate
  app.post("/api/battery/price", async (req: Request, res: Response) => {
    try {
      const batteryDetails = batteryPricingSchema.parse(req.body);
      const priceEstimate = await calculateBatteryPrice(batteryDetails);
      res.json(priceEstimate);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ error: validationError.message });
      } else {
        res.status(500).json({ error: "Failed to calculate battery price" });
      }
    }
  });

  // API endpoint to save a battery entry 
  app.post("/api/battery", async (req: Request, res: Response) => {
    try {
      const batteryData = insertBatterySchema.parse(req.body);
      // Calculate price using Gemini AI for Indian market context
      const priceEstimate = await calculateBatteryPrice(batteryData);
      
      // Save battery with calculated price
      const battery = await storage.createBattery({
        ...batteryData,
        price: priceEstimate.totalPrice,
      });
      
      res.json(battery);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ error: validationError.message });
      } else {
        res.status(500).json({ error: "Failed to save battery data" });
      }
    }
  });

  // API endpoint to get all ideas
  app.get("/api/ideas", async (req: Request, res: Response) => {
    try {
      const ideas = await storage.getIdeas();
      res.json(ideas);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch ideas" });
    }
  });

  // API endpoint to submit a new idea
  app.post("/api/ideas", async (req: Request, res: Response) => {
    try {
      const ideaData = insertIdeaSchema.parse(req.body);
      const idea = await storage.createIdea(ideaData);
      res.json(idea);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ error: validationError.message });
      } else {
        res.status(500).json({ error: "Failed to save idea" });
      }
    }
  });

  // API endpoint to vote for an idea
  app.post("/api/ideas/:id/vote", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid idea ID" });
      }
      
      const updatedIdea = await storage.voteForIdea(id);
      if (!updatedIdea) {
        return res.status(404).json({ error: "Idea not found" });
      }
      
      res.json(updatedIdea);
    } catch (error) {
      res.status(500).json({ error: "Failed to vote for idea" });
    }
  });

  // API endpoint to get all products
  app.get("/api/products", async (req: Request, res: Response) => {
    try {
      const query = req.query.q as string;
      let products;
      
      if (query) {
        products = await storage.searchProducts(query);
      } else {
        products = await storage.getProducts();
      }
      
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // API endpoint to filter products
  app.post("/api/products/filter", async (req: Request, res: Response) => {
    try {
      const filters = req.body;
      const products = await storage.filterProducts(filters);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to filter products" });
    }
  });

  // API endpoint to get a single product
  app.get("/api/products/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }
      
      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // API endpoint to get all subsidies
  app.get("/api/subsidies", async (req: Request, res: Response) => {
    try {
      const state = req.query.state as string;
      const category = req.query.category as string;
      
      let subsidies;
      if (state && state !== 'all') {
        subsidies = await storage.getSubsidiesByState(state);
      } else if (category && category !== 'all') {
        subsidies = await storage.getSubsidiesByCategory(category);
      } else {
        subsidies = await storage.getSubsidies();
      }
      
      res.json(subsidies);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch subsidies" });
    }
  });

  // API endpoint to get subsidies by category
  app.get("/api/subsidies/category/:category", async (req: Request, res: Response) => {
    try {
      const category = req.params.category;
      const subsidies = await storage.getSubsidiesByCategory(category);
      res.json(subsidies);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch subsidies by category" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
