# config

A [Sumor Cloud](https://sumor.cloud) Tool.  
[More Documentation](https://sumor.cloud/config)
Config Loader support yaml and json files. It can load all files in a directory.
And automatically convert the file to the specified format.

[![CI](https://github.com/sumor-cloud/config/actions/workflows/ci.yml/badge.svg)](https://github.com/sumor-cloud/config/actions/workflows/ci.yml)
[![Test](https://github.com/sumor-cloud/config/actions/workflows/ut.yml/badge.svg)](https://github.com/sumor-cloud/config/actions/workflows/ut.yml)
[![Coverage](https://github.com/sumor-cloud/config/actions/workflows/coverage.yml/badge.svg)](https://github.com/sumor-cloud/config/actions/workflows/coverage.yml)
[![Audit](https://github.com/sumor-cloud/config/actions/workflows/audit.yml/badge.svg)](https://github.com/sumor-cloud/config/actions/workflows/audit.yml)

## Installation

```bash
npm i @sumor/config --save
```

## Prerequisites

### Node.JS version

Require Node.JS version 16.x or above

### require Node.JS ES module

As this package is written in ES module,
please change the following code in your `package.json` file:

```json
{
  "type": "module"
}
```

## Usage

### entry methods

#### load

```js
import { load } from '@sumor/config'
```

- root: string - root directory
- name: string - file name
- ext: string - file extension to convert (yml, json)

#### meta

load all files in the directory

- root: string - root directory
- suffix: string - object suffix which will be load into config (js will only load path)

```js
import { meta } from '@sumor/config'

const config = await meta(process.cwd(), ['js', 'sql'])

/*
Demo directory structure
- root
  - car.json
  - car.sql
  - ship.js
  - plane.yml
  - truck.config.js
*/

// it will load all config files as below
/*
{
  car: {
    name: 'car',
    sql: "..."
  },
  ship: {
    name: 'ship'
    js: '<root>/ship.js'
  },
  plane: {
    name: 'plane'
  },
  truck: {
    name: 'truck'
  }
*/
```

## Legacy methods

#### find

```js
import { find } from '@sumor/config'
```

- root: string - root directory
- category: string - category name
- ext: string - file extension to convert (yml, json)

#### findReference

```js
import { findReference } from '@sumor/config'
```

- root: string - root directory
- references: array - reference file extension (vue, js)
- ext: string - file extension to convert (yml, json)

### Load config file

```javascript
import { load } from '@sumor/config'

const config1 = await load(process.cwd(), 'demo')
// it will load demo.yml or demo.json in root directory

const config2 = await load(process.cwd(), 'demo', 'yaml')
// it will load demo.yml or demo.json in root directory, and convert it to yaml format file
```

### Find config files

```javascript
import { find } from '@sumor/config'

const config = await find(process.cwd(), 'entity')
// it will load all *.entity.yml or *.entity.json in root directory
/*
 * example:
 *   car.entity.yml, bike.entity.json
 *   {
 *       "car": {...}
 *       "bike": {...}
 *   }
 * */
```

### Find config files from other files

such as .vue, .js files, it has same name config file

```javascript
import { findReference } from '@sumor/config'

const config = await findReference(process.cwd(), ['vue', 'js'])
// it will load all *.entity.yml or *.entity.json which has same name with *.vue or *.js in root directory
/*
 * example:
 *   car.entity.yml, bike.entity.json
 *   car.vue, bike.js
 *   {
 *       "car": {...}
 *       "bike": {...}
 *   }
 * */
```
