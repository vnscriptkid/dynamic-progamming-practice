// Problem Statement #
// Given a rod of length ‘n’, we are asked to cut the rod and sell the pieces in a way that will maximize the profit. We are also given the price of every piece of length ‘i’ where ‘1 <= i <= n’.

// Example:

// Lengths: [1, 2, 3, 4, 5]
// Prices: [2, 6, 7, 10, 13]
// Rod Length: 5

// Let’s try different combinations of cutting the rod:

// Five pieces of length 1 => 10 price
// Two pieces of length 2 and one piece of length 1 => 14 price
// One piece of length 3 and two pieces of length 1 => 11 price
// One piece of length 3 and one piece of length 2 => 13 price
// One piece of length 4 and one piece of length 1 => 12 price
// One piece of length 5 => 13 price

// This shows that we get the maximum price (14) by cutting the rod into two pieces of length ‘2’ and one piece of length ‘1’.

export function bottomUp(
  lengths: number[],
  prices: number[],
  originalLength: number
) {}
export function findItems(
  lengths: number[],
  prices: number[],
  originalLength: number
) {}
export function naive(
  lengths: number[],
  prices: number[],
  originalLength: number
) {}
export function topDownCache(
  lengths: number[],
  prices: number[],
  originalLength: number
) {}
