# config
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
please change the following code in your ```package.json``` file:
```json
{
    "type": "module"
}
```

## Usage

### methods

#### load
 * root: string - root directory
 * name: string - file name
 * ext: string - file extension to convert (yml, json)

#### find
    * root: string - root directory
    * category: string - category name
    * ext: string - file extension to convert (yml, json)

### Load config file

```javascript
import { load } from '@sumor/config';

const config1 = await load(process.cwd(), 'demo');
// it will load demo.yml or demo.json in root directory

const config2 = await load(process.cwd(), 'demo', 'yaml');
// it will load demo.yml or demo.json in root directory, and convert it to yaml format file

```

### Find config files

```javascript
import { find } from '@sumor/config';

const config = await find(process.cwd(), 'entity');
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