import load from './load.js'
import convert from './convert.js'
import find from './find.js'

const splitFolderAndFileName = (path) => {
  // consider the case of windows path
  const paths = path.replace(/\\/g, '/').split('/')
  const fileName = paths.pop()
  const folder = paths.join('/')
  return { folder, fileName }
}

const loadWithConvert = async (root, name, ext) => {
  if (!name) {
    const { folder, fileName } = splitFolderAndFileName(root)
    name = fileName
    root = folder
  }
  const config = await load(root, name)
  await convert(root, name, ext)
  return config
}

const findWithConvert = async (root, category, ext) => {
  const files = await find(root, category)
  const configs = {}
  for (const file of files) {
    const name = file.replace(new RegExp(`.${category}$`), '')
    configs[name] = await loadWithConvert(root, file, ext)
  }
  return configs
}

export {
  loadWithConvert as load,
  findWithConvert as find
}

export default {
  load: loadWithConvert,
  find: findWithConvert
}
