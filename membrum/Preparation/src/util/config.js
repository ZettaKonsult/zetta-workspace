/* @flow */

/**
 * @date 2018-03-10
 */

export default {
  port: 8080,
  Administrator: {
    UserName: 'Administrator',
    Password: 'DefaultPasswordForAdmin',
  },
  Database: {
    Organisations: {
      Name: 'MembrumOrganisations',
      IndexKey: 'organisationName',
    },
    Users: {
      Name: 'Recipients',
      IndexKey: '',
    },
  },
  Ladok: {
    File: {
      ExpectedColumns: ['Pnr', 'Namn', 'Epostadress', 'Registrerade po�ng', ''],
      IgnoreLines: 8,
    },
  },
  Names: {
    customer: 'TestCustomer',
    project: 'TestProject',
  },
  Password: {
    Length: 14,
    Pattern: /[\w]/,
  },
  Region: 'eu-central-1',
  TRF: {
    Nations: {
      Undefined: 'Undefined Nation',
    },
    UnionMapping: {
      EHL: ['Lunda Ekonomerna'],
      HT: ['Humanistiska och Teologiska Studentkåren'],
      JUR: ['Juridiska Föreningen'],
      KO: ['Studentkåren vid Konstnärliga fakulteten i Malmö'],
      LTH: ['Teknologkåren'],
      MED: ['Corpus Medicus'],
      NAT: ['Lunds Naturvetarkår'],
      SAM: ['Samhällsvetarkåren'],
      USV: ['LundaEkonomerna', 'Lunds Naturvetarkår', 'Samhällsvetarkåren'],
    },
  },
};