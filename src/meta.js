import { glob } from 'glob'
import removeRootPath from './removeRootPath.js'
import load from './load.js'
import fse from 'fs-extra'
const removeSuffix = name => name.replace(/\.[^/.]+$/, '')
const suffixGlob = async (root, suffix) => {
  suffix = suffix || []
  if (suffix.length > 0) {
    let condition = ''
    if (suffix.length === 1) {
      condition = `**/*.${suffix}`
    } else {
      condition = `**/*.{${suffix.join(',')}}`
    }
    return await glob(condition, { cwd: root })
  } else {
    return []
  }
}

export default async (root, suffixes) => {
  const files = await suffixGlob(root, ['yml', 'yaml', 'json'])
  const dataFiles = await suffixGlob(root, suffixes)

  const configs = {}

  for (const file of files) {
    const relative = removeRootPath(root, file)
    const path = removeSuffix(relative)
    const fullPath = root + '/' + file
    configs[path] = await load(removeSuffix(fullPath))
  }

  for (const file of dataFiles) {
    const relative = removeRootPath(root, file)
    const path = removeSuffix(relative)
    const fullPath = root + '/' + file
    if (!configs[path]) {
      configs[path] = {}
    }
    const suffix = file.split('.').pop()
    if (suffix === 'js') {
      configs[path][suffix] = fullPath
    } else {
      configs[path][suffix] = await fse.readFile(fullPath, 'utf-8')
    }
  }

  return configs
}
