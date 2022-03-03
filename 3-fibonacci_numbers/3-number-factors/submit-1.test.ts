import { bottomUp, naive, topDownCache } from "./submit-1";

test("naive", () => {
  expect(naive(4)).toEqual(4);
  expect(naive(5)).toEqual(6);
});

test("topDownCache", () => {
  expect(topDownCache(4)).toEqual(4);
  expect(topDownCache(5)).toEqual(6);
});

test("bottomUp", () => {
  expect(bottomUp(4)).toEqual(4);
  expect(bottomUp(5)).toEqual(6);
});
