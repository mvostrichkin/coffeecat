import type { Actions } from './$types';
import { addItem } from '#lib/server/itemsDataFetcher.ts';

export const actions = {
    default: async ({ request }) => {
      const data = await request.formData();
      const id = data.get('id');
      const name = data.get('name');
      const price = data.get('price');

      const result = await addItem({
        // id: Number(id),
        name: String(name),
        sellingPrice: String(price)
      });
      console.log(result);
      return { success: true, id: result[0].insertedId, name: result[0].name };
    }
} satisfies Actions;
