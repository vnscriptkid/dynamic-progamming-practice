import { fibNaive, topDown } from "./submit-1";

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
