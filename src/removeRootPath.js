import path from 'path'

export default (root, file) => {
  let result = path.normalize(file)
  result = file.replace(path.normalize(root), '')
  result = result.replace(/\\/g, '/')

  // remove leading slash
  if (result.startsWith('/')) {
    result = result.slice(1)
  }
  return result
}
