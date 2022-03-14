// Given strings s1 and s2, we need to transform s1 into s2 by deleting and inserting characters.
// Write a function to calculate the count of the minimum number of deletion and insertion operations.

// Example 1:
// Input: s1 = "abc"
//        s2 = "fbc"
// Output: 1 deletion and 1 insertion.
// Explanation: We need to delete {'a'} and insert {'f'} to s1 to transform it into s2.

// Example 2:
// Input: s1 = "abdca"
//        s2 = "cbda"
// Output: 2 deletions and 1 insertion.
// Explanation: We need to delete {'a', 'c'} and insert {'c'} to s1 to transform it into s2.

// Example 3:
// Input: s1 = "passport"
//        s2 = "ppsspt"
// Output: 3 deletions and 1 insertion
// Explanation: We need to delete {'a', 'o', 'r'} and insert {'p'} to s1 to transform it into s2.

export function bottomUp(s1: string, s2: string) {
  const dp: number[][] = Array(s1.length + 1)
    .fill(null)
    .map(() => Array(s2.length + 1).fill(0));

  for (let row = 1; row <= s1.length; row++) {
    for (let col = 1; col <= s2.length; col++) {
      let l1 = dp[row - 1][col];
      let l2 = dp[row][col - 1];

      let l3 = 0;
      if (s1[row - 1] === s2[col - 1]) {
        l3 = 1 + dp[row - 1][col - 1];
      }

      dp[row][col] = Math.max(l1, l2, l3);
    }
  }

  let longestCommonSubstr = dp[s1.length][s2.length];

  return {
    deletions: s1.length - longestCommonSubstr,
    insertions: s2.length - longestCommonSubstr,
  };
}
