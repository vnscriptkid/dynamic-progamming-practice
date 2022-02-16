import { bottomUp, naive, topDownCache } from "./submit-1";

// Items: { Apple, Orange, Banana, Melon }
// Weights: { 2, 3, 1, 4 }
// Profits: { 4, 5, 3, 7 }
// Knapsack capacity: 5
test("naive", () => {
  const weights = [2, 3, 1, 4];
  const profits = [4, 5, 3, 7];
  const capacity = 5;
  expect(naive(profits, weights, capacity)).toEqual(10);
});

test("topDownCache", () => {
  const weights = [2, 3, 1, 4];
  const profits = [4, 5, 3, 7];
  const capacity = 5;
  expect(topDownCache(profits, weights, capacity)).toEqual(10);
});

test("bottomUp", () => {
  const weights = [2, 3, 1, 4];
  const profits = [4, 5, 3, 7];
  const capacity = 5;
  expect(bottomUp(profits, weights, capacity)).toEqual(10);
});
