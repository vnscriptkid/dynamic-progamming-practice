import { bottomUp, naive, topDown, topDownWithCache } from "./submit-2";

test("naive", () => {
  expect(naive("abdbca")).toEqual(3);
  expect(naive("cddpd")).toEqual(3);
  expect(naive("pqr")).toEqual(1);
});

test("top-down", () => {
  expect(topDown("abdbca")).toEqual(3);
  expect(topDown("cddpd")).toEqual(3);
  expect(topDown("pqr")).toEqual(1);
});

test("top-down with cache", () => {
  expect(topDownWithCache("abdbca")).toEqual(3);
  expect(topDownWithCache("cddpd")).toEqual(3);
  expect(topDownWithCache("pqr")).toEqual(1);
});

test("bottom-up", () => {
  expect(bottomUp("abdbca")).toEqual(3);
  expect(bottomUp("cddpd")).toEqual(3);
  expect(bottomUp("pqr")).toEqual(1);
});
