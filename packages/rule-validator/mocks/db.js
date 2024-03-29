const plans = [
  {
    id: '2',
    name: 'Teknologkåren',
    amount: 0,
    interval: 'month',
    intervalCount: 6,
    labels: ['union'],
    group: 'studentlund',
  },
  {
    id: '3',
    name: 'Västgöta Nation',
    amount: 200,
    interval: 'month',
    intervalCount: 6,
    labels: ['nation', 'torna'],
    group: 'studentlund',
  },
  {
    id: '4',
    name: 'Wermlands Nation',
    amount: 210,
    interval: 'month',
    intervalCount: 6,
    labels: ['nation', 'gudrun'],
    group: 'studentlund',
    type: 'plan',
  },
  {
    id: '6',
    name: 'Terminsräkningsföreningen',
    amount: 20,
    interval: 'month',
    intervalCount: 6,
    labels: ['obligatory'],
    group: 'obligatory',
  },
  {
    id: '7',
    name: 'Akademiska Föreningen',
    amount: 100,
    interval: 'month',
    intervalCount: 6,
    labels: [],
    group: 'studentlund',
  },
  {
    id: '8',
    name: 'Smålands Nation',
    amount: 200,
    interval: 'month',
    intervalCount: 6,
    labels: [],
    group: 'Smalands',
  },
];
const plantemplates = [
  {
    id: 1,
    name: 'unionRule',
    group: 'studentlund',
    attribute: 'labels',
    key: 'union',
    func: 'only',
    value: 1,
    error: 'There should be only 1 union',
  },
  {
    id: 2,
    name: 'nationRule',
    group: 'studentlund',
    attribute: 'labels',
    key: 'nation',
    func: 'atLeast',
    value: 1,
    error: 'There should be atLeast 1 nation',
  },
  {
    id: 3,
    name: 'trfRule',
    group: 'obligatory',
    attribute: 'id',
    key: plans.find(plan => plan.name === 'Terminsräkningsföreningen').id,
    func: 'only',
    value: 1,
    error: 'TRF must be part of the subscription',
  },
  {
    id: 4,
    name: 'afRule',
    group: 'studentlund',
    attribute: 'id',
    key: plans.find(plan => plan.name === 'Akademiska Föreningen').id,
    func: 'only',
    value: 1,
    error: 'AF must be part of the subscription',
  },
];

export default { plans, plantemplates };
