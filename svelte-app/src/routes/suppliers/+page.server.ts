import { getSuppliers } from '#lib/server/data.ts';

export const load = async () => {
  const suppliers = await getSuppliers();
  return { suppliers };
}
