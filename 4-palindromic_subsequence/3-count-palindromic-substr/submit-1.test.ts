import { bottomUp, naive } from "./submit-1";

test("naive", () => {
  expect(naive("abdbca")).toEqual(7);
  expect(naive("cddpd")).toEqual(7);
  expect(naive("pqr")).toEqual(3);
});

test("bottomup", () => {
  expect(bottomUp("abdbca")).toEqual(7);
  expect(bottomUp("cddpd")).toEqual(7);
  expect(bottomUp("pqr")).toEqual(3);
});
