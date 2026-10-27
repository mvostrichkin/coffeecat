import { db } from '#lib/server/db/index.ts';
import { items, suppliers } from '#lib/server/db/schema.ts';

export const getItems = async () => {
  const result = await db.select().from(items);
  return result;
}

export const getSuppliers = async () => {
  const result = await db.select().from(suppliers);
  return result;
}
