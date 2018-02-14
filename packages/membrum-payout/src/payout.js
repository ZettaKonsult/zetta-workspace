/* @flow */
import type { Invoice } from 'types/Invoice';

export default (invoices: Invoice[]) => {
  let filteredInvoices = invoices.filter(
    invoice => invoice.itemStatus.itemStatus === 'succeeded'
  );

  return filteredInvoices.reduce((total, invoice) => {
    const newMap = mapInvoiceRows(invoice.invoiceRows);
    const mergedMaps = mergeObjectMaps(newMap, total);

    return mergedMaps;
  }, {});
};

const mapInvoiceRows = invoiceRows =>
  invoiceRows.reduce(
    (total, row) => ({
      ...total,
      [row.id]: row.price + (total[row.id] || 0),
    }),
    {}
  );

const mergeObjectMaps = (newMap, oldMap) =>
  Object.keys(newMap).reduce((mergeMap, key) => {
    return {
      ...mergeMap,
      [key]: newMap[key] + (oldMap[key] | 0),
    };
  }, {});
