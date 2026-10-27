import { relations } from "drizzle-orm";
import { pgTable, text, serial, timestamp, smallint, numeric } from "drizzle-orm/pg-core";

export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  invoiceDate: timestamp("invoice_date").defaultNow().notNull()
});

export const invoiceItems = pgTable("invoice_items", {
  id: serial("id").primaryKey(),
  invoiceId: text("invoice_id").notNull(),
  itemId: text("item_id").notNull(),
  quantity: smallint("quantity").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
});
