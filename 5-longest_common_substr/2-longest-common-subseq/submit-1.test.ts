import { naive, topDownCache } from "./submit-1";

test("naive", () => {
  expect(naive("abdca", "cbda")).toEqual(3);
  expect(naive("passport", "ppsspt")).toEqual(5);
});

test("top-down-cache", () => {
  expect(topDownCache("abdca", "cbda")).toEqual(3);
  expect(topDownCache("passport", "ppsspt")).toEqual(5);
});
