/* @flow */

/**
 * @date 2018-03-05
 */

import type { DatabaseMethod } from 'types/Database';

import Mail from '../mail/mail';

export default async (params: {
  db: DatabaseMethod,
  invoiceId: string,
  companyCustomerId: string,
  discount?: number,
  tax?: number,
}): Promise<{ reference: string }> => {
  const { db, invoiceId, companyCustomerId } = params;
  let { discount, tax } = params;

  [discount, tax] = zeroIfNull({ numbers: [discount, tax] });
  console.log(`Found discount and tax: ${discount} and ${tax}.`);

  console.log(
    `Mailing process for invoice ${invoiceId}, customer ${companyCustomerId} started.`
  );

  try {
    return await Mail.sendInvoice({
      db,
      companyCustomerId,
      invoiceId,
      discount,
      tax,
    });
  } catch (error) {
    throw new Error(`Could not send invoice mail: ${error.message}`);
  }
};

const zeroIfNull = (params: { numbers: Array<any> }): Array<number> =>
  params.numbers.reduce(
    (result, arg) => [...result, typeof arg === 'number' ? arg : 0.0],
    []
  );
