import { naive } from "./submit-1";

test("naive", () => {
  expect(naive("abdbca")).toBe(5);
  expect(naive("cddpd")).toBe(3);
  expect(naive("pqr")).toBe(1);
});
