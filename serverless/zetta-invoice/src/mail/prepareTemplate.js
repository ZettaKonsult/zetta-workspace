/* @flow */

/**
 * @date 2018-02
 */

import type { HTML } from 'types/General';
import type { Invoice, InvoiceSpecification } from 'types/Invoice';
import type { Recipient } from 'types/Recipient';
import Mustache from 'mustache';
import { promisify } from 'util';
import fs from 'fs';

export default async (data: any): HTML => {
  let [template, date] = await Promise.all([
    readTemplateFile(),
    prepareData(data),
  ]);
  console.log(`Prepared template. Translating via Mustache.`);
  return Mustache.to_html(template, date);
};

const readFileAsync = promisify(fs.readFile);
const readTemplateFile = async () =>
  await readFileAsync('./src/template/template.html', 'utf8');

const prepareData = (data: {
  discount: number,
  recipient: Recipient,
  invoice: Invoice,
  tax?: number,
}): InvoiceSpecification => {
  const { discount, recipient, invoice, tax = 1.25 } = data;
  const { companyCustomer } = invoice;

  const id = new Date(invoice.createdAt);
  const timeToPay = new Date(id.getUTCFullYear(), id.getUTCMonth() + 1);

  const { netTotal, taxTotal, total } = calculatePrice({
    price: invoice.price,
    tax,
  });

  return {
    companyCustomer,
    recipient,
    invoice: {
      id: invoice.createdAt,
      createdAt: id.toISOString().split('T')[0],
      timeToPay: timeToPay.toISOString().split('T')[0],
    },
    discount: discount | 0,
    netTotal,
    taxTotal,
    total,
    receiver: recipient.company || recipient.firstName,
  };
};

const calculatePrice = (params: {
  price: number,
  tax: number,
}): { netTotal: number, taxTotal: number, total: number } => {
  const { price, tax } = params;

  const taxTotal = price * tax;
  const netTotal = price - taxTotal;
  const total = netTotal + taxTotal;

  return { netTotal, taxTotal, total };
};
