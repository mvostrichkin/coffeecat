import { db } from '#lib/server/db/index.ts';
import { eq, type InferInsertModel, sql, getTableColumns } from 'drizzle-orm';
import { items, suppliers, invoices, invoiceItems, stocks } from '#lib/server/db/schema.ts';
import { OFD_TOKEN } from '$app/env/private';

// Items
export const getItems = async () => {
  const result = await db.select().from(items);
  return result;
}

export const getItemById = async (id: number) => {
  const result = await db.select({ ...getTableColumns(items), stock: stocks.quantity }).from(items).where(eq(items.id, id)).leftJoin(stocks, eq(items.id, stocks.item_id)).limit(1);
  return result[0];
}

export const addItem = async (item: InferInsertModel<typeof items>) => {
  const result = await db.insert(items).values(item).returning({ insertedId: items.id, name: items.name });;
  return result; 
}

export const deleteItem = async (id: number) => {
  const result = await db.delete(items).where(eq(items.id, id)).returning({ deletedName: items.name });
  return result;
}

// Suppliers
export const getSuppliers = async () => {
  const result = await db.select().from(suppliers);
  return result;
}

export const getSupplierById = async (id: number) => {
  const result = await db.select().from(suppliers).where(eq(suppliers.id, id)).limit(1);
  return result[0];
}

export const addSupplier = async (supplier: InferInsertModel<typeof suppliers>) => {
  const result = await db.insert(suppliers).values({
    name: supplier.name,
    contact_info: supplier.contact_info || sql`NULL`
}).returning({ insertedId: suppliers.id, name: suppliers.name });;
  return result; 
}

export const deleteSupplier = async (id: number) => {
  const result = await db.delete(suppliers).where(eq(suppliers.id, id)).returning({ deletedName: suppliers.name });
  return result;
}

export const archiveSupplier = async (id: number, archive: boolean) => {
  const result = await db.update(suppliers).set({ status: archive ? 'archived' : 'active' }).where(eq(suppliers.id, id)).returning({ updatedStatus: suppliers.status });
  return result;
}

// Invoices
export const getInvoices = async () => {
  const result = await db.select().from(invoices);
  return result;
}

export const getInvoiceById = async (id: number) => {
  const invoiceData = await db.select().from(invoices).limit(1);
  const invoiceItemsData = await db.select().from(invoiceItems).where(eq(invoiceItems.invoice_id, id));
  return { invoice: invoiceData[0], items: invoiceItemsData };
}

export const addInvoice = async (invoice: any) => {
  const result = await db.insert(invoices).values({
    received_at: invoice.received_at,
    supplier_id: 6,
    supplier_name_snapshot: 'ООО Сенсорика',
    items_count_snapshot: 2,
    total_price_snapshot: '50'
});
  return result; 
}

export const fetchOFD = async () => {
  const token = await OFDgetToken();

  console.log(`OFD Token: ${token}`);

  // const kkms = await OFDgetKkms(token);

  // console.log('kkms');
  // console.log(kkms);

  const shiftsData = await OFDgetShifts(token);

  console.log('shifts today:');
  shiftsData.kkmShifts.forEach(async (shift) => {
    console.log(`shift number ${shift.shiftNumber}`);
    let transactionsData = await OFDgetTransactions(token, shift.shiftNumber);
    console.log('transactions in this shift:');
    transactionsData.documents.forEach(transaction => {
      console.log('Чек на сумму:');
      console.log(transaction.ticket.totalSum);
    });
  });
  // console.log(shiftsData.kkmShifts[0].shiftCounters);

  return { result: 'success' };
}

const OFDgetToken = async () => {
  const response = await fetch(
    'https://universal-api.1-ofd.ru/api/rent/v2/auth',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'apiKey': OFD_TOKEN
      })
    }
  );
 
  const token = response.json().then((data) => data.token);
  return token;
}

