export default async function arrayLikeObject (resolve) {
  const result = {
    length: 0,
    * [Symbol.iterator] () {
      for (let i = 0; i < this.length; i++) yield this[i]
    }
  }
  for (let i = 0; i < this.length; i++) {
    result[i] = await this[i]
    result.length++
  }
  resolve(result)
}
