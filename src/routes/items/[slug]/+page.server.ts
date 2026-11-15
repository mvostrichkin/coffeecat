import { getItemById } from '#lib/server/data.ts';

export const load = async ({ params }) => {
  const item = await getItemById(params.slug);
  return { item };
}