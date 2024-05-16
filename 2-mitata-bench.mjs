import { run, bench, group, baseline } from 'mitata'
import { strictEqual } from 'node:assert'
import arrayLikeObject from './approaches/array-like-object.mjs'
import nullMutations from './approaches/null-mutations.mjs'
import nullMutationsNoDelete from './approaches/null-mutations-no-delete.mjs'
import oldArray from './approaches/old-array.mjs'
import nullMutationsNoAsyncAwait from './approaches/null-mutations-no-async-await.mjs'
import nullMutationsNoAwait from './approaches/null-mutations-no-await.mjs'
import nullNoAwait from './approaches/null-no-await.mjs'

const thenables = [
  arrayLikeObject,
  nullMutations,
  nullMutationsNoDelete,
  oldArray,
  nullMutationsNoAsyncAwait,
  nullMutationsNoAwait,
  nullNoAwait
]

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
