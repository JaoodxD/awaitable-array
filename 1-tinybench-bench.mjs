import { Bench } from 'tinybench'
import loadThenables from './loader.mjs'

const bench = new Bench()

const thenables = await loadThenables()

bench.add('Promise.all', async () => {
  const [a, b] = await Promise.all([Promise.resolve(1), Promise.resolve(2)])
})

for (const thenable of thenables) {
  bench.add(thenable.name, async () => {
    Array.prototype.then = thenable
    const [a, b] = await [Promise.resolve(1), Promise.resolve(2)]
  })
}

await bench.warmup()
await bench.run()
console.table(bench.table())
