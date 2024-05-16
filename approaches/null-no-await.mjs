export default function nullNoAwait (resolve) {
  const arr = new Array(this.length)
  arr.then = null
  let counter = this.length
  for (let i = 0; i < this.length; i++) {
    this[i].then(value => {
      arr[i] = value
      if (--counter === 0) resolve(arr)
    })
  }
}
