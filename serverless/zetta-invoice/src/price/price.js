/* @flow */

/**
 * @date 2018-04-10
 */

import type { CalculatedInvoiceRow, InvoiceRow } from 'types/Invoice';
type ReturnType = {
  invoiceRows: Array<CalculatedInvoiceRow>,
  netTotal: number,
  taxTotal: number,
  total: number,
};

export default (params: {
  invoiceRows: Array<InvoiceRow>,
  defaultTax: number,
}): ReturnType => {
  const { invoiceRows, defaultTax } = params;

  const { netTotal, taxTotal, calculatedRows } = invoiceRows.reduce(
    ({ taxTotal, netTotal, calculatedRows }, invoiceRow) => {
      const { price, unit } = invoiceRow;
      let tax = invoiceRow.tax ? invoiceRow.tax : defaultTax;

      const calculatedRow = { ...invoiceRow };
      const sum = price * unit;
      calculatedRow.total = sum;

      taxTotal += tax * sum;
      netTotal += sum;

      return {
        netTotal,
        taxTotal,
        calculatedRows: [...calculatedRows, calculatedRow],
      };
    },
    { netTotal: 0, taxTotal: 0, calculatedRows: [] }
  );

  return {
    invoiceRows: calculatedRows,
    netTotal,
    taxTotal,
    total: netTotal + taxTotal,
  };
};
