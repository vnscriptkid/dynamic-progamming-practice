import { topDown, topDownMemoized } from "./submit-1";

test("topDown", () => {
  const weights = [1, 2, 3];
  const profits = [15, 20, 50];
  const capacity = 5;
  const result = topDown(profits, weights, capacity);

  expect(result).toBe(80);
});

test("topDownMemoized", () => {
  const weights = [1, 2, 3];
  const profits = [15, 20, 50];
  const capacity = 5;
  const result = topDownMemoized(profits, weights, capacity);

  expect(result).toBe(80);
});
