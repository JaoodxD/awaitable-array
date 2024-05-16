import { run, bench, group,baseline } from 'mitata'
import arrayLikeObject from './approaches/array-like-object.mjs'
import nullMutations from './approaches/null-mutations.mjs'
import nullMutationsNoDelete from './approaches/null-mutations-no-delete.mjs'
import oldArray from './approaches/old-array.mjs'
import nullMutationsNoAsyncAwait from './approaches/null-mutations-no-async-await.mjs'
import nullMutationsNoAwait from './approaches/null-mutations-no-await.mjs'

const thenables = [
  arrayLikeObject,
  nullMutations,
  nullMutationsNoDelete,
  oldArray,
  nullMutationsNoAsyncAwait,
  nullMutationsNoAwait
]

group('all together', () => {
  baseline('Promise.all', async () => {
    const [a, b] = await Promise.all([Promise.resolve(1), Promise.resolve(2)])
  })
  for (const thenable of thenables) {
    bench(thenable.name, async () => {
      Array.prototype.then = thenable

      const [a, b] = await [Promise.resolve(1), Promise.resolve(2)]
    })
  }
})

await run()
