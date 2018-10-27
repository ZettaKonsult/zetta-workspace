/* @flow */

/**
 * @date  2017-11-07
 */

import { getDbTable } from '../util/database';
import { getBySSN } from '../recipient';
import { createPlansMapping } from '../plans';
import unionMapper, * as unionAssigner from './unionAssigner';

export default async ({ db, companyCustomerId }) => {
  try {
    console.log(`Fetching LADOK parse results.`);
    const [parseResult, UnionMapping] = await Promise.all([
      getParseResults(db),
      createPlansMapping({ db, companyCustomerId }),
    ]);
    const { aggregated, assignments } = unionMapper({
      unionMapping: UnionMapping,
      people: parseResult,
    });
    const users = await buildUserMap({ db, aggregated });

    return unionAssigner.getUpdatedUnions({
      assignments,
      users,
    });
  } catch (error) {
    throw error;
  }
};

const buildUserMap = async ({ db, aggregated }) => {
  const promises = Object.keys(aggregated).map(ssn => getBySSN({ db, ssn }));
  const users = await Promise.all(promises);

  return users.reduce((total, user, index) => {
    const ssn = Object.keys(aggregated)[index];
    if (user === undefined) {
      console.log(`No user . A new one will be created.`);
      return { ...total, [ssn]: aggregated[ssn] };
    } else {
      console.log(`user existed.`);
      return { ...total, [ssn]: user };
    }
  }, {});
};

const getParseResults = async db => {
  const result = await db('scan', {
    TableName: getDbTable({ name: 'LadokParseResults' }),
  });
  return result.Items;
};

// const UnionMapping = {
//   EHL: ['Lunda Ekonomerna'],
//   HT: ['Humanistiska och Teologiska Studentkåren'],
//   JUR: ['Juridiska Föreningen'],
//   KO: ['Studentkåren vid Konstnärliga fakulteten i Malmö'],
//   LTH: ['Teknologkåren'],
//   MED: ['Corpus Medicus'],
//   NAT: ['Lunds Naturvetarkår'],
//   SAM: ['Samhällsvetarkåren'],
//   USV: ['LundaEkonomerna', 'Lunds Naturvetarkår', 'Samhällsvetarkåren'],
// };
