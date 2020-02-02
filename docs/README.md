🕵️ Consono 🕵️‍♀️
===========

The most correct, informative, appealing and configurable variable inspector for Node.js

[![NPM Version](https://img.shields.io/npm/v/consono.svg?style=flat)]()
[![NPM Downloads](https://img.shields.io/npm/dt/consono.svg?style=flat)]()
[![Build Status](https://travis-ci.org/r37r0m0d3l/consono.svg?branch=master)](https://travis-ci.org/r37r0m0d3l/consono)
[![Issues](https://img.shields.io/github/issues-raw/r37r0m0d3l/consono.svg?maxAge=25000)](https://github.com/r37r0m0d3l/consono/issues)

[![Known Vulnerabilities](https://snyk.io/test/github/r37r0m0d3l/consono/badge.svg?targetFile=package.json)](https://snyk.io/test/github/r37r0m0d3l/consono?targetFile=package.json)
[![Dependency Status](https://david-dm.org/r37r0m0d3l/consono.svg)](https://david-dm.org/r37r0m0d3l/consono)
[![devDependencies Status](https://david-dm.org/r37r0m0d3l/consono/dev-status.svg)](https://david-dm.org/r37r0m0d3l/consono?type=dev)

[![Maintainability](https://api.codeclimate.com/v1/badges/272b5247f8b777c75360/maintainability)](https://codeclimate.com/github/r37r0m0d3l/consono/maintainability)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/840765276efe44319278e280e6985de0)](https://www.codacy.com/manual/r37r0m0d3l/consono?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=r37r0m0d3l/consono&amp;utm_campaign=Badge_Grade)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=r37r0m0d3l_consono&metric=alert_status)](https://sonarcloud.io/dashboard?id=r37r0m0d3l_consono)

[![GitHub stars](https://img.shields.io/github/stars/r37r0m0d3l/consono.svg?style=social&label=Star)](https://github.com/r37r0m0d3l/consono)
[![GitHub watchers](https://img.shields.io/github/watchers/r37r0m0d3l/consono.svg?style=social&label=Watch)](https://github.com/r37r0m0d3l/consono)
[![GitHub followers](https://img.shields.io/github/followers/r37r0m0d3l.svg?style=social&label=Follow)](https://github.com/r37r0m0d3l/consono)
[![GitHub forks](https://img.shields.io/github/forks/r37r0m0d3l/consono.svg?style=social&label=Fork)]()

---

_If you use this project don't forget to give a ⭐ [star](https://github.com/r37r0m0d3l/consono) ⭐ to it on GitHub!_

---

## 🔋 Motivation

Motivation and differences from other libraries.

-   **Light** and **dark** themes for terminal output ([prefers-color-scheme: Hello darkness, my old friend](https://web.dev/prefers-color-scheme/)).
-   **Configurable coloring** of variables.
-   Can print to terminal or **return formatted and colored** string for later use ([How to get result string of console.log in javascript code? You can't.](https://stackoverflow.com/questions/17904957/how-to-get-result-string-of-console-log-in-javascript-code)).
-   **Turn on/off** output colorization. It even works on Windows - use [Windows Terminal (Preview)](https://github.com/microsoft/terminal).
-   **Configurable indent** - tabs vs spaces.
-   Availability to set **depth** for *object* inspection.
-   Configurable **max items** for *array*, *map*, *object*, *set*.
-   **Limit string length** when printing for better readability.
-   Inspect both string **character count** and **string length** ([It’s Not Wrong that "🤦🏼‍♂️".length == 7](https://hsivonen.fi/string-length/)).
-   Inspect **positive zeroes** and **negative zeroes** ([JavaScript’s two zeros](https://2ality.com/2012/03/signedzero)).
-   Inspect **items count** for collection-like variables *array*, *map*, *object*, *set*.
-   Actually **can inspect** *arguments*, *set* and *map*.
-   Can print **function names** or mark them as **anonymous**.
-   Handles **circular references**.
-   Has **TypeScript** declaration file ([Writing Declaration Files for @types](https://devblogs.microsoft.com/typescript/writing-dts-files-for-types/)).
-   Avoids **dependency hell** ([Wikipedia article](https://en.wikipedia.org/wiki/Dependency_hell)).
-   Can **clear terminal** before output.
-   Can **exit** Node.js process after output.
-   Import as **ECMAScript module**.
-   And so on and so forth…

## 🧬 Examples

```js
consono(undefined);
consono(null);
```

![Nil](/img/light/001.png?raw=true "Nil")

```js
consono(true);
consono(false);
```

![Boolean](/img/light/002.png?raw=true "Boolean")

```js
consono(Infinity);
consono(Number.NEGATIVE_INFINITY);
consono(NaN);
consono(1);
consono(1.5);
consono(BigInt(9007199254740991));
```

![Number](/img/light/003.png?raw=true "Number")

```js
consono(new Date());
```

![Date](/img/light/004.png?raw=true "Date")

```js
consono("Hello, world 😀😁😂🤣😃😄😅😆😉😊", { stringMaxLength: 17 });
consono(Symbol("🌈"));
```

![String](/img/light/005.png?raw=true "String")

```js
consono(/[0-9]+/);
consono(/\w+/giu);
```

![RegExp](/img/light/006.png?raw=true "RegExp")

```js
consono(function() {});
consono(function helloWorld() {});
consono(() => {});
```

![Function](/img/light/007.png?raw=true "Function")

```js
consono(new Promise(() => {}));
consono(async function helloWorld() {});
consono(async () => {});
consono(function* gen() { yield 1; });
```

![Async](/img/light/008.png?raw=true "Async")

```js
consono([1, 2, 3]);
consono(Int8Array.from([1, 2, 3]));
```

![Array](/img/light/009.png?raw=true "Array")

```js
consono(new ArrayBuffer(8));
consono(new SharedArrayBuffer(16));
```

![Array Buffer](/img/light/010.png?raw=true "Array Buffer")

```js
consono(new Set(["a", true, { prop: 1 }]));
consono(new Map([["first", "a"], [true, "b"]]));
consono(new WeakMap());
consono(new WeakSet());
```

![Collection](/img/light/011.png?raw=true "Collection")

```js
consono({});

class MyClass {} const myClass = new MyClass(); myClass.deeper = new
MyClass(); consono(myClass);
```

![Object](/img/light/012.png?raw=true "Object")

```js
consono(new Error("Standard error"));
consono(new EvalError("Unable to run this code"));
consono(new RangeError("Must be less than 10 and greater than 0"));
consono(new ReferenceError("This is error from try/catch"));
consono(new SyntaxError("Not a source code"));
consono(new TypeError("Value is not of the expected type"));
```

![Error](/img/light/013.png?raw=true "Error")

```js
(function(a, b) { consono(arguments); })(true, false);
```

![Arguments](/img/light/014.png?raw=true "Arguments")

```js
consono(global || globalThis, { objectMaxProps: 3 });
```

![Global](/img/light/015.png?raw=true "Global")

## 📦 Installation

```bash
npm install consono
```

```bash
yarn add consono
```

## ⌨️ Include

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

## ⚙️ Options

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

## 🏷️ Instance

```js
const consono = Consono.factory(options, theme);
consono("This is log function with your own options");
```

## 🔖 Log function

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
  // Output to console
  console: true,
  // Default depth of object
  depth: 20,
  // 'false' - do nothing. 'true' - exit status ok.
  // Number greater than zero - exit status with passed error code.
  exit: false,
  // Call console.log immediately
  immediate: false,
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
  // Return inspected variable as string
  returns: true,
  // Maximum number of values in set to show
  setMaxValues: 99,
  // Maximum length of string to show
  stringMaxLength: 360,
};
consono("Some variable", defaultOptions);
```

## 🔮 Shortcuts

```js
consonoExit("Some value", null, null, 15); // Exit code - 15
consonoPlain("Some value"); // No colorization
consonoReturn("Some value"); // Return only, no `console.log`
```

## 👀 Discover more

-   🌠[OF](https://of.js.org)🌠 - Promise wrapper with some sugar.

-   🔩[Local Storage Fallback](https://github.com/r37r0m0d3l/fallback-local-storage)🔩 - Universal localStorage fallback.

-   🔄[Publish Subscribe](https://publish-subscribe.js.org)🔄 - JavaScript implementation of the Publish-Subscribe pattern.

-   🧰[Vicis](https://vicis.js.org)🧰 - Presentation and transformation layer for data output in RESTful APIs.

Or find useful these tools:

-   🧾[JSON Sorter](https://r37r0m0d3l.github.io/json_sort)🧾 - Neat online JSON sorter.
