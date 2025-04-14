// This file serves as the entry point for Vercel serverless functions
import { storage } from '../server/storage.js';

// Simple handler for Vercel serverless functions
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;

  try {
    // Handle different API endpoints
    if (path === '/api/analytics') {
      const analytics = await storage.getAnalytics();
      return res.json(analytics);
    } 
    
    else if (path === '/api/ideas') {
      const ideas = await storage.getIdeas();
      return res.json(ideas);
    } 
    
    else if (path === '/api/products') {
      const query = url.searchParams.get('q');
      let products;
      
      if (query) {
        products = await storage.searchProducts(query);
      } else {
        products = await storage.getProducts();
      }
      
      return res.json(products);
    } 
    
    else if (path === '/api/subsidies') {
      const state = url.searchParams.get('state');
      const category = url.searchParams.get('category');
      
      let subsidies;
      if (state && state !== 'all') {
        subsidies = await storage.getSubsidiesByState(state);
      } else if (category && category !== 'all') {
        subsidies = await storage.getSubsidiesByCategory(category);
      } else {
        subsidies = await storage.getSubsidies();
      }
      
      return res.json(subsidies);
    }
    
    // Handle unknown endpoints
    return res.status(404).json({ error: 'Not found' });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
