export function naive(arr: number[], sum: number, curIdx: number = 0): boolean {
  if (sum === 0) return true;

  if (curIdx === arr.length) return false;

  return (
    naive(arr, sum - arr[curIdx], curIdx + 1) || naive(arr, sum, curIdx + 1)
  );
}

export function topDownCache(
  arr: number[],
  sum: number,
  curIdx: number = 0,
  cache: Record<string, boolean> = {}
): boolean {
  const cacheKey = String([sum, curIdx]);

  if (!(cacheKey in cache)) {
    if (sum === 0) return true;

    if (curIdx === arr.length) return false;

    cache[cacheKey] =
      naive(arr, sum - arr[curIdx], curIdx + 1) || naive(arr, sum, curIdx + 1);
  }

  return cache[cacheKey];
}

export function bottomUp(arr: number[], sum: number): boolean {
  const dp: boolean[][] = Array(arr.length)
    .fill(null)
    .map(() => Array(sum + 1).fill(false));

  // first col
  for (let r = 0; r < arr.length; r++) {
    dp[r][0] = true;
  }

  for (let r = 0; r < arr.length; r++) {
    for (let s = 1; s <= sum; s++) {
      const skipIt = dp[r - 1][s];

      let takeIt = false;
      if (s >= arr[r]) {
        takeIt = dp[r][s];
      }

      dp[r][s] = skipIt || takeIt;
    }

    if (dp[r][sum] === true) return true;
  }

  return dp[arr.length - 1][sum];
}

// TODO: optimize so that space is O(n)