// {
//   inn: '772465226463',
//   kkms: [
//     {
//       retailPlaceId: 1784104,
//       address: '129336, г Москва, ул Малыгина 12А',
//       title: '129336, г Москва, ул Малыгина 12А',
//       kkmRegId: '0009880487010125',
//       kkmFactoryNumber: '00307901024000',
//       fsFactoryNumber: '7380440903167390',
//       fiscalDrives: [Array],
//       kkmInternalName: '0009880487010125',
//       kkmAddress: '129336, г Москва, ул Малыгина 12А',
//       online: false
//     }
//   ]
// }
const OFDgetKkms = async (token: string) => {
  const response = await fetch(
    'https://universal-api.1-ofd.ru/api/rent/v2/organisations/323774600167753/kkms?retailPlaceId=1784104',
    {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    }
  );

  const resultJson = response.json().then((data) => data);
  return resultJson;
}

// {
//   inn: '772465226463',
//   organisationName: 'ИП Курков Кирилл Константинович',
//   kkmShifts: [
//     {
//       shiftNumber: 315,
//       dateTimeOpen: '2026-11-27T07:52:00',
//       dateTimeClose: '2026-11-27T20:10:00',
//       incomeSum: 8812,
//       cashSum: 240,
//       eCashSum: 8572,
//       returnOutcomeSum: 0,
//       returnOutcomeCashSum: 0,
//       returnOutcomeECashSum: 0,
//       returnSum: 0,
//       returnCashSum: 0,
//       returnECashSum: 0,
//       outcomeSum: 0,
//       nds10: 0,
//       nds20: 0,
//       totalSumSellCorrection: 0,
//       totalSumBuyCorrection: 0,
//       kkmName: '0009880487010125',
//       kkmAddress: '129336, 77, Москва, Малыгина, д 12А',
//       kkmNumber: '00307901024000',
//       fsNumber: '7380440903167390',
//       kkmRegId: '0009880487010125',
//       kkmSalesPoint: '129336, г Москва, ул Малыгина 12А',
//       prePayment100Sum: 0,
//       prePaymentSum: 0,
//       advanceSum: 0,
//       totalClearingSum: 8812,
//       clearingAndCreditSum: 0,
//       creditSum: 0,
//       creditPaymentSum: 0,
//       shiftCounters: {
//         quantity: 24,
//         sellsCounters: {
//           quantity: 24,
//           cashSum: 240,
//           ecashSum: 8572,
//           prepaymentSum: 0,
//           postpaymentSum: 0,
//           counterSubmissionSum: 0,
//           resultSum: 8812,
//           nds20: 0,
//           nds10: 0,
//           ndsCalculated20: 0,
//           ndsCalculated10: 0,
//           nds0: 0,
//           ndsNo: 8812
//         },
//         sellReturnsCounters: { quantity: 0, resultSum: 0 },
//         buyesCounters: { quantity: 0, resultSum: 0 },
//         buyReturnsCounters: { quantity: 0, resultSum: 0 },
//         receiptCorrectionCounters: { quantity: 0 }
//       }
//     }
//   ]
// }
const OFDgetShifts = async (token: string) => {
  const params = new URLSearchParams({
    dateFrom: '2026-11-27T00:00:00.000',
    dateTo: '2026-11-27T23:59:59',
    retailPlaceId: '1784104',
    regId: '0009880487010125'
  });
  const response = await fetch(
    `https://universal-api.1-ofd.ru/api/rent/v2/organisations/323774600167753/shifts?${params}`,
    {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    }
  );

  const resultJson = response.json().then((data) => data);
  return resultJson;
}

