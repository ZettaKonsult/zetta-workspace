/* @flow */

/**
 * @date 2018-01-16
 */

import type { Plan } from '../types'

const plans = [
  {
    id: 'default',
    name: 'Please choose a plan',
    labels: [],
    group: [],
    type: 'default'
  },
  {
    id: 'tek',
    name: 'Teknologkåren',
    amount: '0',
    interval: 'month',
    intervalCount: '6',
    labels: ['union'],
    group: ['studentlund']
  },
  {
    id: 'le',
    name: 'Lunda Ekonomerna',
    amount: '100',
    interval: 'month',
    intervalCount: '6',
    labels: ['union'],
    group: ['studentlund']
  },
  {
    id: 'cm',
    name: 'Corpus Medicus',
    amount: 'X',
    interval: 'month',
    intervalCount: '6',
    labels: ['union'],
    group: ['studentlund']
  },
  {
    id: 'sv',
    name: 'Samhällsvetarkåren',
    amount: '110',
    interval: 'month',
    intervalCount: '6',
    labels: ['union'],
    group: ['studentlund']
  },
  {
    id: 'luna',
    name: 'Lunds Naturvetarkår',
    amount: '120',
    interval: 'month',
    intervalCount: '6',
    labels: ['union'],
    group: ['studentlund']
  },
  {
    id: 'huots',
    name: 'Humanistiska och Teologiska Studentkåren',
    amount: 'X',
    interval: 'month',
    intervalCount: '6',
    labels: ['union'],
    group: ['studentlund']
  },
  {
    id: 'jf',
    name: 'Juridiska Föreningen',
    amount: 'X',
    interval: 'month',
    intervalCount: '6',
    labels: ['union'],
    group: ['studentlund']
  },
  {
    id: 'svkfim',
    name: 'Studentkåren vid Konstnärliga fakulteten i Malmö',
    amount: 'X',
    interval: 'month',
    intervalCount: '6',
    labels: ['union'],
    group: ['studentlund']
  },
  {
    id: 'bn',
    name: 'Blekingska Nationen',
    amount: '210',
    interval: 'month',
    intervalCount: '6',
    labels: ['nation', 'gudrun'],
    group: ['studentlund']
  },
  {
    id: 'gn',
    name: 'Göteborgs Nation',
    amount: '200',
    interval: 'month',
    intervalCount: '6',
    labels: ['nation', 'city'],
    group: ['studentlund']
  },
  {
    id: 'han',
    name: 'Hallands Nation',
    amount: '200',
    interval: 'month',
    intervalCount: '6',
    labels: ['nation', 'city'],
    group: ['studentlund']
  },
  {
    id: 'hen',
    name: 'Helsingkrona Nation',
    amount: '200',
    interval: 'month',
    intervalCount: '6',
    labels: ['nation', 'torna'],
    group: ['studentlund']
  },
  {
    id: 'kan',
    name: 'Kalmar Nation',
    amount: '200',
    interval: 'month',
    intervalCount: '6',
    labels: ['nation', 'gudrun'],
    group: ['studentlund']
  },
  {
    id: 'krn',
    name: 'Kristianstads Nation',
    amount: '200',
    interval: 'month',
    intervalCount: '6',
    labels: ['nation', 'torna'],
    group: ['studentlund']
  },
  {
    id: 'lunn',
    name: 'Lunds Nation',
    amount: '200',
    interval: 'month',
    intervalCount: '6',
    labels: ['nation', 'city'],
    group: ['studentlund']
  },
  {
    id: 'mn',
    name: 'Malmö Nation',
    amount: '200',
    interval: 'month',
    intervalCount: '6',
    labels: ['nation', 'city'],
    group: ['studentlund']
  },
  {
    id: 'ön',
    name: 'Östgöta Nation',
    amount: '200',
    interval: 'month',
    intervalCount: '6',
    labels: ['nation', 'city'],
    group: ['studentlund']
  },
  {
    id: 'sn',
    name: 'Sydskånska Nation',
    amount: '200',
    interval: 'month',
    intervalCount: '6',
    labels: ['nation', 'torna'],
    group: ['studentlund']
  },
  {
    id: 'vn',
    name: 'Västgöta Nation',
    amount: '200',
    interval: 'month',
    intervalCount: '6',
    labels: ['nation', 'torna'],
    group: ['studentlund']
  },
  {
    id: 'wn',
    name: 'Wermlands Nation',
    amount: '210',
    interval: 'month',
    intervalCount: '6',
    labels: ['nation', 'gudrun'],
    group: ['studentlund'],
    type: 'plan'
  },
  {
    id: 'un',
    name: 'Undefined Nation',
    amount: '80',
    interval: 'month',
    intervalCount: '6',
    labels: ['nation'],
    group: ['studentlund'],
    type: 'trail'
  },
  {
    id: 'trf',
    name: 'Terminsräkningsföreningen',
    amount: '20',
    interval: 'month',
    intervalCount: '6',
    labels: [],
    group: ['obligatory']
  },
  {
    id: 'af',
    name: 'Akademiska Föreningen',
    amount: '100',
    interval: 'month',
    intervalCount: '6',
    labels: [],
    group: ['studentlund']
  },
  {
    id: 'sn',
    name: 'Smålands Nation',
    amount: '200',
    interval: 'month',
    intervalCount: '6',
    labels: ['nation'],
    group: ['Smalands']
  }
]
const planTemplates = [
  {
    id: 'ur',
    name: 'unionRule',
    group: 'studentlund',
    attribute: 'labels',
    key: 'union',
    func: 'only',
    value: '1',
    error: 'There should be only 1 union'
  },
  {
    id: 'nr',
    name: 'nationRule',
    group: 'studentlund',
    attribute: 'labels',
    key: 'nation',
    func: 'atLeast',
    value: '1',
    error: 'There should be atLeast 1 nation'
  },
  {
    id: 'tr',
    name: 'trfRule',
    group: 'obligatory',
    attribute: 'id',
    key: 'trf',
    func: 'only',
    value: '1',
    error: 'TRF must be part of the subscription'
  },
  {
    id: 'ar',
    name: 'afRule',
    group: 'studentlund',
    attribute: 'id',
    key: 'af',
    func: 'only',
    value: '1',
    error: 'AF must be part of the subscription'
  },
  {
    id: 'nnr',
    name: 'noNationRule',
    group: 'dumbRule',
    attribute: 'label',
    key: 'nation',
    func: 'lessThan',
    value: '1',
    error: "can't have any nations as part of this subscription"
  }
]

const filteredMembership = plans.reduce(
  (result, plan) =>
    plan.name === 'Teknologkåren' ||
    plan.name === 'Akademiska Föreningen' ||
    plan.name === 'Terminsräkningsföreningen' ||
    plan.name === 'Undefined Nation'
      ? [...result, plan.id]
      : result,
  []
)
const members = [
  {
    ssn: '910504-0035',
    name: 'Fredrik Palmquist',
    plans: filteredMembership
  },
  {
    ssn: '901020-1234',
    name: 'Sture Student',
    plans: filteredMembership
  }
]

const defaultPlan = (): Plan => plans[0]

const specification = (): Array<Plan> => plans

export default { defaultPlan, plans, planTemplates, specification, members }
