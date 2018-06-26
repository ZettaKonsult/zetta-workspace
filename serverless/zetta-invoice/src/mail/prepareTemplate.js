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
import { to_html } from 'mustache';
import { promisify } from 'util';
import fs from 'fs';

export default async (data: any): HTML => {
  let [template, preparedData] = await Promise.all([
    readTemplateFile(),
    prepareData(data),
  ]);
  return to_html(template, preparedData);
};

const readFileAsync = promisify(fs.readFile);
const readTemplateFile = async () =>
  await readFileAsync('./src/template/template.html', 'utf8');

export const prepareData = (data: {
  discount: number,
  invoice: LockedInvoice,
  companyCustomer: CompanyCustomer,
  recipient: Recipient,
}): Array<InvoiceSpecification> => {
  const { discount, invoice, companyCustomer, recipient } = data;
  const { netTotal, taxTotal, total, invoiceRows } = invoice.getInvoiceTotal();
  const { createdAt, timeToPay, id } = invoice.getFormatedDateValues();

  return {
    companyCustomer,
    invoice: {
      id,
      createdAt,
      timeToPay,
    },
    invoiceRows,
    discount: discount | 0,
    netTotal,
    taxTotal,
    total: total,
    recipient,
  };
};
