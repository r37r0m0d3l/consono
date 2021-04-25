# 🕵️ Consono 🕵️‍♀️

The most correct, informative, appealing, and configurable variable inspector for JavaScript.

[![npm](https://badgen.net/npm/v/consono?&icon=npm&label=npm&color=DD3636)](https://www.npmjs.com/package/consono)
[![downloads](https://badgen.net/npm/dt/consono?&icon=terminal&label=downloads&color=009688)](https://github.com/r37r0m0d3l/consono)
[![stars](https://badgen.net/github/stars/r37r0m0d3l/consono?&icon=github&label=stars&color=ffcc33)](https://github.com/r37r0m0d3l/consono)
[![types](https://badgen.net/npm/types/consono?&icon=typescript&label=types&color=1E90FF)](https://github.com/r37r0m0d3l/consono)
[![build](https://badgen.net/travis/r37r0m0d3l/consono?&icon=travis&label=build)](https://github.com/r37r0m0d3l/consono)
[![lgtm](https://badgen.net/lgtm/grade/g/r37r0m0d3l/consono?&icon=lgtm&label=lgtm:js/ts&color=00C853&v=1.4.0)](https://github.com/r37r0m0d3l/consono)

---

## 🔋 Motivation

Motivation and differences from other libraries.

-   ☀️ **Light** and 🌑 **dark** themes for terminal output.
  -   [prefers-color-scheme: Hello darkness, my old friend](https://web.dev/prefers-color-scheme/)
-   🎚️ **Configurable coloring** of variables.
-   Can print to terminal or 🌈 **return formatted and colored** string for later use.
  -   [How to get result string of console.log in javascript code? You can't.](https://stackoverflow.com/questions/17904957/how-to-get-result-string-of-console-log-in-javascript-code)
-   🔀 **Turn on/off** output colorization.
  -   It even works on Windows - use [Windows Terminal](https://github.com/microsoft/terminal).
-   **Configurable indent** - tabs 🆚 spaces holy war 👼🏻 ⚔️ 🇻🇦.
-   Availability to set the 🕳️ **depth** for *object* inspection.
-   Configurable #️⃣ **max items** for *array*, *map*, *object*, *set*.
-   ✂️**Limit string length** when printing for better readability.
-   Inspect both string 📐 **character count** and 📏 **string length**.
  -   [It’s Not Wrong that "🤦🏼‍♂️".length == 7](https://hsivonen.fi/string-length/).
-   Inspect ➕0️ **positive zeroes** and ➖0️ **negative zeroes**.
  -   [JavaScript’s two zeros](https://2ality.com/2012/03/signedzero).
-   Inspect 🔍 **items count** for collection-like variables *array*, *map*, *object*, *set*.
-   Actually 🔬 **can inspect** *arguments*, *set* and *map*.
-   Can print 📛 **function names** or mark them as **anonymous**.
-   Handles 🔄 **circular references**.
-   Has 📘 **TypeScript** declaration file.
  -   [Writing Declaration Files for @types](https://devblogs.microsoft.com/typescript/writing-dts-files-for-types/).
-   Avoids 🔱😈🔥 **dependency hell**.
  -   [Wikipedia article](https://en.wikipedia.org/wiki/Dependency_hell).
-   Can 🧹 **clear terminal** before output.
-   Can 💥 **exit** Node.js process after output.
-   Import as 🆕 **ECMAScript module**.
-   And so on and so forth ♾️.

## 🧬 Examples

<table><thead><tr><td width="33%">

```javascript
consono(undefined);
consono(null);
```

</td><td width="67%">

![Nil](/img/light/001.png?raw=true "Nil")

</td></tr></thead><tbody></table>

---

<table><thead><tr><td width="33%">

```javascript
consono(true);
consono(false);
```

</td><td width="67%">

![Boolean](/img/light/002.png?raw=true "Boolean")

</td></tr></thead><tbody></table>

---

<table><thead><tr><td width="33%">

```javascript
consono(Infinity);
consono(Number.NEGATIVE_INFINITY);
consono(NaN);
consono(1);
consono(1.5);
consono(BigInt(9007199254740991));
```

</td><td width="67%">

![Number](/img/light/003.png?raw=true "Number")

</td></tr></thead><tbody></table>

---

<table><thead><tr><td width="100%">

```javascript
consono(new Date());
```

</td></tr><tr><td width="100%">

![Date](/img/light/004.png?raw=true "Date")

</td></tr></thead><tbody></table>

---

<table><thead><tr><td width="100%">

```javascript
consono("Hello, world 😀😁😂🤣😃😄😅😆😉😊", { stringMaxLength: 17 });
consono(Symbol("🌈"));
```

</td></tr><tr><td width="100%">

![String](/img/light/005.png?raw=true "String")

</td></tr></thead><tbody></table>

---

<table><thead><tr><td width="33%">

```javascript
consono(/[0-9]+/);
consono(/\w+/giu);
```

</td><td width="67%">

![RegExp](/img/light/006.png?raw=true "RegExp")

</td></tr></thead><tbody></table>

---

<table><thead><tr><td width="33%">

```javascript
consono(function() {});
consono(function helloWorld() {});
consono(() => {});
```

</td><td width="67%">

![Function](/img/light/007.png?raw=true "Function")

</td></tr></thead><tbody></table>

---

<table><thead><tr><td width="33%">

```javascript
consono(new Promise(() => {}));
consono(async function helloWorld() {});
consono(async () => {});
consono(function* gen() { yield 1; });
```

</td><td width="67%">

![Async](/img/light/008.png?raw=true "Async")

</td></tr></thead><tbody></table>

---

<table><thead><tr><td width="33%">

```javascript
consono([1, 2, 3]);
consono(Int8Array.from([1, 2, 3]));
```

</td><td width="67%">

![Array](/img/light/009.png?raw=true "Array")

</td></tr></thead><tbody></table>

---

<table><thead><tr><td width="33%">

```javascript
consono(new ArrayBuffer(8));
consono(new SharedArrayBuffer(16));
```

</td><td width="67%">

![Array Buffer](/img/light/010.png?raw=true "Array Buffer")

</td></tr></thead><tbody></table>

---

<table><thead><tr><td width="33%">

```javascript
consono(new Set(["a", true, { prop: 1 }]));
consono(new WeakSet());
```

</td><td width="67%">

![Set](/img/light/set.png?raw=true "Set")

</td></tr></thead><tbody></table>

---

<table><thead><tr><td width="33%">

```javascript
consono(new Map([["first", "a"], [true, "b"]]));
consono(new WeakMap());
```

</td><td width="67%">

![Map](/img/light/map.png?raw=true "Map")

</td></tr></thead><tbody></table>

---

<table><thead><tr><td width="33%">

```javascript
consono({});

class MyClass {} const myClass = new MyClass(); myClass.deeper = new
MyClass(); consono(myClass);
```

</td><td width="67%">

![Object](/img/light/012.png?raw=true "Object")

</td></tr></thead><tbody></table>

---

<table><thead><tr><td width="33%">

```javascript
consono(new Error("Standard error"));
consono(new EvalError("Unable to run this code"));
consono(new RangeError("Must be less than 10 and greater than 0"));
consono(new ReferenceError("This is error from try/catch"));
consono(new SyntaxError("Not a source code"));
consono(new TypeError("Value is not of the expected type"));
```

</td><td width="67%">

![Error](/img/light/013.png?raw=true "Error")

</td></tr></thead><tbody></table>

---

<table><thead><tr><td width="33%">

```javascript
(function(a, b) { consono(arguments); })(true, false);
```

</td><td width="67%">

![Arguments](/img/light/014.png?raw=true "Arguments")

</td></tr></thead><tbody></table>

---

<table><thead><tr><td width="100%">

```javascript
consono(global || globalThis, { objectMaxProps: 3 });
```

</td></tr><tr><td width="100%">

![Global](/img/light/015.png?raw=true "Global")

</td></tr></thead><tbody></table>

---

## 📦 Installation

```bash
npm -s install consono
```

## ⌨️ Include

The default is a function for printing variable.

```javascript
import { consono } from "consono";
```

Import multiple items: function, constructor, options object, theme objects.

```javascript
import {
  Consono,
  consono,
  options,
  THEME_DARK,
  THEME_LIGHT,
} from "consono";
```

UNPKG CDN.

> Note that the web browser version has no theme support, limited color palette, and only support chromium based browsers.

```html
<script src="https://unpkg.com/consono/dist/consono.js"></script>
```

## ⚙️ Options

```javascript
import { Consono } from "consono";
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

```javascript
import { Consono } from "consono";
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

```javascript
import { Consono, options } from "consono";
options.colorize = false;
const consono = new Consono(options);
consono.log("Text without colorization");
```

```javascript
import { consono } from "consono";
console.debug(
  consono("Outputs a message only at the debug log level.", false)
);
```

## 🏷️ Instance

```javascript
const consono = Consono.factory(options, theme);
consono("This is log function with your own options");
```

## 🔖 Log function

```javascript
import { consono } from "consono";
const map = new Map();
map.add("key", true);
consono(map);
```

Return string with variable description.

```javascript
const variableAsString = consono({}, false);
```

or

```javascript
const variableAsString = consono({},  { console: false });
```

```javascript
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
  // Call `process.stdout.write` instead of `console.log`.
  stdout: false,
  // Maximum length of string to show
  stringMaxLength: 360,
};
consono("Some variable", defaultOptions);
```

## 🔮 Shortcuts

```javascript
// Exit code - 15
consonoExit("Some value", null, null, 15);
// No colorization, no description, only printing with `console.dir`
consonoJSON("Some value");
// No colorization, no description, only printing with `process.stdout.write`
consonoOut("Some value");
// No colorization
consonoPlain("Some value");
// Return only, no `console.log`
consonoReturn("Some value");
```

## 👀 Discover more

[My other projects](https://r37r0m0d3l.icu/open_source_map)

<img src="https://raw.githubusercontent.com/r37r0m0d3l/r37r0m0d3l/master/osmap.svg?sanitize=true" width="960" height="520" style="display:block;height:auto;margin-left:auto;margin-right:auto;min-height:520px;min-width:960px;width:100%;">
