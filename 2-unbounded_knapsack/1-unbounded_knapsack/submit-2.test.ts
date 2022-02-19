import { bottomUp, topDown, topDownMemoized, findItems } from "./submit-2";

describe("unbounded knapsack", () => {
  const weights = [1, 2, 3];
  const profits = [15, 20, 50];
  const capacity = 5;

  test("topDown", () => {
    const result = topDown(profits, weights, capacity);

    expect(result).toBe(80);
  });

  test("topDownMemoized", () => {
    const result = topDownMemoized(profits, weights, capacity);

    expect(result).toBe(80);
  });

  test("bottomUp", () => {
    const result = bottomUp(profits, weights, capacity);

    expect(result).toBe(80);
  });
});

test("unbounded knapsack find items", () => {
  const weights = [1, 3, 4, 5];
  const profits = [15, 50, 60, 90];
  const capacity = 8;

  const result = findItems(profits, weights, capacity);

  expect(result).toStrictEqual({ 1: 1, 3: 1 });
});
