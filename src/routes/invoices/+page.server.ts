import { getInvoices } from '#lib/server/itemsDataFetcher.ts';

export const load = async () => {
  const invoices = await getInvoices();
  return { invoices };
}
