import { naive, topDownCache } from "./submit-1";

test("naive", () => {
  expect(naive([1, 2, 3, 7], 6)).toEqual(true);
  expect(naive([1, 2, 7, 1, 5], 10)).toEqual(true);
  expect(naive([1, 3, 4, 8], 6)).toEqual(false);
});

test("top-down-cache", () => {
  expect(topDownCache([1, 2, 3, 7], 6)).toEqual(true);
  expect(topDownCache([1, 2, 7, 1, 5], 10)).toEqual(true);
  expect(topDownCache([1, 3, 4, 8], 6)).toEqual(false);
});
