import Mustache from 'mustache';
import { promisify } from 'util';
import fs from 'fs';

export default async data => {
  let [tempalte, date] = await Promise.all([
    readTemplateFile(),
    prepareData(data),
  ]);
  return Mustache.to_html(tempalte, date);
};

const readFileAsync = promisify(fs.readFile);
const readTemplateFile = async () =>
  await readFileAsync('./src/template/template.html', 'utf8');

const prepareData = data => {
  const { companyCustomer, recipient, invoice, tax = 1.25 } = data;

  const id = new Date(invoice.createdAt);
  const timeToPay = new Date(id.getUTCFullYear(), id.getUTCMonth() + 1);
  const netTotal = calcNetTotal(invoice.invoiceRows);
  const total = netTotal * tax;
  const taxTotal = total - netTotal;

  return {
    companyCustomer,
    recipient,
    invoice: {
      id: invoice.createdAt,
      createdAt: id.toISOString().split('T')[0],
      timeToPay: timeToPay.toISOString().split('T')[0],
    },
    invoiceRows: invoice.invoiceRows.map(row => ({
      interval: row.hours,
      description: row.description,
      price: row.price,
      total: Number(row.hours) * Number(row.price),
    })),
    discount: '',
    netTotal,
    taxTotal,
    total,
    receiver: recipient.company || recipient.firstName,
  };
};

const calcNetTotal = rows =>
  rows.reduce((total, row) => (total += row.price * row.hours), 0);
