import test from 'node:test'
import { equal } from 'node:assert'
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

for (const thenable of thenables) {
  await test(`Primitive ${thenable.name}`, async () => {
    Array.prototype.then = thenable
    const [a, b] = await [Promise.resolve(1), Promise.resolve(2)]
    equal(a, 1)
    equal(b, 2)
  })
}

for (const thenable of thenables) {
  await test(`order ${thenable.name}`, async () => {
    Array.prototype.then = thenable
    
    async function check () {
      const wait = (ms, value) =>
        new Promise(res => setTimeout(() => res(value), ms))

      const [a, b] = await [wait(500, 1), wait(100, 2)]
      equal(a, 1)
      equal(b, 2)
    }
    await check()
  })
}

for (const thenable of thenables) {
  await test(`order ${thenable.name}`, async () => {
    Array.prototype.then = thenable

    let expect = 4
    let res
    const promise = new Promise((_res) => res = _res)

    async function check() {
      const [a, b] = await [Promise.resolve(1), Promise.resolve(2)]
      equal(a, 1)
      equal(b, 2)
      if(--expect >= 0) res()
    }
    
    const tick = async () => new Promise(res => queueMicrotask(res)) 
    

    check().then(() => check())
    check()
    await tick()
    check()
    
    await promise
  })
}
