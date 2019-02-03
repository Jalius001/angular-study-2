const generateArray = function* (arr) {
  const data = Array.from(arr);
  for (let i = 0; i < data.length; i++) {
    yield data[i];
  }
}
module.exports.generateArray = generateArray;

const merge = function(arr1, arr2) {
  return [...generateArray(arr1), ...generateArray(arr2)];
}
module.exports.merge = merge;

const mergeWithSorting = function (arr1, arr2) {
  return [...generateArray(arr1), ...generateArray(arr2)].sort(function (a, b) { return a - b});
}
module.exports.mergeWithSorting = mergeWithSorting;

