/*
Convert a base 10 number to decimal
ex 1 -> 0.01
k is how many of the first numbers to keep
l = 2 -> 0.1
*/
const intToDecimal = (n, k = 1) => {
  var l = n.toString().length + k;
  var v = n / Math.pow(10, l);
  return v;
};

export default intToDecimal;
