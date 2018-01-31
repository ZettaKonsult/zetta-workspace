/* @flow */
import type { RuleOptions } from 'types/Rule';
import initValidaiton from './subscriptionValidation';
import db from './database';

const dbUsers = db({ TableName: 'MembrumUsers' });

export default (organisationId: string, options: RuleOptions) => {
  const validator = initValidaiton(organisationId, options);

  const updateUserSubscription = async (
    ssn: string,
    subscription: string[]
  ) => {
    try {
      const isValid = await validator.isValidSubscription(subscription);
      if (isValid) {
        await dbUsers.update({ ssn }, { subscription });
      } else {
      }
    } catch (err) {
      console.error(err);
    }
  };

  return { updateUserSubscription };
};
