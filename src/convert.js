import YAML from 'yaml'
import fse from 'fs-extra'
import load from './load.js'

export default async (root, name, type) => {
  const config = await load(root, name)

  if (config) {
    if (type === 'yaml' || type === 'yml') {
      const yamlConfig = YAML.stringify(config)
      const targetPath = `${root}/${name}.yml`
      if (!await fse.exists(targetPath)) {
        await fse.writeFile(targetPath, yamlConfig)
        await fse.remove(`${root}/${name}.yaml`)
        await fse.remove(`${root}/${name}.json`)
      }
    } else if (type === 'json') {
      const jsonConfig = JSON.stringify(config, null, 4)
      const targetPath = `${root}/${name}.json`
      if (!await fse.exists(targetPath)) {
        await fse.writeFile(targetPath, jsonConfig)
        await fse.remove(`${root}/${name}.yml`)
        await fse.remove(`${root}/${name}.yaml`)
      }
    }
  }
}
