Consono
===========

Dumps information about a variable.

[![Version](http://img.shields.io/npm/v/fallback-local-storage.svg)](https://www.npmjs.org/package/consono)
[![Build Status](https://travis-ci.org/r37r0m0d3l/fallback-local-storage.svg?branch=master)](https://travis-ci.org/r37r0m0d3l/consono)

## Installation

```bash
npm install consono
```
## Usage

```js
const consono = require("consono").default;
```

### `consono()`

```js
const consono = require("consono").default;
const map = new Map();
map.add("key", true);
consono(map);
```

Return string with variable.

```js
const variableAsString = consono({}, false);
```

or

```js
const variableAsString = consono({},  { console: false });
```

```js
const defaultOptions = {
  arrayMaxElements: 99, // Maximum number of elements in array to show
  assignSymbol: "→", // Assign symbol
  clear: false, // Clear console before output
  depth: 20, // Default depth of object
  exit: false, // Exit on completion
  indent: "ˑˑ", // Print indentation
  indentPad: 1, // Starting indentation
  objectMaxProps: 99, // Maximum number of properties in object to show
  quotesEnd: `"`, // Quote start
  quotesStart: `"`, // Quote end
  stringMaxLength: 360, // Maximum length of string to show
};
consono("Some variable", defaultOptions);
```

All possible outputs. [Try it.](https://runkit.com/r37r0m0d3l/5dc06212b88520001aa0ddaa)

## I need help with:

* Writing documentation
* Theming console output
* Writing tests