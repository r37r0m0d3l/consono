![Consono](docs/readme/logo.png?raw=true "Consono")

Consono
===========

The most **informative** and **correct** variable inspector for JavaScript on the web.

[Consono on github.io](https://r37r0m0d3l.github.io/consono/)

[![NPM Version](https://img.shields.io/npm/v/consono.svg?style=flat)]()
[![NPM Downloads](https://img.shields.io/npm/dt/consono.svg?style=flat)]()
[![Build Status](https://travis-ci.org/r37r0m0d3l/consono.svg?branch=master)](https://travis-ci.org/r37r0m0d3l/consono)
[![Issues](https://img.shields.io/github/issues-raw/r37r0m0d3l/consono.svg?maxAge=25000)](https://github.com/r37r0m0d3l/consono/issues)
[![Dependecy Status](https://david-dm.org/r37r0m0d3l/consono.svg)](https://david-dm.org/r37r0m0d3l/consono)
[![devDependencies Status](https://david-dm.org/r37r0m0d3l/consono/dev-status.svg)](https://david-dm.org/r37r0m0d3l/consono?type=dev)

[![GitHub stars](https://img.shields.io/github/stars/r37r0m0d3l/consono.svg?style=social&label=Star)](https://github.com/r37r0m0d3l/consono)
[![GitHub watchers](https://img.shields.io/github/watchers/r37r0m0d3l/consono.svg?style=social&label=Watch)](https://github.com/r37r0m0d3l/consono)
[![GitHub followers](https://img.shields.io/github/followers/r37r0m0d3l.svg?style=social&label=Follow)](https://github.com/r37r0m0d3l/consono)
[![GitHub forks](https://img.shields.io/github/forks/r37r0m0d3l/consono.svg?style=social&label=Fork)]()
[![Twitter](https://img.shields.io/twitter/follow/r37r0m0d3l.svg?style=social&label=Follow)](https://twitter.com/intent/follow?screen_name=r37r0m0d3l)

## Motivation and differences from other libraries

- **Light** and **dark** themes for terminal output ([prefers-color-scheme: Hello darkness, my old friend](https://web.dev/prefers-color-scheme/)).
- **Configurable coloring** of variables.
- Can print to terminal or **return formatted and colored** string for later use ([How to get result string of console.log in javascript code? You can't.](https://stackoverflow.com/questions/17904957/how-to-get-result-string-of-console-log-in-javascript-code)).
- **Turn on/off** output colorization. It even works on Windows - use [Windows Terminal (Preview)](https://github.com/microsoft/terminal).
- **Configurable indent** - tabs vs spaces.
- Availability to set **depth** for *object* inspection.
- Configurable **max items** for *array*, *map*, *object*, *set*.
- **Limit string length** when printing for better readability.
- Inspect both string **character count** and **string length** ([It’s Not Wrong that "🤦🏼‍♂️".length == 7](https://hsivonen.fi/string-length/)).
- Inspect **positive zeroes** and **negative zeroes** ([JavaScript’s two zeros](https://2ality.com/2012/03/signedzero)).
- Inspect **items count** for collection-like variables *array*, *map*, *object*, *set*.
- Actually **can inspect** *arguments*, *set* and *map*.
- Can print **function names** or mark them as **anonymous**.
- Handles **circular references**.
- Has **TypeScript** declaration file ([Writing Declaration Files for @types](https://devblogs.microsoft.com/typescript/writing-dts-files-for-types/)).
- Avoids **dependency hell** ([Wikipedia article](https://en.wikipedia.org/wiki/Dependency_hell)).
- Can **clear terminal** before output.
- Can **exit** Node.js process after output.
- Import as **ECMAScript module**.
- And so on and so forth…

## Installation

```bash
npm install consono
```

```bash
yarn add consono
```

## Include

Default is function for printing variable.

```js
const consono = require("consono").default;
```

Require multiple items: function, constructor, options object, theme objects.

```js
const {
  Consono,
  consono,
  options,
  THEME_DARK,
  THEME_LIGHT,
} = require("consono");
```

Import as ECMAScript module.

```js
import { consono } from "consono/es";
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
const theme = "light"; // default is "dark"
const consono = new Consono(options, theme);
consono.log("Cleared before output. Different quotes. And cut to 54!");
// string • "Cleared before output. Different quotes. And cut to 54"
// (length=55, shown=54)
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
console.debug(
  consono("Outputs a message only at the debug log level.", false)
);
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

## Examples

```js
consono(undefined);
consono(null);
```

![Nil](docs/readme/001.png?raw=true "Nil")

```js
consono(true);
consono(false);
```

![Boolean](docs/readme/002.png?raw=true "Boolean")


```js
consono(Infinity);
consono(Number.NEGATIVE_INFINITY);
consono(NaN);
consono(1);
consono(1.5);
consono(BigInt(9007199254740991));
```

![Number](docs/readme/003.png?raw=true "Number")

```js
consono(new Date());
```

![Date](docs/readme/004.png?raw=true "Date")

```js
consono("Hello, world 😀😁😂🤣😃😄😅😆😉😊", { stringMaxLength: 17 });
consono(Symbol("🌈"));
```

![String](docs/readme/005.png?raw=true "String")

```js
consono(/[0-9]+/);
consono(/\w+/giu);
```

![RegExp](docs/readme/006.png?raw=true "RegExp")

```js
consono(function() {});
consono(function helloWorld() {});
consono(() => {});
```

![Function](docs/readme/007.png?raw=true "Function")

```js
consono(new Promise(() => {}));
consono(async function helloWorld() {});
consono(async () => {});
consono(function* gen() { yield 1; });
```

![Async](docs/readme/008.png?raw=true "Async")

```js
consono([1, 2, 3]);
consono(Int8Array.from([1, 2, 3]));
```

![Array](docs/readme/009.png?raw=true "Array")

```js
consono(new ArrayBuffer(8));
consono(new SharedArrayBuffer(16));
```

![Array Buffer](docs/readme/010.png?raw=true "Array Buffer")

```js
consono(new Set(["a", true, { prop: 1 }]));
consono(new Map([["first", "a"], [true, "b"]]));
consono(new WeakMap());
consono(new WeakSet());
```

![Collection](docs/readme/011.png?raw=true "Collection")

```js
consono({});

class MyClass {} const myClass = new MyClass(); myClass.deeper = new
MyClass(); consono(myClass); ```

![Object](docs/readme/012.png?raw=true "Object")

```js
consono(new Error("Standard error"));
consono(new EvalError("Unable to run this code"));
consono(new RangeError("Must be less than 10 and greater than 0"));
consono(new ReferenceError("This is error from try/catch"));
consono(new SyntaxError("Not a source code"));
consono(new TypeError("Value is not of the expected type"));
```

![Error](docs/readme/013.png?raw=true "Error")

```js
(function(a, b) { consono(arguments); })(true, false);
```

![Arguments](docs/readme/014.png?raw=true "Arguments")


```js
consono(global || globalThis, { objectMaxProps: 3 });
```

![Global](docs/readme/015.png?raw=true "Global")
