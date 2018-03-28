/* @flow */

/**
 * @date 2018-03-05
 */

import type { DatabaseMethod } from 'types/Database';

import lock from './lock';
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
    await lock({ db, companyCustomerId, invoiceId, lock: true });
  } catch (error) {
    throw error;
  }

  let err = false;
  let result;
  try {
    result = await Mail.sendInvoice({
      companyCustomerId,
      invoiceId,
      discount,
      tax,
    });
    return result;
  } catch (error) {
    err = error;
  }

  try {
    lock({ db, companyCustomerId, invoiceId, lock: false });
  } catch (error) {
    throw new Error(
      `Could not unlock invoice after failed send: ${error.message}.`
    );
  }

  throw new Error(`Could not send invoice mail: ${err.message}.`);
};

const zeroIfNull = (params: { numbers: Array<any> }): Array<number> =>
  params.numbers.reduce(
    (result, arg) => [...result, typeof arg === 'number' ? arg : 0.0],
    []
  );
