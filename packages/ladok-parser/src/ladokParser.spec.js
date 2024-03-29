/**
 * @date  2017-08-22
 */

import { LadokPerson } from './ladokPerson';
import {
  getUnion,
  parseFile,
  parseDirectory,
  parseString,
  InvalidFile,
} from './ladokParser';
import { NumberMap } from 'common-js-utils';
import objectSize from 'object-size';

const PERSON1 = new LadokPerson(
  '9105040035',
  'FREDRIK PALMQUIST',
  'zmk.zk.dev@gmail.com',
  '35,5',
  'EHL'
);

const PERSON2 = new LadokPerson(
  '9006211537',
  'ZIMON KUHS',
  'zmk.zk.dev@gmail.com',
  '21,5',
  'EHL'
);

describe('Ladok parser.', () => {
  describe('Parse file.', () => {
    it('Correct file.', async () => {
      const people = await parseFile('mocks/ladok/TRF_V16_EHL.txt');

      expect(people.length).toBe(2);
      expect(people[0]).toEqual(PERSON1);
      expect(people[1]).toEqual(PERSON2);
    });
    it('Incorrect file.', async () => {
      try {
        const people = await parseFile('mocks/notLadok/TRF_XXX_XXX.txt');
        throw new Error(`Parsing an invalid file should generate an error.`);
      } catch (error) {
        expect(error).toEqual(
          new InvalidFile(
            'Invalid LADOK file, column line not ' +
              'found in expected position. Expected\n    ' +
              'Pnr,Namn,Epostadress,Registrerade po�ng,' +
              '\nas row 11, got\n    ' +
              'XPnr,Namn,Epostadress,Registrerade po�ng,.'
          )
        );
      }
    });
    describe('All files.', () => {
      it('Credits.', async () => {
        const people = await parseDirectory('mocks/ladok');

        expect(objectSize(people)).toBe(2);
        expect(people['9105040035'].credits).toEqual(
          new NumberMap({
            EHL: 35.5,
            HT: 30.5,
            JUR: 27.5,
            KO: 137.5,
            MED: 117.5,
            NAT: 7.5,
            SAM: 3,
            USV: 317.5,
          })
        );
        expect(people['9006211537'].credits).toEqual(
          new NumberMap({
            EHL: 21.5,
            HT: 2.5,
            JUR: 12.5,
            KO: 0.5,
            MED: 322.5,
            NAT: 2,
            SAM: 2,
            USV: 221.5,
          })
        );
      });
      it('getCredits().', async () => {
        const people = await parseDirectory('mocks/ladok');

        expect(people['9105040035'].getCredits()).toEqual({
          EHL: 35.5,
          HT: 30.5,
          JUR: 27.5,
          KO: 137.5,
          MED: 117.5,
          NAT: 7.5,
          SAM: 3,
          USV: 317.5,
        });
        expect(people['9006211537'].getCredits()).toEqual({
          EHL: 21.5,
          HT: 2.5,
          JUR: 12.5,
          KO: 0.5,
          MED: 322.5,
          NAT: 2,
          SAM: 2,
          USV: 221.5,
        });
      });
    });
  });
  it('Parse string.', async () => {
    const people = await parseString(
      'UB01;2016-08-12;132659;HANS;Registreringsvillkor;\n' +
        'Antal personer: 4734\n' +
        'S�kvillkor:\n' +
        'From termin: 20161\n' +
        'Tom termin: 20161\n' +
        'Kurs: *\n' +
        'Kurstyp: ALLA\n' +
        'Lokal serie: OMR\n' +
        'Lokal klass: EHL\n' +
        'Registreringspo�ng-intervall: 1.0 - 99.0\n' +
        '\n' +
        'Pnr;Namn;Epostadress;Registrerade po�ng;\n' +
        '9105040035;FREDRIK PALMQUIST;zmk.zk.dev@gmail.com; 35,5;\n' +
        '9006211537;ZIMON KUHS;zmk.zk.dev@gmail.com; 21,5;',
      'EHL'
    );

    expect(people.length).toBe(2);
    expect(people[0]).toEqual(PERSON1);
    expect(people[1]).toEqual(PERSON2);
  });
  describe('Get union.', () => {
    it('Correct file name.', () => {
      expect(getUnion('TRF_V16_EHL.txt')).toEqual('EHL');
      expect(getUnion('TRF_V16_HT.txt')).toEqual('HT');
      expect(getUnion('TRF_V16_JUR.txt')).toEqual('JUR');
      expect(getUnion('TRF_V16_KO.txt')).toEqual('KO');
      expect(getUnion('TRF_V16_MED.txt')).toEqual('MED');
      expect(getUnion('TRF_V16_NAT.txt')).toEqual('NAT');
      expect(getUnion('TRF_V16_SAM.txt')).toEqual('SAM');
      expect(getUnion('TRF_V16_USV.txt')).toEqual('USV');
    });
    it('Correct line, incorrect file.', () => {
      expect(getUnion('dummy.txt', [['Lokal klass: EHL']])).toEqual('EHL');
    });
    it('Incorrect case.', () => {
      try {
        getUnion('dummy.txt', [['Lokal klazz: EHL']]);
        throw new Error(
          `Wrong file name and erroneous lines should raise an error ` +
            `in getUnion.`
        );
      } catch (error) {
        expect(error).toEqual(
          new InvalidFile(
            `Invalid LADOK file 'dummy.txt', ` + `could not determine union.`
          )
        );
      }
    });
  });
});
