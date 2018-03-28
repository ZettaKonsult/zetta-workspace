/* @flow */

/**
 * @date 2018-02
 */

import type { HTML } from 'types/General';
import type {
  CalculatedInvoiceRow,
  Invoice,
  InvoiceRow,
  InvoiceSpecification,
} from 'types/Invoice';
import type { Recipient } from 'types/Recipient';
import Mustache from 'mustache';
import { promisify } from 'util';
import fs from 'fs';

export default async (data: any): HTML => {
  let [template, preparedData] = await Promise.all([
    readTemplateFile(),
    prepareData(data),
  ]);
  console.log(`Prepared template. Translating via Mustache.`);
  return Mustache.to_html(template, preparedData);
};

const readFileAsync = promisify(fs.readFile);
const readTemplateFile = async () =>
  await readFileAsync('./src/template/template.html', 'utf8');

const prepareData = (data: {
  discount: number,
  recipient: Recipient,
  invoice: Invoice,
}): InvoiceSpecification => {
  const { discount, recipient, invoice } = data;
  const { companyCustomer } = invoice;

  const id = new Date(invoice.createdAt);
  const timeToPay = new Date(id.getUTCFullYear(), id.getUTCMonth() + 1);

  const { calculatedRows, netTotal, taxTotal, sum } = calculatePrice({
    invoiceRows: invoice.invoiceRows,
  });

  return {
    companyCustomer,
    recipient,
    invoice: {
      id: invoice.createdAt,
      createdAt: id.toISOString().split('T')[0],
      timeToPay: timeToPay.toISOString().split('T')[0],
    },
    invoiceRows: calculatedRows,
    discount: discount | 0,
    netTotal,
    taxTotal,
    total: sum,
    receiver: recipient.company || recipient.firstName,
  };
};

const calculatePrice = (params: {
  invoiceRows: Array<InvoiceRow>,
}): {
  calculatedRows: Array<CalculatedInvoiceRow>,
  netTotal: number,
  taxTotal: number,
  sum: number,
} => {
  const { invoiceRows } = params;

  const calculatedRows = [];

  let taxTotal = 0;
  let sum = 0;

  invoiceRows.forEach(invoiceRow => {
    const { price, unit, tax } = invoiceRow;
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
