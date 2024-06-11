# config

A [Sumor Cloud](https://sumor.cloud) Tool.  
[More Documentation](https://sumor.cloud/config)
Config Loader support .yml, .yaml, .json and .config.js files. It can load all files in a directory.

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
