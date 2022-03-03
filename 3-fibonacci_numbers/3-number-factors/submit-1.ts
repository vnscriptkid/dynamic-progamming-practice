export function naive(n: number): number {
  // 1, 3, 4
  if (n === 0) return 1;

  if (n === 1) return 1; // 1 = 1

  if (n === 2) return 1; // 2 = 1 + 1

  if (n === 3) return 2; // 3 = 1 + 1 + 1 || 3 = 3

  return naive(n - 1) + naive(n - 3) + naive(n - 4);
}

export function topDownCache(
  n: number,
  cache: Record<string, number> = {}
): number {
  const key = String(n);

  if (!(key in cache)) {
    // 1, 3, 4
    if (n === 0) return 1;

    if (n === 1) return 1; // 1 = 1

    if (n === 2) return 1; // 2 = 1 + 1

    if (n === 3) return 2; // 3 = 1 + 1 + 1 || 3 = 3

    cache[key] = naive(n - 1) + naive(n - 3) + naive(n - 4);
  }

  return cache[key];
}

export function bottomUp(n: number): number {
  // 1, 3, 4
  if (n === 0) return 1;

  if (n === 1) return 1; // 1 = 1

  if (n === 2) return 1; // 2 = 1 + 1

  if (n === 3) return 2; // 3 = 1 + 1 + 1 || 3 = 3

  const dp: number[] = Array(n + 1);

  dp[0] = 1;

  dp[1] = 1;

  dp[2] = 1;

  dp[3] = 2;

  for (let i = 4; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 3] + dp[i - 4];
  }

  return dp[n];
}
