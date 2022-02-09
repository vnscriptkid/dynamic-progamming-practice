// f(0) === 0
// f(1) === 1

//                  f(6)
//         f(4)                      f(5)
//      f(2)  f(3)             f(3)       f(4)
//    f(0)  f(1)  f(1) f(2)  f(1) f(2) f(2)  f(3)
//                   f(0)  f(1)  f(0) f(1) f(0)  f(1)  f(1) f(2)

function fibNaive(x: number): number {
  if (x === 0 || x === 1) return x;

  return fibNaive(x - 1) + fibNaive(x - 2);
}

function topDown(x: number, doCount = false): number {
  const cache: Record<number, number> = { 0: 0, 1: 1 };
  let count = 0;

  function _topDown(x: number): number {
    count++;
    if (x in cache) return cache[x];

    const result = _topDown(x - 1) + _topDown(x - 2);

    cache[x] = result;

    return result;
  }

  const final = _topDown(x);

  if (doCount) console.log(`=>> topDown runs ${count} times`);

  return final;
}

export { fibNaive, topDown };
