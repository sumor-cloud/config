import YAML from 'yaml'
import fse from 'fs-extra'
import path from 'path'

export default async (root, name) => {
  root = path.normalize(root)
  if (!name) {
    // get last part of root
    root = root.replace(/\\/g, '/')
    const paths = root.split('/')
    name = paths.pop()
    root = paths.join('/')
  }
  let result
  try {
    const ymlPath = path.normalize(path.join(root, `${name}.yml`))
    if (await fse.exists(ymlPath)) {
      const data = await fse.readFile(ymlPath, 'utf-8')
      result = YAML.parse(data)
    }
    const yamlPath = path.normalize(path.join(root, `${name}.yaml`))
    if (!result && (await fse.exists(yamlPath))) {
      const data = await fse.readFile(yamlPath, 'utf-8')
      result = YAML.parse(data)
    }
    const jsonPath = path.normalize(path.join(root, `${name}.json`))
    if (!result && (await fse.exists(jsonPath))) {
      const data = await fse.readFile(jsonPath, 'utf-8')
      result = JSON.parse(data)
    }
  } catch (e) {
    const filePath = path.normalize(path.join(root, name))
    console.log(`Failed to parse configuration file ${filePath}.yml`)
  }
  return result
}
