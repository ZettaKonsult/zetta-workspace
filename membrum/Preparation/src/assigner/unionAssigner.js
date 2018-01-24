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

import { applyFormatting } from '../user/attributes';
import { config } from '../config';
const DEFAULT_NATION = config.TRF.Nations.Undefined;

const getAssignment = (person: UserData): string => {
  const credits = person.credits;
  let maxKey: string = '';
  let maxValue: number = Number.MIN_VALUE;

  for (let [union, unionCredits] of Object.entries(credits)) {
    const points = Number(unionCredits);
    if (points > maxValue || (points === maxValue && Math.random() >= 0.5)) {
      maxKey = union;
      maxValue = points;
    }
  }

  return maxKey;
};

export const getUnions = (
  unionMap: { [string]: Array<string> },
  facultyMap: { [string]: string }
): { [string]: [string] } => {
  let unions = {};
  for (let [ssn: string, faculty: string] of Object.entries(facultyMap)) {
    unions[ssn] = unionMap[String(faculty)];
  }
  return unions;
};

export const aggregateResults = (peopleFiles: {
  [string]: FileResult,
}): { [string]: UserData } => {
  let people = {};

  for (const file of Object.values(peopleFiles)) {
    // Recast required due to flow bug with Object.entries and Object.values.
    const fileResult: FileResult = (file: any);

    for (const person: ParsedUser of fileResult.people) {
      const ssn = person.ssn;
      if (ssn in people) {
        people[ssn].credits = Object.assign(
          people[ssn].credits,
          person.credits
        );
      } else {
        people[ssn] = compileUserData({ person: person });
      }
    }
  }

  return people;
};

export const compileUserData = (params: { person: ParsedUser }): UserData => {
  const { person } = params;
  const { family_name, given_name } = applyFormatting({
    user: person,
    formats: [],
  });

  return {
    ssn: person.ssn,
    credits: person.credits,
    attributes: {
      birthdate: person.ssn,
      email: person.email,
      family_name: family_name,
      given_name: given_name,
    },
  };
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

export const getUpdatedUnions = (params: {
  NewAssignments: { [string]: any },
  Users: { [string]: UserData },
}): UnionPartition => {
  const { NewAssignments: assignments, Users: users } = params;

  let result = {
    created: {},
    modified: {},
    same: {},
  };

  for (let ssn of Object.keys(assignments)) {
    const user = users[ssn];
    const oldUnion = user.unionName;

    let newUnion = assignments[ssn];
    if (newUnion === undefined) {
      newUnion = [oldUnion];
    }

    if (newUnion.length === 1) {
      newUnion = newUnion[0];
    }

    if (oldUnion === undefined) {
      result.created[ssn] = {
        ...user,
        nation: DEFAULT_NATION,
        unionName: newUnion,
      };
    } else if (oldUnion !== newUnion) {
      result.modified[ssn] = {
        ...user,
        unionName: { old: oldUnion, next: newUnion },
      };
    } else {
      result.same[ssn] = { ...user, unionName: oldUnion };
    }
  }

  return result;
};
