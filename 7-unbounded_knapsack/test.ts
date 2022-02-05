import { bottomUp, topDown, topDownMemoized } from "./submit-1";

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
