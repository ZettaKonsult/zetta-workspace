import cuid from 'cuid'

const plans = [
  {
    id: cuid(),
    name: 'Please choose a plan',
    labels: [],
    group: [],
    type: 'default'
  },
  {
    id: cuid(),
    name: 'Teknologkåren',
    amount: '0',
    interval: 'month',
    intervalCount: '6',
    labels: ['union'],
    group: ['studentlund']
  },
  {
    id: cuid(),
    name: 'Lunda Ekonomerna',
    amount: '100',
    interval: 'month',
    intervalCount: '6',
    labels: ['union'],
    group: ['studentlund']
  },
  {
    id: cuid(),
    name: 'Samhällsvetarkåren',
    amount: '110',
    interval: 'month',
    intervalCount: '6',
    labels: ['union'],
    group: ['studentlund']
  },
  {
    id: cuid(),
    name: 'Lunds Naturvetarkår',
    amount: '120',
    interval: 'month',
    intervalCount: '6',
    labels: ['union'],
    group: ['studentlund']
  },
  {
    id: cuid(),
    name: 'Blekingska Nationen',
    amount: '210',
    interval: 'month',
    intervalCount: '6',
    labels: ['nation', 'gudrun'],
    group: ['studentlund']
  },
  {
    id: cuid(),
    name: 'Göteborgs Nation',
    amount: '200',
    interval: 'month',
    intervalCount: '6',
    labels: ['nation', 'city'],
    group: ['studentlund']
  },
  {
    id: cuid(),
    name: 'Hallands Nation',
    amount: '200',
    interval: 'month',
    intervalCount: '6',
    labels: ['nation', 'city'],
    group: ['studentlund']
  },
  {
    id: cuid(),
    name: 'Helsingkrona Nation',
    amount: '200',
    interval: 'month',
    intervalCount: '6',
    labels: ['nation', 'torna'],
    group: ['studentlund']
  },
  {
    id: cuid(),
    name: 'Kalmar Nation',
    amount: '200',
    interval: 'month',
    intervalCount: '6',
    labels: ['nation', 'gudrun'],
    group: ['studentlund']
  },
  {
    id: cuid(),
    name: 'Kristianstads Nation',
    amount: '200',
    interval: 'month',
    intervalCount: '6',
    labels: ['nation', 'torna'],
    group: ['studentlund']
  },
  {
    id: cuid(),
    name: 'Lunds Nation',
    amount: '200',
    interval: 'month',
    intervalCount: '6',
    labels: ['nation', 'city'],
    group: ['studentlund']
  },
  {
    id: cuid(),
    name: 'Malmö Nation',
    amount: '200',
    interval: 'month',
    intervalCount: '6',
    labels: ['nation', 'city'],
    group: ['studentlund']
  },
  {
    id: cuid(),
    name: 'Östgöta Nation',
    amount: '200',
    interval: 'month',
    intervalCount: '6',
    labels: ['nation', 'city'],
    group: ['studentlund']
  },
  {
    id: cuid(),
    name: 'Sydskånska Nation',
    amount: '200',
    interval: 'month',
    intervalCount: '6',
    labels: ['nation', 'torna'],
    group: ['studentlund']
  },
  {
    id: cuid(),
    name: 'Västgöta Nation',
    amount: '200',
    interval: 'month',
    intervalCount: '6',
    labels: ['nation', 'torna'],
    group: ['studentlund']
  },
  {
    id: cuid(),
    name: 'Wermlands Nation',
    amount: '210',
    interval: 'month',
    intervalCount: '6',
    labels: ['nation', 'gudrun'],
    group: ['studentlund'],
    type: 'plan'
  },
  {
    id: cuid(),
    name: 'Undefined Nation',
    amount: '80',
    interval: 'month',
    intervalCount: '6',
    labels: ['nation'],
    group: ['studentlund'],
    type: 'trail'
  },
  {
    id: cuid(),
    name: 'Terminsräkningsföreningen',
    amount: '20',
    interval: 'month',
    intervalCount: '6',
    labels: [],
    group: ['obligatory']
  },
  {
    id: cuid(),
    name: 'Akademiska Föreningen',
    amount: '100',
    interval: 'month',
    intervalCount: '6',
    labels: [],
    group: ['studentlund']
  },
  {
    id: cuid(),
    name: 'Smålands Nation',
    amount: '200',
    interval: 'month',
    intervalCount: '6',
    labels: ['nation'],
    group: ['Smalands']
  }
]
const plantemplates = [
  {
    id: cuid(),
    name: 'unionRule',
    group: 'studentlund',
    attribute: 'labels',
    key: 'union',
    func: 'only',
    value: '1',
    error: 'There should be only 1 union'
  },
  {
    id: cuid(),
    name: 'nationRule',
    group: 'studentlund',
    attribute: 'labels',
    key: 'nation',
    func: 'atLeast',
    value: '1',
    error: 'There should be atLeast 1 nation'
  },
  {
    id: cuid(),
    name: 'trfRule',
    group: 'obligatory',
    attribute: 'id',
    key: plans.find(plan => plan.name === 'Terminsräkningsföreningen').id,
    func: 'only',
    value: '1',
    error: 'TRF must be part of the subscription'
  },
  {
    id: cuid(),
    name: 'afRule',
    group: 'studentlund',
    attribute: 'id',
    key: plans.find(plan => plan.name === 'Akademiska Föreningen').id,
    func: 'only',
    value: '1',
    error: 'AF must be part of the subscription'
  },
  {
    id: cuid(),
    name: 'noNationRule',
    group: 'dumbRule',
    attribute: 'label',
    key: 'nation',
    func: 'lessThan',
    value: '1',
    error: "can't have any nations as part of this subscription"
  }
]
const members = [
  {
    ssn: '910504-0035',
    name: 'Fredrik Palmquist',
    membership: ['1', '16', '18']
  },
  {
    ssn: '901020-1234',
    name: 'Sture Student',
    membership: ['1', '10', '18']
  }
]

export default { plans, plantemplates, members }
