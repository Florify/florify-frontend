
export const HUMIDITY = 'hum'
export const TEMPERATURE = 'temp'
export const LUX = 'lux'
export const FERTILITY = 'ph'

export const humidityColor1 = 'rgba(105, 142, 128, 0.3)'
export const humidityColor2 = 'rgba(105, 142, 128, 1)'
export const temperatureColor1 = 'rgba(19, 46, 61, 0.3)'
export const temperatureColor2 = 'rgba(19, 46, 61, 1)'
export const luxColor1 = 'rgba(166, 113, 15, 0.3)'
export const luxColor2 = 'rgba(166, 113, 15, 1)'
export const fertilityColor1 = 'rgba(39, 74, 35, 0.3)'
export const fertilityColor2 = 'rgba(39, 74, 35, 1)'

const colorHashTable = {
  [HUMIDITY]: humidityColor2,
  [TEMPERATURE]: temperatureColor2,
  [LUX]: luxColor2,
  [FERTILITY]: fertilityColor2,
}

const unitHashTable = {
  [HUMIDITY]: "%",
  [TEMPERATURE]: "°C",
  [LUX]: "lx",
  [FERTILITY]: "pH",
}

const yAxisIdHashTable = {
  [HUMIDITY]: 'y-axis-hum',
  [TEMPERATURE]: 'y-axis-temp',
  [LUX]: 'y-axis-lux',
  [FERTILITY]: 'y-axis-ph'
}


export const dataSetFactory = (type, dataArray) => {
  if (type === HUMIDITY) {
    return {
      label: 'humidity',
      fill: false,
      lineTension: 0.3,
      backgroundColor: humidityColor1,
      borderColor: humidityColor2,
      data: dataArray.map(el => el),
      yAxisID: yAxisIdHashTable[type]
    }
  }
  if (type === TEMPERATURE) {
    return {
      label: 'temperature',
      fill: false,
      lineTension: 0.3,
      backgroundColor: temperatureColor1,
      borderColor: temperatureColor2,
      data: dataArray.map(el => el),
      yAxisID: yAxisIdHashTable[type]
    }
  }
  if (type === LUX) {
    return {
      label: 'Light',
      fill: false,
      lineTension: 0.3,
      backgroundColor: luxColor1,
      borderColor: luxColor2,
      data: dataArray.map(el => el),
      yAxisID: yAxisIdHashTable[type]
    }
  }
  if (type === FERTILITY) {
    return {
      label: 'pH',
      fill: false,
      lineTension: 0.3,
      backgroundColor: fertilityColor1,
      borderColor: fertilityColor2,
      data: dataArray.map(el => el),
      yAxisID: yAxisIdHashTable[type]
    }
  }
}


export function optionsFactory(typesRequestedArray) {

  const baselineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      enabled: false
    },
    elements: {
      line: {
        fill: false
      }
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            display: false
          },
          labels: {
            show: true
          }
        }
      ],
      yAxes: []
    }
  }

  const yAxisBaseline = {
    type: 'linear',
    gridLines: {
      display: false
    },
    labels: {
      show: true
    }
  }

  let yAxesArray = typesRequestedArray.map((type, i) => {
    let yAxisPerculiarToType = {
      position: i%2===0 ? 'left' : 'right',
      id: yAxisIdHashTable[type],
      ticks:{
        fontColor: colorHashTable[type],
        callback: (value) => parseFloat(value.toFixed(2))+unitHashTable[type]
      }
    }
    return Object.assign({}, yAxisBaseline, yAxisPerculiarToType)
  })
  
  // console.log(yAxesArray)
  
  baselineOptions.scales.yAxes = yAxesArray

  return baselineOptions
}
