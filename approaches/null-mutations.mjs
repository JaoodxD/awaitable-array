export default async function nullMutations (resolve) {
  this.then = null
  for (let i = 0; i < this.length; i++) this[i] = await this[i]
  resolve(this)
  delete this.then
}
