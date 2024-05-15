import { run, bench, group } from 'mitata'
import arrayLikeObject from './approaches/array-like-object.mjs'
import nullMutations from './approaches/null-mutations.mjs'
import nullMutationsNoDelete from './approaches/null-mutations-no-delete.mjs'
import oldArray from './approaches/old-array.mjs'

const thenables = [
  arrayLikeObject,
  nullMutations,
  nullMutationsNoDelete,
  oldArray
]

group('all together', () => {
  for (const thenable of thenables) {
    bench(thenable.name, async () => {
      Array.prototype.then = thenable

      const [a, b] = await [Promise.resolve(1), Promise.resolve(2)]
    })
  }
})

await run()
