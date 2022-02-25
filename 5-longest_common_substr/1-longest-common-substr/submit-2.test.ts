import {
  bottomUp,
  bottomUpBetter,
  naive1,
  topDown,
  topDownWithCache,
} from "./submit-2";

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

test("bottomUp", () => {
  expect(bottomUp("abdca", "cbda")).toBe(2);
  expect(bottomUp("passport", "ppsspt")).toBe(3);
});

test("bottomUpBetter", () => {
  expect(bottomUpBetter("abdca", "cbda")).toBe(2);
  expect(bottomUpBetter("passport", "ppsspt")).toBe(3);
});
