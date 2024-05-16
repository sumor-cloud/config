// find config files in the root directory
// config suffix can be *.yml, *.yaml, *.json
// config file has category name like *.entity.json, *.entity.yml, *.entity.yaml

import { glob } from 'glob'
import removeRootPath from './removeRootPath.js'

export default async (root, references) => {
  let result = []
  for (const reference of references) {
    const files = await glob(`**/*.${reference}`, { cwd: root })
    for (let file of files) {
      // remove root path
      file = removeRootPath(root, file)
      // remove file extension
      file = file.replace(/\.[^/.]+$/, '')
      result.push(file)
    }
  }

  result = result.sort()
  // remove duplicates
  result = result.filter((item, index) => result.indexOf(item) === index)

  return result
}
