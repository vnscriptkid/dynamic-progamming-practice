import { bottomUp, naive, topDownCache } from "./submit-1";

test("naive", () => {
  const lengths = [1, 2, 3, 4, 5];
  const prices = [2, 6, 7, 10, 13];
  const result = naive(lengths, prices, 5);
  expect(result).toEqual(14);
});

test("topDownCache", () => {
  const lengths = [1, 2, 3, 4, 5];
  const prices = [2, 6, 7, 10, 13];
  const result = topDownCache(lengths, prices, 5);
  expect(result).toEqual(14);
});

test("bottomUp", () => {
  const lengths = [1, 2, 3, 4, 5];
  const prices = [2, 6, 7, 10, 13];
  const result = bottomUp(lengths, prices, 5);
  expect(result).toEqual(14);
});
