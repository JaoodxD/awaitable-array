import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
export default async function loadThenables (dir = './approaches') {
  const files = await readdir(dir)
  const paths = files.map(file => join(dir, file))
  const thenables = await Promise.all(paths.map(file => import(pathToFileURL(file).href)))
  return thenables.map((thenable) => thenable.default)
}
