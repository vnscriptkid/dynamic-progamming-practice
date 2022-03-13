export function naive(str: string): number {
  const seen = new Set();

  function dfs(
    left: number,
    right: number
  ): { count: number; longest: number } {
    const key = String([left, right]);
    if (seen.has(key))
      return {
        count: 0,
        longest: 0,
      };
    // base case
    if (left > right)
      return {
        count: 0,
        longest: 0,
      };

    if (left === right)
      return {
        count: 0,
        longest: 1,
      };

    let localCount = 0;

    let result1 = { count: 0, longest: 0 };

    if (str[left] === str[right]) {
      result1 = dfs(left + 1, right - 1);

      localCount += result1.count;
      if (result1.longest === right - left - 1) localCount += 1;
    }

    const result2 = dfs(left + 1, right);
    localCount += result2.count;

    const result3 = dfs(left, right - 1);
    localCount += result3.count;

    seen.add(key);

    return {
      count: localCount,
      longest: Math.max(result1.longest, result2.longest, result3.longest),
    };
  }

  return dfs(0, str.length - 1).count + str.length;
}

export function bottomUp(str: string) {
  const n = str.length;

  const dp: boolean[][] = Array(n)
    .fill(null)
    .map(() => Array(n).fill(false));

  let count = 0;

  for (let i = 0; i < n; i++) {
    dp[i][i] = true;
    count++;
  }

  for (let row = n - 2; row >= 0; row--) {
    for (let col = row + 1; col < n; col++) {
      if (str[row] === str[col]) {
        if (Math.abs(row - col) === 1 || dp[row + 1][col - 1]) {
          dp[row][col] = true;
          count++;
        }
      }
    }
  }

  return count;
}
