Consono
===========

**Better variable inspector for JavaScript.**

[![Version](http://img.shields.io/npm/v/consono.svg)](https://www.npmjs.org/package/consono)
[![Build Status](https://travis-ci.org/r37r0m0d3l/consono.svg?branch=master)](https://travis-ci.org/r37r0m0d3l/consono)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Consono on github.io 🡆](https://r37r0m0d3l.github.io/consono/)

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
const theme = "light";
const consono = new Consono(options, theme);
consono.log("Cleared before output. Different quotes. And cut to 54!");
// string • "Cleared before output. Different quotes. And cut to 54" (length=55, shown=54)
```

```js
const { Consono } = require("consono");
const theme = {
  argument: [253, 151, 31],
  boolean: [174, 129, 255],
  comment: [117, 113, 94],
  keyword: [249, 38, 114],
  name: [230, 219, 116],
  number: [174, 129, 255],
  plain: [255, 255, 255],
  property: [102, 217, 239],
  string: [166, 226, 46],
};
const consono = new Consono(null, theme);
consono.log("Themed");
```

```js
const { Consono, options } = require("consono");
options.colorize = false;
const consono = new Consono(options);
consono.log("Text without colorization");
```

```js
const { consono } = require("consono");
console.debug(consono("Outputs a message only at the debug log level.", false));
```

## Instance

```js
const consono = Consono.factory(options, theme);
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
  // Maximum number of elements in array to show
  arrayMaxElements: 99,
  // Assign symbol
  assignSymbol: "→",
  // Clear console before output
  clear: false,
  // Colorize the output
  colorize: true,
  // Return string or output to console
  console: true,
  // Default depth of object
  depth: 20,
  // Exit on completion
  exit: false,
  // Print indentation
  indent: "ˑˑ",
  // Maximum number of entries in map to show
  mapMaxEntries: 99,
  // Maximum number of properties in object to show
  objectMaxProps: 99,
  // Quote start
  quotesEnd: `"`,
  // Quote end
  quotesStart: `"`,
  // Maximum number of values in set to show
  setMaxValues: 99,
  // Maximum length of string to show
  stringMaxLength: 360,
};
consono("Some variable", defaultOptions);
```

All possible outputs - [try it.](https://npm.runkit.com/consono)

## Examples

```js
consono(undefined);
consono(null);
```

![consono](docs/readme/001.png?raw=true "Nil")

```js
consono(true);
consono(false);
```

![consono](docs/readme/002.png?raw=true "Boolean")


```js
consono(Infinity);
consono(Number.NEGATIVE_INFINITY);
consono(NaN);
consono(1);
consono(1.5);
consono(BigInt(9007199254740991));
```

![consono](docs/readme/003.png?raw=true "Number")

```js
consono(new Date());
```

![consono](docs/readme/004.png?raw=true "Date")

```js
consono("Hello, world 😀😁😂🤣😃😄😅😆😉😊", { stringMaxLength: 17 });
consono(Symbol("🌈"));
```

![consono](docs/readme/005.png?raw=true "String")

```js
consono(/[0-9]+/);
consono(/\w+/giu);
```

![consono](docs/readme/006.png?raw=true "RegExp")

```js
consono(function() {});
consono(function helloWorld() {});
consono(() => {});
```

![consono](docs/readme/007.png?raw=true "Function")

```js
consono(new Promise(() => {}));
consono(async function helloWorld() {});
consono(async () => {});
consono(function* gen() { yield 1; });
```

![consono](docs/readme/008.png?raw=true "Async")

```js
consono([1, 2, 3]);
consono(Int8Array.from([1, 2, 3]));
```

![consono](docs/readme/009.png?raw=true "Array")

```js
consono(new ArrayBuffer(8));
consono(new SharedArrayBuffer(16));
```

![consono](docs/readme/010.png?raw=true "Array Buffer")

```js
consono(new Set(["a", true, { prop: 1 }]));
consono(new Map([["first", "a"], [true, "b"]]));
consono(new WeakMap());
consono(new WeakSet());
```

![consono](docs/readme/011.png?raw=true "Collection")

```js
consono({});

class MyClass {}
const myClass = new MyClass();
myClass.deeper = new MyClass();
consono(myClass);
```

![consono](docs/readme/012.png?raw=true "Object")

```js
consono(new Error("Standard error"));
consono(new EvalError("Unable to run this code"));
consono(new RangeError("Must be less than 10 and greater than 0"));
consono(new ReferenceError("This is error from try/catch"));
consono(new SyntaxError("Not a source code"));
consono(new TypeError("Value is not of the expected type"));
```

![consono](docs/readme/013.png?raw=true "Error")

```js
(function(a, b) { consono(arguments); })(true, false);
```

![consono](docs/readme/014.png?raw=true "Arguments")


```js
consono(global || globalThis, { objectMaxProps: 3 });
```

![consono](docs/readme/015.png?raw=true "Global")

## I need help with:

* Writing documentation
* Theming console output
* Writing tests