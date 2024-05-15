export default async function nullMutationsNoDelete (resolve) {
  this.then = null
  for (let i = 0; i < this.length; i++) this[i] = await this[i]
  resolve(this)
}
