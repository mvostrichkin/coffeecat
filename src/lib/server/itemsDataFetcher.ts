import { db } from '#lib/server/db/index.ts';
import { eq, type InferInsertModel } from 'drizzle-orm';
import { items, suppliers } from '#lib/server/db/schema.ts';

// Items
export const getItems = async () => {
  const result = await db.select().from(items);
  return result;
}

export const getItemById = async (id: number) => {
  const result = await db.select().from(items).where(eq(items.id, id)).limit(1);
  return result[0];
}

export const addItem = async (item: InferInsertModel<typeof items>) => {
  const result = await db.insert(items).values(item).returning({ insertedId: items.id, name: items.name });;
  return result; 
}

export const deleteItem = async (id: number) => {
  const result = await db.delete(items).where(eq(items.id, id)).returning({ deletedName: items.name });
  return result;
}

// Suppliers
export const getSuppliers = async () => {
  const result = await db.select().from(suppliers);
  return result;
}

export const getSupplierById = async (id: number) => {
  const result = await db.select().from(suppliers).where(eq(suppliers.id, id)).limit(1);
  return result[0];
}

export const addSupplier = async (supplier: InferInsertModel<typeof suppliers>) => {
  const result = await db.insert(suppliers).values(supplier).returning({ insertedId: suppliers.id, name: suppliers.name });;
  return result; 
}

export const deleteSupplier = async (id: number) => {
  const result = await db.delete(suppliers).where(eq(suppliers.id, id)).returning({ deletedName: suppliers.name });
  return result;
}
