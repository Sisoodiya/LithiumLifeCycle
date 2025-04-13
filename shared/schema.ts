import { pgTable, text, serial, integer, boolean, timestamp, doublePrecision, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Battery schema
export const batteries = pgTable("batteries", {
  id: serial("id").primaryKey(),
  batteryType: text("battery_type").notNull(),
  manufacturer: text("manufacturer").notNull(),
  modelNumber: text("model_number").notNull(),
  batteryAge: doublePrecision("battery_age").notNull(),
  capacity: doublePrecision("capacity").notNull(),
  condition: text("condition").notNull(),
  estimatedPrice: doublePrecision("estimated_price"),
  userId: integer("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBatterySchema = createInsertSchema(batteries).omit({
  id: true,
  createdAt: true,
  estimatedPrice: true,
  userId: true,
});

export type InsertBattery = z.infer<typeof insertBatterySchema>;
export type Battery = typeof batteries.$inferSelect;

// Business inquiry schema
export const businessInquiries = pgTable("business_inquiries", {
  id: serial("id").primaryKey(),
  companyName: text("company_name").notNull(),
  contactPerson: text("contact_person").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  batteryDetails: text("battery_details").notNull(),
  inquiryType: text("inquiry_type").notNull(), // "sell" or "buy"
  status: text("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBusinessInquirySchema = createInsertSchema(businessInquiries).omit({
  id: true,
  status: true,
  createdAt: true,
});

export type InsertBusinessInquiry = z.infer<typeof insertBusinessInquirySchema>;
export type BusinessInquiry = typeof businessInquiries.$inferSelect;

// Government subsidy schema
export const subsidies = pgTable("subsidies", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  region: text("region").notNull(), // federal, state, local
  type: text("type").notNull(), // tax credit, grant, rebate
  benefitAmount: text("benefit_amount").notNull(),
  eligibility: text("eligibility").notNull(),
  description: text("description").notNull(),
  status: text("status").default("active").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSubsidySchema = createInsertSchema(subsidies).omit({
  id: true,
  createdAt: true,
});

export type InsertSubsidy = z.infer<typeof insertSubsidySchema>;
export type Subsidy = typeof subsidies.$inferSelect;

// Contribution schema
export const contributions = pgTable("contributions", {
  id: serial("id").primaryKey(),
  organizationName: text("organization_name").notNull(),
  organizationType: text("organization_type").notNull(),
  contactName: text("contact_name").notNull(),
  contactEmail: text("contact_email").notNull(),
  contributionType: text("contribution_type").notNull(),
  details: text("details").notNull(),
  idea: text("idea"),
  status: text("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContributionSchema = createInsertSchema(contributions).omit({
  id: true,
  status: true,
  createdAt: true,
});

export type InsertContribution = z.infer<typeof insertContributionSchema>;
export type Contribution = typeof contributions.$inferSelect;

// Ideas schema
export const ideas = pgTable("ideas", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  author: text("author").notNull(),
  organization: text("organization"),
  tags: text("tags").array(),
  likes: integer("likes").default(0).notNull(),
  comments: integer("comments").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertIdeaSchema = createInsertSchema(ideas).omit({
  id: true,
  likes: true,
  comments: true,
  createdAt: true,
});

export type InsertIdea = z.infer<typeof insertIdeaSchema>;
export type Idea = typeof ideas.$inferSelect;

// Marketplace item schema
export const marketplaceItems = pgTable("marketplace_items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // EV batteries, energy storage, components, accessories
  description: text("description").notNull(),
  condition: text("condition").notNull(), // excellent, good, fair, poor, new
  specifications: text("specifications").notNull(),
  price: doublePrecision("price").notNull(),
  stock: integer("stock").notNull(),
  imageUrl: text("image_url"),
  sellerId: integer("seller_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMarketplaceItemSchema = createInsertSchema(marketplaceItems).omit({
  id: true,
  createdAt: true,
  sellerId: true,
});

export type InsertMarketplaceItem = z.infer<typeof insertMarketplaceItemSchema>;
export type MarketplaceItem = typeof marketplaceItems.$inferSelect;

// Pickup request schema for battery selling
export const pickupRequests = pgTable("pickup_requests", {
  id: serial("id").primaryKey(),
  batteryId: integer("battery_id").references(() => batteries.id).notNull(),
  address: text("address").notNull(),
  preferredDate: timestamp("preferred_date").notNull(),
  deliveryOption: text("delivery_option").notNull(), // pickup or dropoff
  status: text("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPickupRequestSchema = createInsertSchema(pickupRequests).omit({
  id: true,
  status: true,
  createdAt: true,
});

export type InsertPickupRequest = z.infer<typeof insertPickupRequestSchema>;
export type PickupRequest = typeof pickupRequests.$inferSelect;

// Newsletter subscribers
export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  topic: text("topic").default("all").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertNewsletterSubscriberSchema = createInsertSchema(newsletterSubscribers).omit({
  id: true,
  createdAt: true,
});

export type InsertNewsletterSubscriber = z.infer<typeof insertNewsletterSubscriberSchema>;
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;

// Market Data for analytics
export const marketData = pgTable("market_data", {
  id: serial("id").primaryKey(),
  dataType: text("data_type").notNull(), // recycled_batteries, market_value, resource_recovery
  value: doublePrecision("value").notNull(),
  unit: text("unit").notNull(),
  change: doublePrecision("change"), // percentage change
  year: integer("year").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMarketDataSchema = createInsertSchema(marketData).omit({
  id: true,
  createdAt: true,
});

export type InsertMarketData = z.infer<typeof insertMarketDataSchema>;
export type MarketData = typeof marketData.$inferSelect;

// Chart data for analytics
export const chartData = pgTable("chart_data", {
  id: serial("id").primaryKey(),
  chartType: text("chart_type").notNull(), // market_gap, recovery_rates
  data: jsonb("data").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertChartDataSchema = createInsertSchema(chartData).omit({
  id: true,
  createdAt: true,
});

export type InsertChartData = z.infer<typeof insertChartDataSchema>;
export type ChartData = typeof chartData.$inferSelect;
