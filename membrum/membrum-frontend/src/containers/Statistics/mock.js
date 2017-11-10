// const nationLabels = [
//   'BLEKINGSKA',
//   'GÖTEBORGS',
//   'HALLANDS',
//   'HELSINGKRONA',
//   'KALMAR',
//   'KRISTIANSTADS',
//   'LUNDS',
//   'MALMÖ',
//   'SYDSKÅNSKA',
//   'UNDEFINED',
//   'WERMLANDS',
//   'VÄSTGÖTA',
//   'ÖSTGÖTA',
//   'Ingen'
// ]
// const emailLabels = ['Bounced', 'sent', 'opend', 'clicked']
//
// const goodColors = [
//   'rgba(255,99,132,0.6)',
//   'rgba(54,162,235,0.6)',
//   'rgba(154,162,235,0.6)',
//   'rgba(154,12,235,0.6)',
//    'rgba(255, 140, 0,0.6)'
// ]

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const getState = () => ({
  labels: ['Blue', 'Red', 'Orange', 'Purple'],
  datasets: [
    {
      data: [
        getRandomInt(50, 200),
        getRandomInt(100, 150),
        getRandomInt(150, 250),
        getRandomInt(150, 250)
      ],
      backgroundColor: [
        'rgba(54,162,235,0.6)',
        'rgba(255,99,132,0.6)',
        'rgba(255, 140, 0,0.6)',
        'rgba(154,162,235,0.6)'
      ],
      hoverBackgroundColor: [
        'rgba(54,162,235,1)',
        'rgba(255,99,132,1)',
        'rgba(255, 140, 0,1)',
        'rgba(154,162,235,1)'
      ]
    }
  ]
})

export default getState
