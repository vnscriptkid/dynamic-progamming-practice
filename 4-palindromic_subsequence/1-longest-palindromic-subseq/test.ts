import { naive, topDownCacheMap, topDownCacheMatrix } from "./submit-1";

test("naive", () => {
  expect(naive("abdbca")).toBe(5);
  expect(naive("cddpd")).toBe(3);
  expect(naive("pqr")).toBe(1);
});

test("topDownCacheMap", () => {
  expect(topDownCacheMap("abdbca")).toBe(5);
  expect(topDownCacheMap("cddpd")).toBe(3);
  expect(topDownCacheMap("pqr")).toBe(1);
});

test("topDownCacheMatrix", () => {
  expect(topDownCacheMatrix("abdbca")).toBe(5);
  expect(topDownCacheMatrix("cddpd")).toBe(3);
  expect(topDownCacheMatrix("pqr")).toBe(1);
});
