import { getItems } from '#lib/server/data.ts';

export const load = async () => {
  const items = await getItems();
  return { items };
}
