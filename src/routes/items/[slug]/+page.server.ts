import { getItemById, deleteItem } from '#lib/server/itemsDataFetcher.ts';
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = async ({ params }) => {
  const item = await getItemById(params.slug);
  return { item };
}

export const actions = {
  deleteItem: async({ params }) => {
    const result = await deleteItem(parseInt(params.slug));
    redirect(303, `/items`);
  }
} satisfies Actions;
