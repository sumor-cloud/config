// find config files in the root directory
// config suffix can be *.yml, *.yaml, *.json
// config file has category name like *.entity.json, *.entity.yml, *.entity.yaml

import { glob } from 'glob'
import removeRootPath from './removeRootPath.js'

export default async (root, category) => {
  const files = await glob(`${root}/**/*.${category}.{yml,yaml,json}`)

  const formatted = files.map(file => {
    // remove root path
    let result = removeRootPath(root, file)
    // remove file extension
    result = result.replace(/\.[^/.]+$/, '')
    return result
  })

  return formatted.sort()
}
