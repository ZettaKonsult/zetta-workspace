/* @flow */

/**
 * @date 2018-03-10
 */

import type { Invoice } from 'types/Invoice';
import cuid from 'cuid';

const create = (params: { invoice: Invoice }) => {
  const { invoice } = params;
  return { id: cuid(), invoiceId: invoice.id };
};

export default { create };
