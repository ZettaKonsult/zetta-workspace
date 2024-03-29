/* @flow */

/**
 * @date 2017-10-31
 */

import type {
  FileResult,
  ParsedUser,
  UserData,
  UnionPartition,
} from '../types';

import { applyFormatting } from './attributes';

export default ({ people, unionMapping }) => {
  let aggregated = aggregateResults(people);
  let assignments = getUnions(unionMapping, getFaculties(aggregated));

  return { aggregated, assignments };
};

export const getFaculties = (people: {
  [string]: UserData,
}): { [string]: string } =>
  Object.keys(people).reduce(
    (object, ssn) => ({
      ...object,
      [ssn]: getAssignment(people[ssn]),
    }),
    {}
  );

const getAssignment = ({ credits }): string => {
  const result = Object.entries(credits).reduce(
    ({ maxKey, maxValue }, [union, unionCredits]) => {
      // Allows either string xx,xx (Swedish format) or number
      // xx.xx by replacing commas if it's a string.
      const points = Number(
        typeof unionCredits === 'string'
          ? unionCredits.replace(/,/g, '.')
          : unionCredits
      );

      if (points > maxValue) {
        return {
          maxKey: union,
          maxValue: points,
        };
      } else if (points === maxValue && Math.random() >= 0.5) {
        return {
          maxKey: union,
          maxValue: points,
        };
      } else {
        return { maxKey, maxValue };
      }
    },
    {
      maxKey: '',
      maxValue: Number.MIN_VALUE,
    }
  );

  return result.maxKey;
};

export const getUnions = (
  unionMap: { [string]: Array<string> },
  facultyMap: { [string]: string }
): { [string]: [string] } =>
  Object.entries(facultyMap).reduce((total, [ssn, faculty]) => {
    const key = String(faculty);
    if (key in unionMap) {
      return { ...total, [ssn]: unionMap[key] };
    } else {
      throw new Error(`Invalid faculty ${key}.`);
    }
  }, {});

export const aggregateResults = (peopleFiles: {
  [string]: FileResult,
}): { [string]: UserData } =>
  Object.values(peopleFiles).reduce(
    (result, { people }) =>
      people.reduce((total, person) => {
        const ssn = person.ssn;
        const oldCredits =
          total[ssn] === undefined ? undefined : total[ssn].credits;
        return { ...total, [ssn]: compileUserData({ person, oldCredits }) };
      }, result),
    {}
  );

export const compileUserData = (params: {
  person: ParsedUser,
  oldCredits: Object,
}): UserData => {
  const { person, oldCredits } = params;
  const { family_name, given_name } = applyFormatting({
    user: person,
    formats: [],
  });

  return {
    ssn: person.ssn,
    credits:
      oldCredits === undefined
        ? person.credits
        : { ...oldCredits, ...person.credits },
    attributes: {
      birthdate: person.ssn,
      email: person.email,
      lastName: family_name,
      firstName: given_name,
    },
  };
};

//TODO should check if default plans need to be applied
// check which plans needs to be switched out for others union1 -> union2
export const getUpdatedUnions = (params: {
  assignments: { [string]: any },
  users: { [string]: UserData },
}): UnionPartition => {
  const { assignments, users } = params;

  return Object.keys(assignments).reduce(
    (total, ssn) => {
      const user = users[ssn];
      const plans = user.reccuringPayments || [];
      let newUnion = assignments[ssn];

      if (newUnion === undefined) {
        newUnion = plans;
      } else {
        newUnion = newUnion[0];
      }

      if (plans.length === 0) {
        total.created[ssn] = {
          ...user,
          reccuringPayments: [newUnion],
        };
      } else if (plans.findIndex(id => id === newUnion) === -1) {
        total.modified[ssn] = {
          ...user,
          reccuringPayments: [newUnion],
        };
      } else {
        total.same[ssn] = { ...user };
      }
      return total;
    },
    {
      created: {},
      modified: {},
      same: {},
    }
  );
};
