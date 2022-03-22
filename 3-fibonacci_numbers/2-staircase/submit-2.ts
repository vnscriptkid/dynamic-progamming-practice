export function naive(n: number): number {
  if (n === 0 || n === 1) return 1;

  if (n === 2) return 2;

  return naive(n - 1) + naive(n - 2) + naive(n - 3);
}

export function topDownCache(n: number, cache: any = {}) {
  if (!(n in cache)) {
    if (n === 0 || n === 1) return 1;

    if (n === 2) return 2;

    cache[n] = naive(n - 1) + naive(n - 2) + naive(n - 3);
  }

  return cache[n];
}

export function bottomUp(n: number) {
  const dp = Array(n + 1).fill(0);

  dp[0] = 1;
  dp[1] = 1;
  dp[2] = 2;

  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
  }

  return dp[n];
}

export function bottomUpBetter(n: number) {
  let p1 = 1,
    p2 = 1,
    p3 = 2;

  let cur = 0;
  for (let i = 3; i <= n; i++) {
    cur = p1 + p2 + p3;

    p1 = p2;
    p2 = p3;
    p3 = cur;
  }

  return cur;
}
