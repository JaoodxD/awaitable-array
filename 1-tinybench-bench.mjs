import { Bench } from 'tinybench'
import arrayLikeObject from './approaches/array-like-object.mjs'
import nullMutations from './approaches/null-mutations.mjs'
import nullMutationsNoDelete from './approaches/null-mutations-no-delete.mjs'
import oldArray from './approaches/old-array.mjs'

const bench = new Bench()

const thenables = [
  arrayLikeObject,
  nullMutations,
  nullMutationsNoDelete,
  oldArray
]

for (const thenable of thenables) {
  bench.add(thenable.name, async () => {
    Array.prototype.then = thenable
    const [a, b] = await [Promise.resolve(1), Promise.resolve(2)]
  })
}

await bench.warmup()
await bench.run()
console.table(bench.table())
