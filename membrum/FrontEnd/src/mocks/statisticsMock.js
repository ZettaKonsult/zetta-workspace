let minDate = Date.UTC(2016, 0, 1);
let maxDate = Date.UTC(2018, 11, 31);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getState = () => ({
  datasets: [
    {
      label: 'Number of Members',
      data: Array(36)
        .fill('1')
        .map(() => ({
          x: getRandomInt(minDate, maxDate),
          y: getRandomInt(200, 5000),
        }))
        .sort((a, b) => a.x - b.x),
      backgroundColor: ['rgba(54,162,235,0.6)'],
      hoverBackgroundColor: ['rgba(54,162,235,1)'],
      pointRadius: 5,
      pointHitRadius: 50,
    },
  ],
});

export const options = {
  scales: {
    xAxes: [
      {
        distribution: 'linear',
        type: 'time',
        time: {
          unit: 'month',
        },
      },
    ],
  },
};

export default getState;
