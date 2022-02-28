function naive(s1: string, s2: string, i1: number = 0, i2: number = 0): number {
  if (i1 === s1.length || i2 === s2.length) return 0;

  if (s1[i1] === s2[i2]) return 1 + naive(s1, s2, i1 + 1, i2 + 1);

  const l1 = naive(s1, s2, i1 + 1, i2);
  const l2 = naive(s1, s2, i1, i2 + 1);

  return Math.max(l1, l2);
}

function topDownCache(s1: string, s2: string): number {
  const cache: Record<string, number> = {};

  function _topDownCache(i1: number, i2: number): number {
    const cacheKey = String([i1, i2]);

    if (!(cacheKey in cache)) {
      if (i1 === s1.length || i2 === s2.length) return 0;

      if (s1[i1] === s2[i2]) return 1 + _topDownCache(i1 + 1, i2 + 1);

      const l1 = _topDownCache(i1 + 1, i2);
      const l2 = _topDownCache(i1, i2 + 1);

      cache[cacheKey] = Math.max(l1, l2);
    }

    return cache[cacheKey];
  }

  return _topDownCache(0, 0);
}

function bottomUp(s1: string, s2: string) {
  const dp: number[][] = Array(s1.length + 1)
    .fill(null)
    .map(() => Array(s2.length + 1).fill(0));

  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[s1.length][s2.length];
}

export { naive, topDownCache, bottomUp };
