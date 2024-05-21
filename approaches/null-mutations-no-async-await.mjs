export default function nullMutationsNoAsyncAwait (resolve) {
  this.then = null
  let prev = Promise.resolve()
  for (let i = 0; i < this.length; i++) {
    prev = prev
      .then(() => this[i])
      .then(value => {
        this[i] = value
      })
  }
  prev.then(() => resolve(this))
}
