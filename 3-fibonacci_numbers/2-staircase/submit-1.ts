function naive(stairs: number): number {
  if (stairs === 0) return 1;

  if (stairs === 1) return 1;

  if (stairs === 2) return 2;

  return naive(stairs - 1) + naive(stairs - 2) + naive(stairs - 3);
}

function topDownCache(
  stairs: number,
  cache: Record<string, number> = {}
): number {
  if (!(stairs in cache)) {
    if (stairs === 0) return 1;

    if (stairs === 1) return 1;

    if (stairs === 2) return 2;

    return naive(stairs - 1) + naive(stairs - 2) + naive(stairs - 3);
  }

  return cache[stairs];
}

function bottomUp(stairs: number): number {
  const dp: number[] = new Array(stairs + 1);

  dp[0] = 1;
  dp[1] = 1;
  dp[2] = 2;

  for (let i = 3; i <= stairs; i++) {
    dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
  }
  return dp[stairs];
}

function bottomUpBetter(stairs: number): number {
  let prev3 = 1;
  let prev2 = 1;
  let prev1 = 2;

  let cur = 0;
  for (let i = 3; i <= stairs; i++) {
    cur = prev1 + prev2 + prev3;

    // A  B  C  D
    // p3 p2 p1 c

    prev3 = prev2;
    prev2 = prev1;
    prev1 = cur;
  }
  return cur;
}

export { naive, topDownCache, bottomUp, bottomUpBetter };
