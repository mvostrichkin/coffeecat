import { getSuppliers } from '#lib/server/itemsDataFetcher.ts';

export const load = async () => {
  const suppliers = await getSuppliers();
  return { suppliers };
}
