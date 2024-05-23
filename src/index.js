import load from './load.js'
import convert from './convert.js'
import findCategory from './findCategory.js'
import findReference from './findReference.js'
import fse from 'fs-extra'

const splitFolderAndFileName = path => {
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
  const files = await findCategory(root, category)
  const configs = {}
  for (const file of files) {
    const name = file.replace(new RegExp(`.${category}$`), '')
    configs[name] = await loadWithConvert(root, file, ext)
  }
  return configs
}

const findReferenceWithConvert = async (root, references, ext) => {
  const files = await findReference(root, references)
  const configs = {}
  for (const file of files) {
    configs[file] = await loadWithConvert(root, file, ext)
  }
  return configs
}

const findReferenceDataWithConvert = async (root, references, ext) => {
  const files = await findReference(root, references)
  const configs = {}
  for (const file of files) {
    configs[file] = (await loadWithConvert(root, file, ext)) || {}
    for (const suffix of references) {
      const path = `${root}/${file}.${suffix}`
      if (await fse.exists(path)) {
        configs[file][suffix] = await fse.readFile(path, 'utf-8')
      }
    }
  }
  return configs
}

export {
  loadWithConvert as load,
  findWithConvert as find,
  findReferenceWithConvert as findReference,
  findReferenceDataWithConvert as findReferenceData
}

export default {
  load: loadWithConvert,
  find: findWithConvert,
  findReference: findReferenceWithConvert,
  findReferenceData: findReferenceDataWithConvert
}
