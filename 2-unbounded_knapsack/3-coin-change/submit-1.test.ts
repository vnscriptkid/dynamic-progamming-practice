import { bottomUp, naive, topDownCache } from "./submit-1";

test("naive", () => {
  expect(naive([1, 2, 3], 5)).toBe(5);
});

test("top-down cache", () => {
  expect(topDownCache([1, 2, 3], 5)).toBe(5);
});

test("bottom-up", () => {
  expect(bottomUp([1, 2, 3], 5)).toBe(5);
});
