Consono
===========

Better variable inspector for JavaScript.

[![Version](http://img.shields.io/npm/v/consono.svg)](https://www.npmjs.org/package/consono)
[![Build Status](https://travis-ci.org/r37r0m0d3l/consono.svg?branch=master)](https://travis-ci.org/r37r0m0d3l/consono)

## Installation

```bash
npm install consono
```
## Include

```js
const consono = require("consono").default;
```

or

```js
const { consono } = require("consono");
```

## Options

```js
const { Consono } = require("consono");
const options = {
  clear: true,
  quotesEnd: `”`,
  quotesStart: `“`,
  stringMaxLength: 54,
};
const consono = new Consono(options);
consono.log("Cleared before output. Different quotes. And cut to 54!");
// string • "Cleared before output. Different quotes. And cut to 54" (length=55, shown=54)
```

## Instance

```js
const consono = Consono.factory(options);
consono("This is log function with your own options");
```

### Log function

```js
const { consono } = require("consono");
const map = new Map();
map.add("key", true);
consono(map);
```

Return string with variable description.

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
  console: true, // Return string or output to console
  depth: 20, // Default depth of object
  exit: false, // Exit on completion
  indent: "ˑˑ", // Print indentation
  objectMaxProps: 99, // Maximum number of properties in object to show
  quotesEnd: `"`, // Quote start
  quotesStart: `"`, // Quote end
  stringMaxLength: 360, // Maximum length of string to show
};
consono("Some variable", defaultOptions);
```

All possible outputs - [try it.](https://npm.runkit.com/consono)

## Examples

![consono](docs/readme/001.png?raw=true "Undefined & NULL")

## I need help with:

* Writing documentation
* Theming console output
* Writing tests