import { bottomUp } from "./submit-1";

test("bottomUp 1", () => {
  let s1 = "abc",
    s2 = "fbc";
  expect(bottomUp(s1, s2)).toEqual({ deletions: 1, insertions: 1 });
});

test("bottomUp 2", () => {
  let s1 = "abdca",
    s2 = "cbda";
  expect(bottomUp(s1, s2)).toEqual({ deletions: 2, insertions: 1 });
});

test("bottomUp 3", () => {
  let s1 = "passport",
    s2 = "ppsspt";
  expect(bottomUp(s1, s2)).toEqual({ deletions: 3, insertions: 1 });
});
