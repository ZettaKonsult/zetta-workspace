/* @flow */

/**
 * @date 2018-03-07
 */

import type { InvoiceStatus } from 'types/Event';

import cuid from 'cuid';

const create = (params: {
  invoiceId: string,
  createdAt: number,
}): InvoiceStatus => {
  const { invoiceId, createdAt } = params;

  return {
    id: cuid(),
    invoiceId: invoiceId,
    createdAt: createdAt,
    itemStatus: 'pending',
  };
};

const update = (params: {
  status: InvoiceStatus,
  newStatus: 'pending' | 'canceled' | 'succeeded',
  createdAt: number,
}): InvoiceStatus => {
  const { status, newStatus, createdAt } = params;

  return {
    ...status,
    createdAt,
    itemStatus: newStatus,
  };
};

export default { create, update };
