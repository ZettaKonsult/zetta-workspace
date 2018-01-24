function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getState = () => ({
  labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  datasets: [
    {
      label: 'Number of Members',
      data: [
        getRandomInt(50, 200),
        getRandomInt(100, 150),
        getRandomInt(150, 250),
        getRandomInt(150, 250),
        getRandomInt(150, 250),
        getRandomInt(150, 250),
        getRandomInt(150, 250),
        getRandomInt(150, 250),
        getRandomInt(150, 250),
        getRandomInt(150, 250),
        getRandomInt(150, 250),
      ],
      backgroundColor: ['rgba(54,162,235,0.6)'],
      hoverBackgroundColor: ['rgba(54,162,235,1)'],
      pointRadius: 5,
      pointHitRadius: 50,
    },
  ],
});

export default getState;
