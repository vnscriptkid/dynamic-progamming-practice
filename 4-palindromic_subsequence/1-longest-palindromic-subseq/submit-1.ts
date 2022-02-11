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

export { naive };
