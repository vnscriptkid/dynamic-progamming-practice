import { bottomUp, naive, topDownCache } from "./submit-2";

test("naive", () => {
  expect(naive([1, 2, 3, 4])).toEqual(true);
  expect(naive([1, 1, 3, 4, 7])).toEqual(true);
  expect(naive([2, 3, 4, 6])).toEqual(false);
});

test("top-down-cache", () => {
  expect(topDownCache([1, 2, 3, 4])).toEqual(true);
  expect(topDownCache([1, 1, 3, 4, 7])).toEqual(true);
  expect(topDownCache([2, 3, 4, 6])).toEqual(false);
});

test("bottom-up", () => {
  expect(bottomUp([1, 2, 3, 4])).toEqual(true);
  expect(bottomUp([1, 1, 3, 4, 7])).toEqual(true);
  expect(bottomUp([2, 3, 4, 6])).toEqual(false);
});
