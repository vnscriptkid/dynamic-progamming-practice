import { naive, topDownCache, bottomUp } from "./submit-2";

test("naive", () => {
  expect(naive("abdca", "cbda")).toEqual(3);
  expect(naive("passport", "ppsspt")).toEqual(5);
});

test("top-down-cache", () => {
  expect(topDownCache("abdca", "cbda")).toEqual(3);
  expect(topDownCache("passport", "ppsspt")).toEqual(5);
});

test("bottom-up", () => {
  expect(bottomUp("abdca", "cbda")).toEqual(3);
  expect(bottomUp("passport", "ppsspt")).toEqual(5);
});
