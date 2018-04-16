/* @flow */

/**
 * @date 2018-04-10
 */

import type { CalculatedInvoiceRow, InvoiceRow } from 'types/Invoice';

export default (params: {
  invoiceRows: Array<InvoiceRow>,
  defaultTax: number,
}): {
  calculatedRows: Array<CalculatedInvoiceRow>,
  netTotal: number,
  taxTotal: number,
  sum: number,
} => {
  const { invoiceRows, defaultTax } = params;

  const calculatedRows = [];

  let taxTotal = 0;
  let sum = 0;

  invoiceRows.forEach(invoiceRow => {
    const { price, unit } = invoiceRow;
    let { tax } = invoiceRow;

    if (tax == null) {
      tax = defaultTax;
    }

    const calculatedRow = { ...invoiceRow };
    const total = price * unit;

    calculatedRow.total = total;
    taxTotal += tax * total;
    sum += total;

    calculatedRows.push(calculatedRow);
  });

  const netTotal = sum - taxTotal;

  return { calculatedRows, netTotal, taxTotal, sum };
};
