import { bottomUp, findItems, naive, topDownCache } from "./submit-1";

// Items: { Apple, Orange, Banana, Melon }
// Weights: { 2, 3, 1, 4 }
// Profits: { 4, 5, 3, 7 }
// Knapsack capacity: 5
describe("knapsack", () => {
  const weights = [2, 3, 1, 4];
  const profits = [4, 5, 3, 7];
  const capacity = 5;

  test("naive", () => {
    expect(naive(profits, weights, capacity)).toEqual(10);
  });

  test("topDownCache", () => {
    expect(topDownCache(profits, weights, capacity)).toEqual(10);
  });

  test("bottomUp", () => {
    expect(bottomUp(profits, weights, capacity)).toEqual(10);
  });

  test("findItems", () => {
    const weights = [1, 2, 3, 5];
    const profits = [1, 6, 10, 16];
    const capacity = 7;
    expect(findItems(profits, weights, capacity)).toEqual([1, 3]);
  });
});
