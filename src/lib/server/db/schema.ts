import {
  pgTable,
  integer,
  text,
  serial,
  numeric, 
  timestamp
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const items = pgTable("items", {
  id: serial("id").primaryKey(),
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

export const suppliers = pgTable("suppliers", {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  contact_info: text('contact_info'),
});
