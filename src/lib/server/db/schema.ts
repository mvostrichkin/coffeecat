import { pgTable, text, serial, numeric } from "drizzle-orm/pg-core";

export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  sellingPrice: numeric("selling_price", { precision: 6, scale: 2 }).notNull(),
});
