const date = Date.UTC(2018, 2, 1);

export default [
  {
    id: '1',
    createdAt: date,
    paymentId: '1',
    status: 'pending',
  },
  {
    id: '2',
    createdAt: date + 1,
    paymentId: '1',
    status: 'succeeded',
  },
  {
    id: '3',
    createdAt: date + 2,
    paymentId: '1',
    status: 'transferred',
    transferred: {
      from: 'cjd1fwht5000h2wcvt5vjxyjr',
      to: 'cjd1fwht5000g2wcvaqa015ea',
    },
  },
  {
    id: '4',
    createdAt: date,
    paymentId: '2',
    status: 'pending',
  },
  {
    id: '5',
    createdAt: date + 1,
    paymentId: '2',
    status: 'succeeded',
  },
  {
    id: '6',
    createdAt: date,
    paymentId: '3',
    status: 'pending',
  },
  {
    id: '7',
    createdAt: date + 1,
    paymentId: '3',
    status: 'succeeded',
  },
];
