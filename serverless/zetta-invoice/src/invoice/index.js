/* @flow */

/**
 * @date 2017-02-13
 */
import invoiceModel from './invoice';
import get from './get';
import list from './list';
import mail from './mail';
import remove from './remove';
import update from './update';

export default {
  create: data => invoiceModel().create(data),
  get,
  list,
  mail,
  remove,
  update,
};
