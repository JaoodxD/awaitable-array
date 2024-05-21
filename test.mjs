import test from 'node:test'
import { equal } from 'node:assert'
import loadThenables from './loader.mjs'

const thenables = await loadThenables()

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
  await test(`complex ${thenable.name}`, async () => {
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
