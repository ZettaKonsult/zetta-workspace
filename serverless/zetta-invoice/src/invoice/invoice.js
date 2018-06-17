/* @flow */

const defaultInvoice = {
  invoiceRows: [],
  locked: false,
  createdAt: Date.now(),
  status: [],
  recipients: [],
  companyCustomerId: undefined,
};

const invoice = ({
  defaultTax = 0,
  invoice = defaultInvoice,
  presistance,
} = {}) => {
  return {
    create: function(invoiceData) {
      invoice = {
        ...invoice,
        ...invoiceData,
        recipients: invoiceData.recipientIds,
      };

      return this;
    },

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

    isInvoiceLocked: function() {
      return invoice.locked;
    },

    getInvoiceRows: function() {
      return invoice.invoiceRows;
    },

    addInvoiceRow: function(row) {
      if (!this.isInvoiceLocked()) {
        invoice = {
          ...invoice,
          invoiceRows: [...invoice.invoiceRows, { ...row }],
        };
      }
      return this;
    },

    addRecipient: function(recipient) {
      if (!this.isInvoiceLocked()) {
        invoice = {
          ...invoice,
          recipients: [...invoice.recipients, recipient],
        };
      }
      return this;
    },

    lockInvoice: function() {
      invoice = {
        ...invoice,
        locked: true,
        status: [
          ...invoice.status,
          { createdAt: Date.now(), action: 'LOCKED' },
        ],
      };
      return this;
    },

    send: async function(sender) {
      try {
        await sender(this);
        invoice = {
          ...invoice,
          status: [
            ...invoice.status,
            { createdAt: Date.now(), action: 'SEND' },
          ],
        };
      } catch (err) {}
      return this;
    },

    toJson: function() {
      return { ...invoice };
    },
  };
};

export default invoice;
