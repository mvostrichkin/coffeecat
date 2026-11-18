import type { Actions } from './$types';
import { addSupplier } from '#lib/server/itemsDataFetcher.ts';

export const actions = {
    default: async ({ request }) => {
      const data = await request.formData();

      const name = data.get('name');
      const contact_info = data.get('contact_info');

      const result = await addSupplier({
        name: String(name),
        contact_info: String(contact_info)
      });
      
      return { success: true, id: result[0].insertedId, name: result[0].name };
    }
} satisfies Actions;
