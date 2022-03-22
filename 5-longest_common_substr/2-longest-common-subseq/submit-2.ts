export function naive(
  str1: string,
  str2: string,
  i1 = 0,
  i2 = 0,
  curLongest = 0
): number {
  if (i1 === str1.length || i2 === str2.length) return curLongest;

  const l1 = naive(str1, str2, i1 + 1, i2, curLongest);

  const l2 = naive(str1, str2, i1, i2 + 1, curLongest);

  if (str1[i1] === str2[i2])
    curLongest = naive(str1, str2, i1 + 1, i2 + 1, curLongest + 1);

  return Math.max(l1, l2, curLongest);
}

export function topDownCache(
  str1: string,
  str2: string,
  i1 = 0,
  i2 = 0,
  cache: any = {}
): number {
  const cacheKey = String([i1, i2]);

  if (!(cacheKey in cache)) {
    if (i1 === str1.length || i2 === str2.length) return 0;

    if (str1[i1] === str2[i2]) {
      return 1 + topDownCache(str1, str2, i1 + 1, i2 + 1);
    }

    const l1 = topDownCache(str1, str2, i1 + 1, i2);

    const l2 = topDownCache(str1, str2, i1, i2 + 1);

    cache[cacheKey] = Math.max(l1, l2);
  }

  return cache[cacheKey];
}

export function bottomUp(str1: string, str2: string) {
  const dp: number[][] = Array(str1.length)
    .fill(null)
    .map(() => Array(str2.length).fill(0));

  // first row
  for (let c = 0; c < str2.length; c++) {
    if (str1[0] === str2[c] || (c > 0 && dp[0][c - 1])) dp[0][c] = 1;
  }

  // first col
  for (let r = 0; r < str1.length; r++) {
    if (str1[r] === str2[0] || (r > 0 && dp[r - 1][0])) dp[r][0] = 1;
  }

  for (let r = 1; r < str1.length; r++) {
    for (let c = 1; c < str2.length; c++) {
      if (str1[r] === str2[c]) {
        dp[r][c] = 1 + dp[r - 1][c - 1];
      } else {
        dp[r][c] = Math.max(dp[r - 1][c], dp[r][c - 1]);
      }
    }
  }

  return dp[str1.length - 1][str2.length - 1];
}
