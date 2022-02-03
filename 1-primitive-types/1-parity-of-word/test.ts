import compute from ".";

test("works", () => {
  const result = compute();

  expect(result).toBe(1);
});
