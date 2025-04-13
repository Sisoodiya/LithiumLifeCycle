import { pgTable, text, serial, integer, boolean, timestamp, pgEnum, jsonb, real, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Battery condition enum
export const batteryConditionEnum = pgEnum("battery_condition", [
  "excellent",
  "good",
  "fair",
  "poor",
  "damaged"
]);

// Battery type enum
export const batteryTypeEnum = pgEnum("battery_type", [
  "ev_standard",
  "ev_premium",
  "hybrid",
  "energy_storage",
  "other"
]);

// Battery schema
export const batteries = pgTable("batteries", {
  id: serial("id").primaryKey(),
  type: batteryTypeEnum("type").notNull(),
  model: text("model").notNull(),
  age: integer("age").notNull(),
  capacity: real("capacity").notNull(),
  condition: batteryConditionEnum("condition").notNull(),
  price: real("price").notNull(),
  userId: integer("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertBatterySchema = createInsertSchema(batteries).omit({
  id: true,
  price: true,
  userId: true,
  createdAt: true,
});

export const batteryPricingSchema = z.object({
  type: z.enum(["ev_standard", "ev_premium", "hybrid", "energy_storage", "other"]),
  model: z.string().min(1, "Model is required"),
  age: z.number().min(0, "Age must be a positive number"),
  capacity: z.number().min(0, "Capacity must be a positive number"),
  condition: z.enum(["excellent", "good", "fair", "poor", "damaged"]),
});

// Order schema
export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "confirmed",
  "completed",
  "cancelled"
]);

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  batteryId: integer("battery_id").references(() => batteries.id),
  status: orderStatusEnum("status").default("pending"),
  price: real("price").notNull(),
  pickupLocation: text("pickup_location"),
  isPickup: boolean("is_pickup").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
});

// Idea schema for contributions
export const ideas = pgTable("ideas", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  organization: text("organization").notNull(),
  orgType: text("org_type").notNull(),
  contactName: text("contact_name").notNull(),
  contactEmail: text("contact_email").notNull(),
  tags: text("tags").array(),
  votes: integer("votes").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertIdeaSchema = createInsertSchema(ideas).omit({
  id: true,
  votes: true,
  createdAt: true,
});

// Product schema for marketplace
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(),
  price: real("price").notNull(),
  capacity: real("capacity"),
  condition: text("condition").notNull(),
  capacityPercentage: integer("capacity_percentage"),
  image: text("image").notNull(),
  tags: text("tags").array(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
});

// Subsidy schema
export const subsidies = pgTable("subsidies", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  provider: text("provider").notNull(),
  category: text("category").notNull(),
  state: text("state"),
  eligibility: text("eligibility").notNull(),
  amount: text("amount"),
  link: text("link"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSubsidySchema = createInsertSchema(subsidies).omit({
  id: true,
  createdAt: true,
});

// Analytics schema
export const analytics = pgTable("analytics", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  value: real("value").notNull(),
  unit: text("unit"),
  category: text("category").notNull(),
  data: jsonb("data"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAnalyticsSchema = createInsertSchema(analytics).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Battery = typeof batteries.$inferSelect;
export type InsertBattery = z.infer<typeof insertBatterySchema>;
export type BatteryPricing = z.infer<typeof batteryPricingSchema>;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;

export type Idea = typeof ideas.$inferSelect;
export type InsertIdea = z.infer<typeof insertIdeaSchema>;

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type Subsidy = typeof subsidies.$inferSelect;
export type InsertSubsidy = z.infer<typeof insertSubsidySchema>;

export type Analytics = typeof analytics.$inferSelect;
export type InsertAnalytics = z.infer<typeof insertAnalyticsSchema>;
