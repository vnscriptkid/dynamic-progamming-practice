export function naive(str: string) {
  let globalMax = 1;

  for (let start = 0; start < str.length; start++) {
    for (let end = start; end < str.length; end++) {
      const cur = str.substring(start, end + 1);

      const reversed = cur.split("").reverse().join("");

      if (cur === reversed) {
        globalMax = Math.max(globalMax, cur.length);
      }
    }
  }

  return globalMax;
}

export function topDown(str: string) {
  function findLongest(start: number, end: number): number {
    if (start > end) return 0;

    if (start === end) return 1;

    let l1 = findLongest(start + 1, end - 1);

    if (str[start] === str[end] && l1 === end - start - 1) {
      l1 += 2;
    }

    let l2 = findLongest(start, end - 1);

    let l3 = findLongest(start + 1, end);

    return Math.max(l1, l2, l3);
  }

  return findLongest(0, str.length - 1);
}

export function topDownWithCache(str: string) {
  const cache: any = {};

  function findLongest(start: number, end: number): number {
    const cacheKey = String([start, end]);

    if (!(cacheKey in cache)) {
      if (start > end) return 0;

      if (start === end) return 1;

      let l1 = findLongest(start + 1, end - 1);

      if (str[start] === str[end] && l1 === end - start - 1) {
        l1 += 2;
      }

      let l2 = findLongest(start, end - 1);

      let l3 = findLongest(start + 1, end);

      cache[cacheKey] = Math.max(l1, l2, l3);
    }

    return cache[cacheKey];
  }

  return findLongest(0, str.length - 1);
}

export function bottomUp(str: string) {
  const n = str.length;

  const dp: number[][] = Array(n)
    .fill(null)
    .map(() => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    dp[i][i] = 1;
  }

  for (let r = n - 2; r >= 0; r--) {
    for (let c = r + 1; c < n; c++) {
      const m1 = dp[r][c - 1];

      const m2 = dp[r + 1][c];

      let m3 = dp[r + 1][c - 1];

      if (str[r] === str[c] && m3 === Math.abs(r - c) - 1) {
        m3 += 2;
      }

      dp[r][c] = Math.max(m1, m2, m3);
    }
  }

  return dp[0][n - 1];
}
