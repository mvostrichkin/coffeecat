import { getItemById } from '#lib/server/itemsDataFetcher.ts';

export const load = async ({ params }) => {
  const item = await getItemById(params.slug);
  return { item };
}