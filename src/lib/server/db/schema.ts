import {
  pgTable,
  integer,
  text,
  serial,
  numeric, 
  timestamp,
  jsonb
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  external_id: integer("external_id").unique().notNull(),
  name: text("name").notNull(),
  sellingPrice: numeric("selling_price", { precision: 6, scale: 2 }).notNull(),
});

export const stocks = pgTable("stocks", {
  id: serial("id").primaryKey(),
  item_id: integer('item_id').unique().notNull().references(() => items.id, { onDelete: 'cascade' }),
  quantity: integer('quantity').notNull().default(0),
  updated_at: timestamp({ withTimezone: true, mode: 'date' }).notNull().default(sql`now()`),
});

export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  created_at: timestamp({ withTimezone: true, mode: 'date' }).notNull().default(sql`now()`),
  active_from: timestamp({ withTimezone: true, mode: 'date' }).notNull().default(sql`now()`),
  supplier_id: integer('supplier_id').notNull().references(() => suppliers.id, { onDelete: 'restrict' }),
  supplier_name_snapshot: text('supplier_name_snapshot').notNull(),
  items_count_snapshot: integer('items_count_snapshot').notNull(),
  total_price_snapshot: numeric("total_price_snapshot", { precision: 7, scale: 2 }).notNull(),
  status: text("status").notNull().default('draft'),
});

export const invoiceItems = pgTable("invoice_items", {
  id: serial("id").primaryKey(),
  invoice_id: integer('invoice_id').notNull().references(() => invoices.id, { onDelete: 'cascade' }),
  item_id: integer('item_id').notNull().references(() => items.id, { onDelete: 'restrict' }),
  quantity: integer('quantity').notNull(),
  unit_price: numeric("unit_price", { precision: 6, scale: 2 }).notNull(),
  name_snapshot: text('name_snapshot').notNull()
});

export const suppliers = pgTable("suppliers", {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  contact_info: text('contact_info'),
  status: text('status').notNull().default('active'),
});

export const writeoffs = pgTable('writeoffs', {
  id: serial('id').primaryKey(),
  type: text('type').notNull().default('custom'),
  reason: text('reason').notNull().default('expired'),
  status: text('status').notNull().default('pending'),
  created_at: timestamp({ withTimezone: true, mode: 'date' }).notNull().default(sql`now()`),
  active_from: timestamp({ withTimezone: true, mode: 'date' }).notNull().default(sql`now()`)
});

export const writeoffsItems = pgTable("writeoffs_items", {
  id: serial("id").primaryKey(),
  writeoff_id: integer('writeoff_id').notNull().references(() => writeoffs.id, { onDelete: 'cascade' }),
  item_id: integer('item_id').notNull().references(() => items.id, { onDelete: 'restrict' }),
  quantity: integer('quantity').notNull(),
  unit_price_snapshot: numeric("unit_price_snapshot", { precision: 6, scale: 2 }).notNull(),
  name_snapshot: text('name_snapshot').notNull()
});

export const receipts = pgTable('receipts', {
  id: serial('id').primaryKey(),
  external_id: text('external_id').notNull().unique(),
  raw: jsonb('raw').notNull(),
  type: text('type').default('sell'),
  sumSnapshot: numeric('sum_snapshot', { precision: 6, scale: 2 })
});

export const receiptsItems = pgTable('receipts_items', {
  id: serial('id').primaryKey(),
  receiptId: integer('receipt_id').notNull().references(() => receipts.id, { onDelete: 'cascade' }),
  itemId: integer('item_id').notNull().references(() => items.id, { onDelete: 'restrict' }),
  quantity: integer('quantity').notNull(),
  unitPriceSnapshot: numeric('unit_price_snapshot', { precision: 6, scale: 2 }),
  nameSnapshot: text('name_snapshot').notNull(),
});
