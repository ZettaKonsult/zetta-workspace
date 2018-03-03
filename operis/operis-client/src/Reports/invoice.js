export const updateInvoiceState = newInvoice => state => {
  const { invoices } = state;
  const index = invoices.findIndex(invoice => invoice.id === newInvoice.id);
  const newState =
    index === -1
      ? { ...state, invoices: [...invoices, newInvoice] }
      : {
          ...state,
          invoices: [
            ...invoices.slice(0, index),
            newInvoice,
            ...invoices.slice(index + 1),
          ],
        };
  return newState;
};
