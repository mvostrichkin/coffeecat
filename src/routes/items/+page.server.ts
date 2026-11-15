import { getItems } from '#lib/server/itemsDataFetcher.ts';

export const load = async () => {
  const items = await getItems();
  return { items };
}
