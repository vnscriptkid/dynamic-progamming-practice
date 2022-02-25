// Problem Statement #
// Given two strings ‘s1’ and ‘s2’, find the length of the longest substring which is common in both the strings.

// Example 1:
// Input: s1 = "abdca"
//        s2 = "cbda"
// Output: 2
// Explanation: The longest common substring is "bd".

// Example 2:
// Input: s1 = "passport"
//        s2 = "ppsspt"
// Output: 3
// Explanation: The longest common substring is "ssp".

function naive1(str1: string, str2: string): number {
  let max = 0;
  for (let i = 0; i < str1.length; i++) {
    let curStr = "";
    for (let j = i; j < str1.length; j++) {
      curStr += str1[j];

      if (str2.includes(curStr)) {
        max = Math.max(max, curStr.length);
      }
    }
  }
  return max;
}

function topDown(
  str1: string,
  str2: string,
  p1 = 0,
  p2 = 0,
  count = 0
): number {
  if (p1 === str1.length || p2 === str2.length) return count;

  if (str1[p1] === str2[p2]) {
    count = topDown(str1, str2, p1 + 1, p2 + 1, count + 1);
  }

  const l2 = topDown(str1, str2, p1, p2 + 1, 0);

  const l3 = topDown(str1, str2, p1 + 1, p2, 0);

  return Math.max(count, l2, l3);
}

function topDownWithCache(
  str1: string,
  str2: string,
  p1 = 0,
  p2 = 0,
  count = 0,
  cache: Record<string, number> = {}
): number {
  const key = String([p1, p2, count]);

  if (!(key in cache)) {
    if (p1 === str1.length || p2 === str2.length) return count;

    let l1 = count;
    if (str1[p1] === str2[p2]) {
      l1 = topDownWithCache(str1, str2, p1 + 1, p2 + 1, count + 1, cache);
    }

    const l2 = topDownWithCache(str1, str2, p1 + 1, p2, 0, cache);

    const l3 = topDownWithCache(str1, str2, p1, p2 + 1, 0, cache);

    cache[key] = Math.max(l1, l2, l3);
  }

  return cache[key];
}

function bottomUp(str1: string, str2: string): number {
  const dp: number[][] = Array(str1.length + 1)
    .fill(0)
    .map(() => Array(str2.length + 1).fill(0));

  let max = 0;

  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
        max = Math.max(max, dp[i][j]);
      }
    }
  }

  return max;
}

function bottomUpBetter(str1: string, str2: string): number {
  const dp: number[][] = Array(2)
    .fill(null)
    .map(() => Array(str2.length).fill(0));
  let max = 0;

  // i === 0 => dp[0]
  // i === 1 => dp[1]
  // i === 2 => dp[0]

  for (let i = 0; i < str1.length; i++) {
    const curRow = dp[i % 2];
    const prevRow = dp[(i + 1) % 2];

    for (let j = 0; j < str2.length; j++) {
      curRow[j] = 0; // reset value
      if (str1[i] === str2[j]) {
        curRow[j] = 1;
        if (j - 1 >= 0) curRow[j] += prevRow[j - 1];
        max = Math.max(max, curRow[j]);
      }
    }
  }

  return max;
}

export { naive1, topDown, topDownWithCache, bottomUp, bottomUpBetter };
