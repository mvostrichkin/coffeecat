import { db } from '#lib/server/db/index.ts';
import { eq, type InferInsertModel } from 'drizzle-orm';
import { items } from '#lib/server/db/schema.ts';

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
