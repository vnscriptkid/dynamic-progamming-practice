import { bottomUp, bottomUpBetter, naive, topDownCache } from "./submit-2";

test("naive", () => {
  expect(naive(3)).toEqual(4);
});

test("top-down cache", () => {
  expect(topDownCache(4)).toEqual(7);
});

test("bottomUp", () => {
  expect(bottomUp(4)).toEqual(7);
});

test("bottomUpBetter", () => {
  expect(bottomUpBetter(4)).toEqual(7);
});
