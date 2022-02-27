function naive(str: string) {
  // a b c b d
  let longestPalind = 1;

  for (let start = 0; start < str.length; start++) {
    for (let end = start; end < str.length; end++) {
      const curStr = str.substring(start, end + 1);
      const reversed = curStr.split("").reverse().join("");

      if (curStr === reversed)
        longestPalind = Math.max(longestPalind, curStr.length);
    }
  }

  return longestPalind;
}

function topDown(str: string) {
  function _topDown(start: number, end: number): number {
    if (start > end) return 0;

    if (start === end) return 1;

    if (str[start] === str[end]) {
      const remainingLength = end - start - 1;
      const s1 = _topDown(start + 1, end - 1);
      if (s1 === remainingLength) return 2 + s1;
    }

    const s2 = _topDown(start, end - 1);
    const s3 = _topDown(start + 1, end);

    return Math.max(s2, s3);
  }

  return _topDown(0, str.length - 1);
}

function topDownWithCache(str: string) {
  const cache: Record<string, number> = {};

  function _topDown(start: number, end: number): number {
    const cacheKey = String([start, end]);

    if (!(cacheKey in cache)) {
      if (start > end) return 0;

      if (start === end) return 1;

      if (str[start] === str[end]) {
        const remainingLength = end - start - 1;
        const s1 = _topDown(start + 1, end - 1);
        if (s1 === remainingLength) return 2 + s1;
      }

      const s2 = _topDown(start, end - 1);
      const s3 = _topDown(start + 1, end);

      cache[cacheKey] = Math.max(s2, s3);
    }

    return cache[cacheKey];
  }

  return _topDown(0, str.length - 1);
}

function bottomUp(str: string): number {
  const n = str.length;
  const dp: number[][] = Array(n)
    .fill(null)
    .map(() => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    dp[i][i] = 1;
  }

  for (let i = n - 2; i >= 0; i--) {
    for (let j = i + 1; j < n; j++) {
      const remainingLength = j - i - 1;

      if (str[i] === str[j] && dp[i + 1][j - 1] === remainingLength) {
        dp[i][j] = 2 + dp[i + 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i][j - 1], dp[i + 1][j]);
      }
    }
  }

  return dp[0][n - 1];
}

export { naive, topDown, topDownWithCache, bottomUp };
