export const buildUpdate = values => {
  return {
    UpdateExpression: `SET`
    // ExpressionAttributeValues: {
    //   ':beds': data.beds ? data.beds : null,
    //   ':maxOccupancy': data.maxOccupancy ? data.maxOccupancy : null,
    //   ':reserved': data.reserved ? data.reserved : null,
    //   ':costPerNight': data.costPerNight ? data.costPerNight : null
    // }
  }
}

export const buildUpdateExpression = values =>
  Object.keys(values).reduce((string, key, i, array) => {
    const insertAfter = array.length === i + 1 ? '' : ', '
    return string.concat(`${key} = :${key}${insertAfter}`)
  }, `SET `)

export const buildAttributeValues = values =>
  Object.keys(values).reduce(
    (object, key) => ({
      ...object,
      [':' + key]: values[key]
    }),
    {}
  )
