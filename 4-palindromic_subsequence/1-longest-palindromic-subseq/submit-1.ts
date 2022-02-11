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

function naive(
  str: string,
  curIdx = 0,
  curStr = "",
  bestStr = { current: "" }
) {
  // base case
  if (curIdx === str.length) {
    if (curStr === curStr.split("").reverse().join("")) {
      // this is palindromic
      if (curStr.length > bestStr.current.length) {
        bestStr.current = curStr;
      }
    }
    return;
  }

  // 2 choices:

  // take cur char
  // skip cur char
  for (const curChar of [str[curIdx], ""]) {
    naive(str, curIdx + 1, curStr + curChar, bestStr);
  }

  return bestStr.current.length;
}

function topDownCacheMap(str: string) {
  const cache: Record<string, number> = {};

  function dfs(startIdx: number, endIdx: number): number {
    const key = `${startIdx}|${endIdx}`;

    if (cache[key]) return cache[key];

    if (startIdx > endIdx) return 0;

    if (startIdx === endIdx) return 1;

    if (str[startIdx] === str[endIdx]) return 2 + dfs(startIdx + 1, endIdx - 1);

    const skipEnd = dfs(startIdx, endIdx - 1);
    const skipStart = dfs(startIdx + 1, endIdx);

    const result = Math.max(skipEnd, skipStart);

    cache[key] = result;

    return result;
  }

  return dfs(0, str.length - 1);
}

function topDownCacheMatrix(str: string) {
  const n = str.length;
  const dp: number[][] = Array(n)
    .fill(0)
    .map(() => Array(n).fill(undefined));

  function dfs(startIdx: number, endIdx: number): number {
    if (dp[startIdx][endIdx] !== undefined) return dp[startIdx][endIdx];

    if (startIdx > endIdx) return 0;

    if (startIdx === endIdx) return 1;

    if (str[startIdx] === str[endIdx]) return 2 + dfs(startIdx + 1, endIdx - 1);

    const skipEnd = dfs(startIdx, endIdx - 1);
    const skipStart = dfs(startIdx + 1, endIdx);

    const result = Math.max(skipEnd, skipStart);

    dp[startIdx][endIdx] = result;

    return result;
  }

  return dfs(0, str.length - 1);
}

export { naive, topDownCacheMap, topDownCacheMatrix };
