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
  const {
    createdAt,
    companyCustomer,
    recipient,
    invoiceRows,
    tax = 1.25,
  } = data;

  const id = new Date(createdAt);
  const timeToPay = new Date(id.getUTCFullYear(), id.getUTCMonth() + 1);
  const netTotal = calcNetTotal(invoiceRows);
  const total = netTotal * tax;
  const taxTotal = total - netTotal;

  return {
    companyCustomer,
    recipient,
    invoice: {
      id: createdAt,
      createdAt: id.toISOString().split('T')[0],
      timeToPay: timeToPay.toISOString().split('T')[0],
    },
    invoiceRows: invoiceRows.map(row => ({
      interval: row.interval,
      description: row.description,
      price: row.price,
      total: row.interval * row.price,
    })),
    discount: '',
    netTotal,
    taxTotal,
    total,
    receiver: recipient.company || recipient.firstName,
  };
};

const calcNetTotal = rows =>
  rows.reduce((total, row) => (total += row.price * row.interval), 0);