// {
//   inn: '772465226463',
//   title: 'ИП Курков Кирилл Константинович',
//   address: '129336, г Москва, ул Малыгина 12А',
//   kkmAddress: '129336, 77, Москва, Малыгина, д 12А',
//   kkmRegId: '0009880487010125',
//   fsFactoryNumber: '7380440903167390',
//   kkmFactoryNumber: '00307901024000',
//   documents: [ 
//     {
//       transactionDate: '2026-11-27T20:10:00',
//       fiscalSign: '690968249',
//       insertedAt: '2026-11-27T17:10:40.237Z',
//       transactionType: 'Отчет о закрытии смены',
//       kkmRegId: '0009880487010125',
//       fiscalDriveNumber: '7380440903167390',
//       fiscalDocumentNumber: 7048,
//       shiftNum: 315,
//       closeShift: [Object],
//       fnsFlcStatus: 'OK',
//       fnsStatus: 200,
//       fnsDescription: null,
//       fnsConfirmation: '{"fdId":"6640412732900899584"}'
//     },
//     {
//       transactionDate: '2026-11-27T08:17:00',
//       fiscalSign: '2840555946',
//       insertedAt: '2026-11-27T05:17:35.551Z',
//       transactionType: 'Кассовый чек',
//       kkmRegId: '0009880487010125',
//       fiscalDriveNumber: '7380440903167390',
//       fiscalDocumentNumber: 7024,
//       shiftNum: 315,
//       ticket: {
      //   "requestNumber": 24,
      //   "operator": {
      //     "operatorName": "Кассир"
      //   },
      //   "operationType": 1,
      //   "taxationType": "УСН доход",
      //   "totalSum": 630.00,
      //   "cashTotalSum": 0.00,
      //   "ecashTotalSum": 630.00,
      //   "prepaymentSum": 0.00,
      //   "postpaymentSum": 0.00,
      //   "counterSubmissionSum": 0.00,
      //   "taxes": {
      //     "nds22": 0,
      //     "nds20": 0,
      //     "nds10": 0,
      //     "nds7": 0,
      //     "nds5": 0,
      //     "nds0": 0,
      //     "ndsNo": 630.00,
      //     "ndsCalculated22": 0,
      //     "ndsCalculated20": 0,
      //     "ndsCalculated10": 0,
      //     "ndsCalculated7": 0,
      //     "ndsCalculated5": 0
      //   },
      //   "retailPlace": "Кофе на вынос \"Кофе не ждёт\"",
      //   "items": [
      //     {
      //       "quantity": 1.0,
      //       "quantityMeasure": 0,
      //       "name": "раф 350",
      //       "sum": 350.00,
      //       "price": 350.00,
      //       "ndsRate": 6,
      //       "ndsSum": 350.00,
      //       "calculationTypeSign": 4,
      //       "calculationSubjectSign": 1,
      //       "industryReceiptRequisite": []
      //     },
      //     {
      //       "quantity": 1.0,
      //       "quantityMeasure": 0,
      //       "name": "латте 350",
      //       "sum": 240.00,
      //       "price": 240.00,
      //       "ndsRate": 6,
      //       "ndsSum": 240.00,
      //       "calculationTypeSign": 4,
      //       "calculationSubjectSign": 1,
      //       "industryReceiptRequisite": []
      //     },
      //     {
      //       "quantity": 1.0,
      //       "quantityMeasure": 0,
      //       "name": "сироп",
      //       "sum": 40.00,
      //       "price": 40.00,
      //       "ndsRate": 6,
      //       "ndsSum": 40.00,
      //       "calculationTypeSign": 4,
      //       "calculationSubjectSign": 1,
      //       "industryReceiptRequisite": []
      //     }
      //   ],
      //   "itemsCount": 3
      // },
//       fnsFlcStatus: 'OK',
//       fnsStatus: 200,
//       fnsDescription: null,
//       fnsConfirmation: '{"fdId":"6639694925793347072"}'
//     },
//     {
//       transactionDate: '2026-11-27T07:52:00',
//       fiscalSign: '198506299',
//       insertedAt: '2026-11-27T04:54:33.411Z',
//       transactionType: 'Отчет об открытии смены',
//       kkmRegId: '0009880487010125',
//       fiscalDriveNumber: '7380440903167390',
//       fiscalDocumentNumber: 7023,
//       shiftNum: 315,
//       openShift: [Object],
//       fnsFlcStatus: 'OK',
//       fnsStatus: 200,
//       fnsDescription: null,
//       fnsConfirmation: '{"fdId":"6639671738036143360"}'
//     }
//   ]
// }
// documents?kkmRegId=0009880487010125&fsFactoryNumber=7380440903167390&shiftNum=302&transactionTypes=TICKET
const OFDgetTransactions = async (token: string, shiftNum: string) => {
  const params = new URLSearchParams({
    kkmRegId: '0009880487010125',
    fsFactoryNumber: '7380440903167390',
    shiftNum: shiftNum,
    transactionTypes: 'TICKET'
  });
  const response = await fetch(
    `https://universal-api.1-ofd.ru/api/rent/v2/organisations/323774600167753/documents?${params}`,
    {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    }
  );

  const resultJson = response.json().then((data) => data);
  return resultJson;
}
