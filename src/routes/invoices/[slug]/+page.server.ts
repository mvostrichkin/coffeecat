import { getInvoiceById } from '#lib/server/itemsDataFetcher.ts';
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = async ({ params }) => {
  const invoice = await getInvoiceById(params.slug);
  return { invoice };
}

// export const actions = {
//   deleteSupplier: async({ params }) => {
//     try {
//       const result = await deleteSupplier(parseInt(params.slug));
//     } catch (error) {
//       return { success: false, error: 'Невозможно удалить поставщика, от которого есть поставки.' };
//     }

//     redirect(303, `/suppliers`);
//   },
//   archiveSupplier: async({ params, request }) => {
//     const data = await request.formData();
//     console.log(data.get('archive'));
//     const result = await archiveSupplier(parseInt(params.slug), data.get('archive') !== null);
//   }
// } satisfies Actions;
