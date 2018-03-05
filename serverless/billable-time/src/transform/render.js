import Mustache from 'mustache';

export default (htmlView, data) => {
  return Mustache.to_html(htmlView, prepareData(data));
};

const prepareData = data => {
  const { createdAt, companyCustomer, recipient, invoiceRows, tax } = data;

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
