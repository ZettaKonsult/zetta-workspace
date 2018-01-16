/* @flow */

/**
 * @date  2018-01-04
 */

import { parseData } from './parse'

describe('Parse tests.', () => {
  it('parseString()', async () => {
    expect(
      await parseData(
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
        'EHL',
        (error, data) => {
          throw new Error(`Parsing failed.`)
        }
      )
    ).toEqual([
      {
        credits: { EHL: 35.5 },
        email: 'zmk.zk.dev@gmail.com',
        name: 'FREDRIK PALMQUIST',
        ssn: '9105040035'
      },
      {
        credits: { EHL: 21.5 },
        email: 'zmk.zk.dev@gmail.com',
        name: 'ZIMON KUHS',
        ssn: '9006211537'
      }
    ])
  })
})
