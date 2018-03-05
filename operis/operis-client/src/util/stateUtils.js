export const updateObjectArrayState = (newObject, array) => {
  const index = array.findIndex(object => object.id === newObject.id);
  const newArray =
    index === -1
      ? [...array, newObject]
      : [...array.slice(0, index), newObject, ...array.slice(index + 1)];
  return newArray;
};
