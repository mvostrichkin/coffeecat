import { relations } from "drizzle-orm";
import { pgTable, text, serial } from "drizzle-orm/pg-core";

export const suppliers = pgTable("suppliers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull()
});
