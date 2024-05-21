import { run, bench, group, baseline } from 'mitata'
import { strictEqual } from 'node:assert'
import loadThenables from './loader.mjs'

const thenables = await loadThenables()

group('all together', () => {
  baseline('Promise.all', async () => {
    const [a, b] = await Promise.all([Promise.resolve(1), Promise.resolve(2)])
    strictEqual(a, 1)
    strictEqual(b, 2)
  })
  for (const thenable of thenables) {
    bench(thenable.name, async () => {
      Array.prototype.then = thenable

      const [a, b] = await [Promise.resolve(1), Promise.resolve(2)]
      strictEqual(a, 1)
      strictEqual(b, 2)
    })
  }
})

await run()
