/* @flow */
import db from './database';

const dbUsers = db({ TableName: 'MembrumUsers' });

export default () => {
  const findUser = async (ssn: string) => {
    const user = await dbUsers.get({ ssn });
    console.log(user);
  };

  return { findUser };
};
