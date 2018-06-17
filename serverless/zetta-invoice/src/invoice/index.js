/* @flow */

/**
 * @date 2017-02-13
 */
import invoiceModel from './invoice';
import create from './create';
import get from './get';
import list from './list';
import lock from './lock';
import mail from './mail';
import remove from './remove';
import update from './update';

export default {
  create: data => invoiceModel().create(data),
  get: async params => {
    const invoiceData = await get(params);
    return invoiceModel({ invoice: invoiceData });
  },
  list,
  lock,
  mail,
  remove,
  update,
};
