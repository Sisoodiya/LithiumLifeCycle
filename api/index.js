// This file serves as the entry point for Vercel serverless functions
import express from 'express';
import { storage } from '../server/storage.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setup basic API routes for Vercel
app.get('/api/analytics', async (req, res) => {
  try {
    const analytics = await storage.getAnalytics();
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch analytics data' });
  }
});

app.get('/api/ideas', async (req, res) => {
  try {
    const ideas = await storage.getIdeas();
    res.json(ideas);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ideas' });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const query = req.query.q;
    let products;
    
    if (query) {
      products = await storage.searchProducts(query);
    } else {
      products = await storage.getProducts();
    }
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/subsidies', async (req, res) => {
  try {
    const state = req.query.state;
    const category = req.query.category;
    
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
    res.status(500).json({ error: 'Failed to fetch subsidies' });
  }
});

export default async function handler(req, res) {
  return app(req, res);
}
