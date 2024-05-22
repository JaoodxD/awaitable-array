import { Bench } from 'tinybench'
import { strictEqual } from 'node:assert'
import loadThenables from './loader.mjs'

const LONG_ARRAY_SIZE = 100_000

const bench = new Bench()

const thenables = await loadThenables()

bench.add('Promise.all (short)', async () => {
  const [a, b] = await Promise.all([Promise.resolve(1), Promise.resolve(2)])
  strictEqual(a, 1)
  strictEqual(b, 2)
})
bench.add('Promise.all (long)', async () => {
  const promises = []
  for (let i = 1; i <= LONG_ARRAY_SIZE; i++) {
    promises.push(Promise.resolve(i))
  }
  const [a, b] = await Promise.all(promises)
  strictEqual(a, 1)
  strictEqual(b, 2)
})

for (const thenable of thenables) {
  bench.add(thenable.name + ' (short)', async () => {
    // eslint-disable-next-line
    Array.prototype.then = thenable;
    const [a, b] = await [Promise.resolve(1), Promise.resolve(2)]
    strictEqual(a, 1)
    strictEqual(b, 2)
  })

  bench.add(thenable.name + ' (long)', async () => {
    // eslint-disable-next-line
    Array.prototype.then = thenable;
    const array = []
    for (let i = 1; i <= LONG_ARRAY_SIZE; i++) {
      array.push(Promise.resolve(i))
    }

    const [a, b] = await array
    strictEqual(a, 1)
    strictEqual(b, 2)
  })
}

await bench.warmup()
await bench.run()
console.table(bench.table())
