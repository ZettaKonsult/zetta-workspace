/* @flow */

/**
 * @date 2018-01-04
 */

export const config = {
  Ladok: {
    File: {
      ExpectedColumns: ['Pnr', 'Namn', 'Epostadress', 'Registrerade po�ng', ''],
      IgnoreLines: 8
    }
  },
  TRF: {
    UnionMapping: {
      EHL: ['LundaEkonomerna'],
      HT: ['Humanistiska och Teologiska Studentkåren'],
      JUR: ['Juridiska Föreningen'],
      KO: ['Studentkåren vid Konstnärliga fakulteten i Malmö'],
      LTH: ['Teknologkåren'],
      MED: ['Corpus Medicus'],
      NAT: ['Lunds Naturvetarkår'],
      SAM: ['Samhällsvetarkåren'],
      USV: ['LundaEkonomerna', 'Lunds Naturvetarkår', 'Samhällsvetarkåren']
    }
  }
}
