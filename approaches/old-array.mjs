class OldArray extends Array {
  constructor () {
    super()
    super.then = null
  }
}

export default async function oldArray (resolve) {
  for (let i = 0; i < this.length; i++) this[i] = await this[i]
  resolve(OldArray.from(this))
}
