function naive(nums: number[]): boolean {
  const sum = nums.reduce((a, b) => a + b, 0);

  if (sum % 2 !== 0) return false;

  const halfSum = sum / 2;

  function dfs(curSum: number, curIdx: number): boolean {
    if (curSum > halfSum || curIdx === nums.length) return false;

    if (curSum === halfSum) return true;

    return dfs(curSum + nums[curIdx], curIdx + 1) || dfs(curSum, curIdx + 1);
  }

  return dfs(0, 0);
}

function topDownCache(nums: number[]): boolean {
  const sum = nums.reduce((a, b) => a + b, 0);

  if (sum % 2 !== 0) return false;

  const halfSum = sum / 2;

  const cache: Record<string, boolean> = {};

  function dfs(curSum: number, curIdx: number): boolean {
    const cacheKey = String([curSum, curIdx]);

    if (!(cacheKey in cache)) {
      if (curSum > halfSum || curIdx === nums.length) return false;

      if (curSum === halfSum) return true;

      cache[cacheKey] =
        dfs(curSum + nums[curIdx], curIdx + 1) || dfs(curSum, curIdx + 1);
    }

    return cache[cacheKey];
  }

  return dfs(0, 0);
}

function bottomUp(nums: number[]): boolean {
  const n = nums.length;

  const sum = nums.reduce((a, b) => a + b, 0);

  if (sum % 2 === 1) return false;

  const halfSum = sum / 2;

  const dp: boolean[][] = Array(n)
    .fill(null)
    .map(() => Array(halfSum + 1).fill(false));

  // init first col
  for (let i = 0; i < n; i++) dp[i][0] = true;

  // init first row
  if (nums[0] >= 1 && nums[0] <= halfSum) dp[0][nums[0]] = true;

  for (let i = 1; i < n; i++) {
    for (let s = 1; s <= halfSum; s++) {
      if (dp[i - 1][s] === true) {
        dp[i][s] = true;
      } else if (s >= nums[i]) {
        dp[i][s] = dp[i - 1][s - nums[i]];
      }
    }
  }

  return dp[n - 1][halfSum];
}

export { naive, topDownCache, bottomUp };
