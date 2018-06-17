/* @flow */

const defaultInvoice = {
  invoiceRows: [],
};

const invoice = ({ defaultTax = 0, invoice = defaultInvoice } = {}) => {
  return {
    getRecipients: () => {
      return invoice.recipients;
    },

    getFormatedDateValues: function() {
      let createdAt = new Date(invoice.createdAt);
      return {
        id: invoice.createdAt,
        createdAt: createdAt.toISOString().split('T')[0],
        timeToPay: new Date(
          createdAt.getUTCFullYear(),
          createdAt.getUTCMonth() + 1
        )
          .toISOString()
          .split('T')[0],
      };
    },

    getInvoiceTotal: function() {
      return invoice.invoiceRows.reduce(
        ({ taxTotal, netTotal, invoiceRows }, invoiceRow) => {
          const tax = invoiceRow.tax ? invoiceRow.tax : defaultTax;
          const sum = invoiceRow.price * invoiceRow.unit;
          return {
            netTotal: netTotal + sum,
            taxTotal: taxTotal + tax * sum,
            invoiceRows: [...invoiceRows, { ...invoiceRow, total: sum }],
            total: netTotal + sum + taxTotal + tax * sum,
          };
        },
        { netTotal: 0, taxTotal: 0, invoiceRows: [], total: 0 }
      );
    },

    addInvoiceRow: function(row) {
      invoice.invoiceRows.push(row);
      return this;
    },

    getInvoiceRows: function() {
      return invoice.invoiceRows;
    },
  };
};

export default invoice;
