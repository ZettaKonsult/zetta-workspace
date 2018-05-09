/* @flow */

/**
 * @date 2018-03-05
 */

import type { DatabaseMethod } from 'types/Database';

import { sendInvoice } from '../mail/mail';

export default async (params: {
  db: DatabaseMethod,
  invoiceId: string,
  companyCustomerId: string,
  tax?: number,
  discount?: number,
}): Promise<{ reference: string }> => {
  const { db, invoiceId, companyCustomerId, tax } = params;
  let { discount } = params;

  [discount] = zeroIfNull({ numbers: [discount] });
  console.log(`Found discount: ${discount}.`);
  console.log(
    `Mailing process for invoice ${invoiceId}, customer ${companyCustomerId} started.`
  );

  return await sendInvoice({
    db,
    companyCustomerId,
    invoiceId,
    discount,
    tax,
  });
};

const zeroIfNull = (params: { numbers: Array<any> }): Array<number> =>
  params.numbers.reduce(
    (result, arg) => [...result, typeof arg === 'number' ? arg : 0.0],
    []
  );
