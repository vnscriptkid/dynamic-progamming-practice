import { betterBottomUp, bottomUp, fibNaive, topDown } from "./submit-1";

test("fibNaive", () => {
  expect(fibNaive(0)).toBe(0);
  expect(fibNaive(1)).toBe(1);
  expect(fibNaive(6)).toBe(8);
});

test("topDown", () => {
  expect(topDown(0)).toBe(0);
  expect(topDown(1)).toBe(1);
  expect(topDown(6)).toBe(8);
  expect(topDown(100, true)).toBe(354224848179262000000);
});

test("bottomUp", () => {
  expect(bottomUp(0)).toBe(0);
  expect(bottomUp(1)).toBe(1);
  expect(bottomUp(6)).toBe(8);
  expect(bottomUp(100)).toBe(354224848179262000000);
});

test("betterBottomUp", () => {
  expect(betterBottomUp(0)).toBe(0);
  expect(betterBottomUp(1)).toBe(1);
  expect(betterBottomUp(6)).toBe(8);
  expect(betterBottomUp(100)).toBe(354224848179262000000);
});
