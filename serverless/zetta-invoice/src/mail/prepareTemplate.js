/* @flow */

/**
 * @date 2018-02
 */

import type { HTML } from 'types/General';
import type {
  CompanyCustomer,
  Recipient,
  LockedInvoice,
  InvoiceSpecification,
} from 'types/Invoice';
import Price from '../price';
import { to_html } from 'mustache';
import { promisify } from 'util';
import fs from 'fs';

export default async (data: any): HTML => {
  let [template, preparedData] = await Promise.all([
    readTemplateFile(),
    prepareData(data),
  ]);
  console.log(`Prepared template. Translating via Mustache.`);
  return to_html(template, preparedData);
};

const readFileAsync = promisify(fs.readFile);
const readTemplateFile = async () =>
  await readFileAsync('./src/template/template.html', 'utf8');

export const prepareData = (data: {
  discount: number,
  invoice: LockedInvoice,
  defaultTax: number,
  companyCustomer: CompanyCustomer,
  recipient: Recipient,
}): Array<InvoiceSpecification> => {
  const { discount, invoice, defaultTax, companyCustomer, recipient } = data;

  const id = new Date(invoice.createdAt);
  const timeToPay = new Date(id.getUTCFullYear(), id.getUTCMonth() + 1);

  const { calculatedRows, netTotal, taxTotal, sum } = Price.calculate({
    invoiceRows: invoice.invoiceRows,
    defaultTax,
  });

  return {
    companyCustomer,
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
    recipient,
  };
};
