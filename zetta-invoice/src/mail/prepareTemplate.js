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
  const {
    netTotal,
    taxTotal,
    total,
    seperateTaxMap,
    invoiceRows,
  } = invoice.getInvoiceTotal();
  const { createdAt, timeToPay, id } = invoice.getFormatedDateValues();

  const taxTouple = Object.keys(seperateTaxMap).map(key => ({
    tax: convertTaxToPercentage(key),
    value: seperateTaxMap[key],
  }));

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
    taxTouple,
  };
};

export const convertTaxToPercentage = tax => {
  let taxCopy = tax.slice();
  taxCopy = taxCopy.split('.')[1];
  taxCopy = appendTrailingZero(taxCopy);
  taxCopy = removeLeadingZeros(taxCopy);

  return taxCopy + '%';
};
const removeLeadingZeros = string => string.replace(/^0+/, '');
const appendTrailingZero = string =>
  string.length === 1 ? string + '0' : string;
