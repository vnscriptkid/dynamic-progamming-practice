// Time: O(2^n) ; Space: O(n)
function fibNaive(x: number): number {
  if (x <= 1) return x;

  return fibNaive(x - 1) + fibNaive(x - 2);
}

// Time: O(n) ; Space: O(n)
function topDown(x: number, cache: Record<string, number> = {}): number {
  if (!(x in cache)) {
    if (x <= 1) return x;

    cache[x] = topDown(x - 1, cache) + topDown(x - 2, cache);
  }

  return cache[x];
}

// Time: O(n) ; Space: O(n)
function bottomUp(x: number) {
  const dp = Array(x + 1).fill(0);

  dp[1] = 1;

  for (let i = 2; i <= x; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[x];
}

// Time: O(n) ; Space: O(1)
function betterBottomUp(x: number) {
  if (x <= 1) return x;

  let prev = 1;
  let prevOfPrev = 0;

  let i = 2;
  let cur = 0;
  while (i++ <= x) {
    cur = prev + prevOfPrev;
    prevOfPrev = prev;
    prev = cur;
  }

  return cur;
}

export { fibNaive, topDown, bottomUp, betterBottomUp };
