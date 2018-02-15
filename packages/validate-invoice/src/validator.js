/* @flow */
import type { InvoiceRow } from 'types/Invoice';

export default (invoiceRows: InvoiceRow[]) => {
  const numberOfRows = invoiceRows.length;
  const idsMap = invoiceRows
    .map(row => row.recipientIds)
    .reduce((total, row) => [...total, ...row], [])
    .reduce(
      (total, id) => ({
        ...total,
        [id]: 1 + (total[id] | 0),
      }),
      {}
    );

  const isValid = Object.keys(idsMap).every(id => idsMap[id] === numberOfRows);

  return isValid;
};
