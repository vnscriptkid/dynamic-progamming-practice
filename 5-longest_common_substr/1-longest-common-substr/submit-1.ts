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
  // BRUTE FORCE (N^3)
  let output = 0;
  // go through all possible substrings in str1
  for (let i = 0; i < str1.length; ++i) {
    let curStr = "";
    for (let j = i; j < str1.length; ++j) {
      curStr += str1[j];

      // check if str2 includes the substring, consider update current longest value
      if (str2.includes(curStr)) {
        output = Math.max(output, curStr.length);
      }
    }
  }

  return output;
}

function topDown(
  str1: string,
  str2: string,
  p1 = 0,
  p2 = 0,
  count = 0
): number {
  // base case
  if (p1 === str1.length || p2 === str2.length) return count;

  // 2 cases:
  // case 1: str[p1] === str[p2] => count++;
  let x = count;
  if (str1[p1] === str2[p2]) {
    x = topDown(str1, str2, p1 + 1, p2 + 1, count + 1);
  }
  // case 2: str[p1] !== str[p2]
  // // 2.1: skip p1
  const y = topDown(str1, str2, p1 + 1, p2, 0);
  // // 2.2: skip p2
  const z = topDown(str1, str2, p1, p2 + 1, 0);

  return Math.max(x, y, z);
}

function topDownWithCache(str1: string, str2: string): number {
  const cache: Record<string, number> = {};

  let runsCount = 0;

  function dfs(str1: string, str2: string, p1 = 0, p2 = 0, count = 0): number {
    runsCount++;

    const key = String([p1, p2, count]);
    if (key in cache) return cache[key];
    // base case
    if (p1 === str1.length || p2 === str2.length) return count;

    // 2 cases:
    // case 1: str[p1] === str[p2] => count++;
    let x = count;
    if (str1[p1] === str2[p2]) {
      x = dfs(str1, str2, p1 + 1, p2 + 1, count + 1);
    }
    // case 2: str[p1] !== str[p2]
    // // 2.1: skip p1
    const y = dfs(str1, str2, p1 + 1, p2, 0);
    // // 2.2: skip p2
    const z = dfs(str1, str2, p1, p2 + 1, 0);

    const result = Math.max(x, y, z);

    cache[key] = result;

    return result;
  }

  const output = dfs(str1, str2);

  console.log(`[LongestCommonSubstr] topDown runs ${runsCount} times.`);

  return output;
}

export { naive1, topDown, topDownWithCache };
