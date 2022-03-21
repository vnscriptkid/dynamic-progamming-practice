export function naive(arr: number[]) {
  const sum = arr.reduce((a, b) => a + b);

  if (sum % 2 === 1) return false;

  const half = sum / 2;

  function dfs(targetSum: number, curIdx: number): boolean {
    if (curIdx === arr.length || targetSum < 0) return false;

    if (targetSum === 0) return true;

    return (
      dfs(targetSum - arr[curIdx], curIdx + 1) || dfs(targetSum, curIdx + 1)
    );
  }

  return dfs(half, 0);
}

export function topDownCache(arr: number[]) {
  const sum = arr.reduce((a, b) => a + b);

  if (sum % 2 === 1) return false;

  const half = sum / 2;

  function dfs(
    targetSum: number,
    curIdx: number,
    cache: Record<string, boolean> = {}
  ): boolean {
    const cacheKey = String([targetSum, curIdx]);

    if (!(cacheKey in cache)) {
      if (curIdx === arr.length || targetSum < 0) return false;

      if (targetSum === 0) return true;

      cache[cacheKey] =
        dfs(targetSum - arr[curIdx], curIdx + 1) || dfs(targetSum, curIdx + 1);
    }

    return cache[cacheKey];
  }

  return dfs(half, 0);
}

export function bottomUp(arr: number[]) {
  const sum = arr.reduce((a, b) => a + b);

  if (sum % 2 === 1) return false;

  const half = sum / 2;

  const dp: boolean[][] = Array(arr.length)
    .fill(null)
    .map(() => Array(half + 1).fill(false));

  // first col is all true
  for (let r = 0; r < arr.length; r++) dp[r][0] = true;

  // first row
  for (let c = 1; c <= half; c++) {
    if (c === arr[0]) dp[0][c] = true;
  }

  for (let r = 1; r < arr.length; r++) {
    for (let c = 1; c <= half; c++) {
      if (dp[r - 1][c] === true) {
        dp[r][c] = true;
      } else if (c >= arr[r]) {
        dp[r][c] = dp[r - 1][c - arr[r]];
      }
    }
  }

  return dp[arr.length - 1][half];
}
