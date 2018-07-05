/* @flow */

const defaultInvoice = {
  invoiceRows: [],
  locked: false,
  createdAt: Date.now(),
  itemStatus: [],
  recipientIds: [],
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
        recipientIds: invoiceData.recipientIds,
      };
      return this;
    },

    getRecipients: () => {
      return invoice.recipientIds;
    },

    getFormatedDateValues: function() {
      let createdAt = new Date(invoice.createdAt);
      return {
        id: invoice.sequentialId,
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
        ({ taxTotal, netTotal, invoiceRows, seperateTaxMap }, invoiceRow) => {
          const tax = invoiceRow.tax ? invoiceRow.tax : defaultTax;
          const sum = invoiceRow.price * invoiceRow.unit;
          return {
            seperateTaxMap: {
              ...seperateTaxMap,
              [tax]: (seperateTaxMap[tax] || 0) + tax * sum,
            },
            netTotal: netTotal + sum,
            taxTotal: taxTotal + tax * sum,
            invoiceRows: [...invoiceRows, { ...invoiceRow, tax, total: sum }],
            total: netTotal + sum + taxTotal + tax * sum,
          };
        },
        {
          netTotal: 0,
          taxTotal: 0,
          invoiceRows: [],
          total: 0,
          seperateTaxMap: {},
        }
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
          recipientIds: [...invoice.recipientIds, recipient],
        };
      }
      return this;
    },

    lockInvoice: function(sequentialId) {
      invoice = {
        ...invoice,
        sequentialId,
        locked: true,
        itemStatus: [
          ...invoice.itemStatus,
          {
            createdAt: Date.now(),
            action: 'LOCKED',
            payload: { sequentialId },
          },
        ],
      };
      return this;
    },

    send: function(sender) {
      try {
        sender(this);
        invoice = {
          ...invoice,
          itemStatus: [
            ...invoice.itemStatus,
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
