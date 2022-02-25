function naive(
  lengths: number[],
  prices: number[],
  total: number,
  curIdx = 0,
  curPrice = 0
): number {
  if (curIdx === prices.length || total <= 0) {
    return curPrice;
  }

  // choices
  // take cur length
  let p1 = curPrice;
  if (total >= lengths[curIdx]) {
    p1 = naive(
      lengths,
      prices,
      total - lengths[curIdx],
      curIdx,
      curPrice + prices[curIdx]
    );
  }

  // skip cur length
  const p2 = naive(lengths, prices, total, curIdx + 1, curPrice);

  return Math.max(p1, p2);
}

function topDownCache(
  lengths: number[],
  prices: number[],
  total: number,
  curIdx = 0,
  curPrice = 0,
  cache: Record<string, number> = {}
): number {
  const cacheKey = String([total, curIdx, curPrice]);

  if (!(cacheKey in cache)) {
    if (curIdx === prices.length || total <= 0) {
      return curPrice;
    }

    // choices
    // take cur length
    let p1 = curPrice;
    if (total >= lengths[curIdx]) {
      p1 = naive(
        lengths,
        prices,
        total - lengths[curIdx],
        curIdx,
        curPrice + prices[curIdx]
      );
    }

    // skip cur length
    const p2 = naive(lengths, prices, total, curIdx + 1, curPrice);

    cache[cacheKey] = Math.max(p1, p2);
  }

  return cache[cacheKey];
}

export { naive, topDownCache };
