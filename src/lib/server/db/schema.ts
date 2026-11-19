import {
  pgTable,
  integer,
  text,
  serial,
  numeric, 
  timestamp
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  external_id: integer("external_id").unique().notNull(),
  name: text("name").notNull(),
  sellingPrice: numeric("selling_price", { precision: 6, scale: 2 }).notNull(),
});

export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  created_at: timestamp({ withTimezone: true, mode: 'date' }).notNull().default(sql`now()`),
  received_at: timestamp({ withTimezone: true, mode: 'date' }).notNull().default(sql`now()`),
  supplier_id: integer('supplier_id').notNull().references(() => suppliers.id, { onDelete: 'restrict' }),
  status: text("status").notNull().default('draft'),
});

export const invoiceItems = pgTable("invoice_items", {
  id: serial("id").primaryKey(),
  invoice_id: integer('invoice_id').notNull().references(() => invoices.id, { onDelete: 'cascade' }),
  item_id: integer('item_id').notNull().references(() => items.id, { onDelete: 'restrict' }),
  quantity: integer('quantity').notNull(),
  unit_price: numeric("unit_price", { precision: 6, scale: 2 }).notNull(),
});

export const suppliers = pgTable("suppliers", {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  contact_info: text('contact_info'),
  status: text('status').notNull().default('active'),
});
