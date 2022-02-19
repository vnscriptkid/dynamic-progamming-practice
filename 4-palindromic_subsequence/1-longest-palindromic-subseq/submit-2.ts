// Given a sequence, find the length of its Longest Palindromic Subsequence (LPS).
// In a palindromic subsequence, elements read the same backward and forward.

// A subsequence is a sequence that can be derived from another sequence by
// deleting some or no elements without changing the order of the remaining elements.

// Example 1:
// Input: "abdbca"
// Output: 5
// Explanation: LPS is "abdba".

// Example 2:
// Input: = "cddpd"
// Output: 3
// Explanation: LPS is "ddd".

// Example 3:
// Input: = "pqr"
// Output: 1
// Explanation: LPS could be "p", "q" or "r".

// Time: O(2^n) ; Space: O(n)
function naive(str: string, curIdx = 0, curStr = ""): number {
  // base case
  if (curIdx === str.length) {
    const reversed = curStr.split("").reverse().join("");
    if (curStr === reversed) return curStr.length;
    return 0;
  }

  const l1 = naive(str, curIdx + 1, curStr);

  const l2 = naive(str, curIdx + 1, curStr + str[curIdx]);

  return Math.max(l1, l2);
}

// Time: O(2^n) ; Space: O(n)
function topDown(str: string) {
  function _topDown(low: number, high: number): number {
    if (low > high) return 0;

    if (low === high) return 1;

    let l1 = 0;

    if (str[low] === str[high]) l1 = 2 + _topDown(low + 1, high - 1);

    const l2 = _topDown(low, high - 1);

    const l3 = _topDown(low + 1, high);

    return Math.max(l1, l2, l3);
  }

  return _topDown(0, str.length - 1);
}

// Time: O(n) ; Space: O(n)
function topDownCacheMap(str: string) {
  const cache: Record<string, number> = {};

  function _topDown(low: number, high: number): number {
    const key = String([low, high]);

    if (!(key in cache)) {
      if (low > high) return 0;

      if (low === high) return 1;

      let l1 = 0;

      if (str[low] === str[high]) l1 = 2 + _topDown(low + 1, high - 1);

      const l2 = _topDown(low, high - 1);

      const l3 = _topDown(low + 1, high);

      cache[key] = Math.max(l1, l2, l3);
    }

    return cache[key];
  }

  return _topDown(0, str.length - 1);
}

// Time: O(n); Space: O(n*n)
function topDownCacheMatrix(str: string) {
  const n = str.length;
  const dp: number[][] = Array(n)
    .fill(0)
    .map(() => Array(n).fill(-1));

  function _topDown(low: number, high: number): number {
    if (dp[low][high] === -1) {
      if (low > high) return 0;

      if (low === high) return 1;

      let l1 = 0;

      if (str[low] === str[high]) l1 = 2 + _topDown(low + 1, high - 1);

      const l2 = _topDown(low, high - 1);

      const l3 = _topDown(low + 1, high);

      dp[low][high] = Math.max(l1, l2, l3);
    }

    return dp[low][high];
  }

  return _topDown(0, str.length - 1);
}

// Time: O(n*n); Space: O(n*n)
function bottomUp(str: string) {
  const n = str.length;
  const dp: number[][] = Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    dp[i][i] = 1;
  }

  for (let row = n - 2; row >= 0; row--) {
    for (let col = row + 1; col < n; col++) {
      let l1 = 0;
      if (str[row] === str[col]) {
        l1 = 2 + dp[row + 1][col - 1];
      }

      const l2 = dp[row][col - 1];

      const l3 = dp[row + 1][col];

      dp[row][col] = Math.max(l1, l2, l3);
    }
  }

  return dp[0][n - 1];
}

export { naive, topDownCacheMap, topDownCacheMatrix, bottomUp, topDown };
