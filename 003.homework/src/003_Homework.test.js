const homework = require('./003_Homework');

test('should generate array', () => {
  const generator = homework.generateArray([1, 7]);
  expect(generator.next().value).toBe(1);
  expect(generator.next().value).toBe(7);
  expect(generator.next().done).toBe(true);
});

test('should return merged array', () => {
  expect(homework.merge([1, 7, 11, 17], [3, 5, 13])).toEqual([1, 7, 11, 17, 3, 5, 13]);
});

test('should return sorted merged array', () => {
  expect(homework.mergeWithSorting([2, 3, 5, 7, 11], [2, 4, 6, 8, 10, 12, 14])).toEqual([2, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 14]);
});
