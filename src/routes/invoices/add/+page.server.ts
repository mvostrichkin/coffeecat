import type { Actions } from './$types';
import { addInvoice, getSuppliers, getItems } from '#lib/server/itemsDataFetcher.ts';

export const load = async () => {
  const suppliers = await getSuppliers();
  const items = await getItems();
  return { suppliers, items };
}

export const actions = {
    default: async ({ request }) => {
      const data = await request.formData();
      const invoiceDate = data.get('date');

      const result = await addInvoice({
        received_at: typeof invoiceDate === 'string' ? new Date(invoiceDate) : undefined
      });
      console.log(result);
      return { success: true };
    }
} satisfies Actions;
