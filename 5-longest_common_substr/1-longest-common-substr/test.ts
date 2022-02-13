import { naive1, topDown, topDownWithCache } from "./submit-1";

test("naive1", () => {
  expect(naive1("abdca", "cbda")).toBe(2);
  expect(naive1("passport", "ppsspt")).toBe(3);
});

test("topDown", () => {
  expect(topDown("abdca", "cbda")).toBe(2);
  expect(topDown("passport", "ppsspt")).toBe(3);
});

test("topDownWithCache", () => {
  expect(topDownWithCache("abdca", "cbda")).toBe(2);
  expect(topDownWithCache("passport", "ppsspt")).toBe(3);
});
