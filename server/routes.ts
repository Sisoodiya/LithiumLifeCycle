import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBatterySchema, insertBusinessInquirySchema, insertContributionSchema, insertIdeaSchema, insertNewsletterSubscriberSchema, insertPickupRequestSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { calculateBatteryPrice } from "./openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes - all prefixed with /api
  
  // Error handling middleware for Zod validation errors
  const handleZodError = (err: unknown, res: Response) => {
    if (err instanceof ZodError) {
      const validationError = fromZodError(err);
      return res.status(400).json({ error: validationError.message });
    }
    return res.status(500).json({ error: "An unexpected error occurred" });
  };

  // Market data endpoints
  app.get("/api/market-data", async (req: Request, res: Response) => {
    try {
      const marketData = await storage.getMarketData();
      res.json(marketData);
    } catch (err) {
      console.error("Error fetching market data:", err);
      res.status(500).json({ error: "Failed to fetch market data" });
    }
  });

  app.get("/api/market-data/:type", async (req: Request, res: Response) => {
    try {
      const { type } = req.params;
      const marketData = await storage.getMarketDataByType(type);
      res.json(marketData);
    } catch (err) {
      console.error(`Error fetching market data for type ${req.params.type}:`, err);
      res.status(500).json({ error: "Failed to fetch market data" });
    }
  });

  // Chart data endpoints
  app.get("/api/chart-data/:type", async (req: Request, res: Response) => {
    try {
      const { type } = req.params;
      const chartData = await storage.getChartData(type);
      if (!chartData) {
        return res.status(404).json({ error: "Chart data not found" });
      }
      res.json(chartData);
    } catch (err) {
      console.error(`Error fetching chart data for type ${req.params.type}:`, err);
      res.status(500).json({ error: "Failed to fetch chart data" });
    }
  });

  // Battery valuation endpoint
  app.post("/api/battery/valuation", async (req: Request, res: Response) => {
    try {
      const batteryData = insertBatterySchema.parse(req.body);
      const batteryPrice = await calculateBatteryPrice(
        batteryData.batteryType,
        batteryData.manufacturer,
        batteryData.modelNumber,
        batteryData.batteryAge,
        batteryData.capacity,
        batteryData.condition
      );
      res.json(batteryPrice);
    } catch (err) {
      handleZodError(err, res);
    }
  });

  // Battery submission endpoint
  app.post("/api/battery/submit", async (req: Request, res: Response) => {
    try {
      const batteryData = insertBatterySchema.parse(req.body);
      const newBattery = await storage.createBattery(batteryData);
      res.status(201).json(newBattery);
    } catch (err) {
      handleZodError(err, res);
    }
  });

  // Pickup request endpoint
  app.post("/api/pickup-request", async (req: Request, res: Response) => {
    try {
      const pickupData = insertPickupRequestSchema.parse(req.body);
      const newPickupRequest = await storage.createPickupRequest(pickupData);
      res.status(201).json(newPickupRequest);
    } catch (err) {
      handleZodError(err, res);
    }
  });

  // Business inquiry endpoints
  app.post("/api/business-inquiry", async (req: Request, res: Response) => {
    try {
      const inquiryData = insertBusinessInquirySchema.parse(req.body);
      const newInquiry = await storage.createBusinessInquiry(inquiryData);
      res.status(201).json(newInquiry);
    } catch (err) {
      handleZodError(err, res);
    }
  });

  // Subsidies endpoints
  app.get("/api/subsidies", async (req: Request, res: Response) => {
    try {
      const { search, region, type } = req.query;
      
      let subsidies;
      if (search) {
        subsidies = await storage.searchSubsidies(search.toString());
      } else if (region || type) {
        subsidies = await storage.filterSubsidies(
          region?.toString(),
          type?.toString()
        );
      } else {
        subsidies = await storage.getSubsidies();
      }
      
      res.json(subsidies);
    } catch (err) {
      console.error("Error fetching subsidies:", err);
      res.status(500).json({ error: "Failed to fetch subsidies" });
    }
  });

  // Contribution endpoints
  app.post("/api/contribution", async (req: Request, res: Response) => {
    try {
      const contributionData = insertContributionSchema.parse(req.body);
      const newContribution = await storage.createContribution(contributionData);
      res.status(201).json(newContribution);
    } catch (err) {
      handleZodError(err, res);
    }
  });

  // Ideas endpoints
  app.get("/api/ideas", async (req: Request, res: Response) => {
    try {
      const ideas = await storage.getIdeas();
      res.json(ideas);
    } catch (err) {
      console.error("Error fetching ideas:", err);
      res.status(500).json({ error: "Failed to fetch ideas" });
    }
  });

  app.post("/api/ideas", async (req: Request, res: Response) => {
    try {
      const ideaData = insertIdeaSchema.parse(req.body);
      const newIdea = await storage.createIdea(ideaData);
      res.status(201).json(newIdea);
    } catch (err) {
      handleZodError(err, res);
    }
  });

  app.post("/api/ideas/:id/like", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updatedIdea = await storage.likeIdea(parseInt(id));
      if (!updatedIdea) {
        return res.status(404).json({ error: "Idea not found" });
      }
      res.json(updatedIdea);
    } catch (err) {
      console.error(`Error liking idea ${req.params.id}:`, err);
      res.status(500).json({ error: "Failed to like idea" });
    }
  });

  // Marketplace endpoints
  app.get("/api/marketplace", async (req: Request, res: Response) => {
    try {
      const { search, category, condition } = req.query;
      
      let items;
      if (search) {
        items = await storage.searchMarketplaceItems(search.toString());
      } else if (category || condition) {
        items = await storage.filterMarketplaceItems(
          category?.toString(),
          condition?.toString()
        );
      } else {
        items = await storage.getMarketplaceItems();
      }
      
      res.json(items);
    } catch (err) {
      console.error("Error fetching marketplace items:", err);
      res.status(500).json({ error: "Failed to fetch marketplace items" });
    }
  });

  app.get("/api/marketplace/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const item = await storage.getMarketplaceItem(parseInt(id));
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.json(item);
    } catch (err) {
      console.error(`Error fetching marketplace item ${req.params.id}:`, err);
      res.status(500).json({ error: "Failed to fetch marketplace item" });
    }
  });

  // Newsletter subscription endpoint
  app.post("/api/newsletter-subscribe", async (req: Request, res: Response) => {
    try {
      const subscriberData = insertNewsletterSubscriberSchema.parse(req.body);
      const newSubscriber = await storage.addNewsletterSubscriber(subscriberData);
      res.status(201).json(newSubscriber);
    } catch (err) {
      handleZodError(err, res);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
