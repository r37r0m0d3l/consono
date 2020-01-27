import chalk from "chalk";

const TAG_ARGUMENTS = "[object Arguments]";
const TAG_ARRAY = "[object Array]";
const TAG_ARRAY_BUFFER = "[object ArrayBuffer]";
const TAG_ASYNC_FUNCTION = "[object AsyncFunction]";
const TAG_BIGINT = "[object BigInt]";
const TAG_BOOL = "[object Boolean]";
const TAG_DATE = "[object Date]";
const TAG_ERROR = "[object Error]";
const TAG_FUNCTION = "[object Function]";
const TAG_GENERATOR = "[object Generator]";
const TAG_GENERATOR_FUNCTION = "[object GeneratorFunction]";
const TAG_GLOBAL = "[object global]";
const TAG_MAP = "[object Map]";
const TAG_NULL = "[object Null]";
const TAG_NUMBER = "[object Number]";
const TAG_OBJECT = "[object Object]";
const TAG_PROMISE = "[object Promise]";
const TAG_REGEXP = "[object RegExp]";
const TAG_SET = "[object Set]";
const TAG_SHARED_ARRAY_BUFFER = "[object SharedArrayBuffer]";
const TAG_STRING = "[object String]";
const TAG_SYMBOL = "[object Symbol]";
const TAG_VOID = "[object Undefined]";
const TAG_WEAK_MAP = "[object WeakMap]";
const TAG_WEAK_SET = "[object WeakSet]";
const TAG_WINDOW = "[object Window]";

const OPTIONS_DEFAULT = {
  arrayMaxElements: 99,
  assignSymbol: "→",
  clear: false,
  colorize: true,
  console: true,
  depth: 20,
  exit: false,
  immediate: false,
  indent: "ˑˑ",
  indentPad: 1,
  mapMaxEntries: 99,
  objectMaxProps: 99,
  quotesEnd: `"`,
  quotesStart: `"`,
  returns: true,
  setMaxValues: 99,
  stringMaxLength: 360,
};

const OPTIONS_KEYS = [
  "arrayMaxElements",
  "assignSymbol",
  "clear",
  "colorize",
  "console",
  "depth",
  "exit",
  "indent",
  "mapMaxEntries",
  "objectMaxProps",
  "quotesEnd",
  "quotesStart",
  "returns",
  "setMaxValues",
  "stringMaxLength",
];

const THEME_DARK = {
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

const THEME_LIGHT = {
  argument: [245, 135, 31],
  boolean: [66, 113, 174],
  comment: [117, 113, 94],
  keyword: [200, 40, 41],
  name: [201, 159, 0],
  number: [101, 67, 133],
  plain: [0, 0, 0],
  property: [32, 123, 129],
  string: [113, 140, 0],
};

function cliExit() {
  if ("clear" in console) {
    try {
      console.clear();
    } catch (err) {
      //
    }
  } else {
    try {
      process.stdout.write("\u001b[2J\u001b[0;0H");
    } catch (err) {
      //
    }
  }
}

function processExit(code = 0) {
  if (code === false) {
    return;
  }
  if (code === true) {
    code = 0;
  }
  const exitCode = Number.parseInt(code.toString());
  if (!Number.isInteger(exitCode)) {
    return;
  }
  if (exitCode < 0) {
    return;
  }
  try {
    process.exit(exitCode);
  } catch (error) {
    //
  }
}

function isInteger(value) {
  return Number.isInteger(Number.parseInt(value));
}

function prototypeName(value) {
  return Object.prototype.toString.call(value);
}

function stringClearReference(text) {
  return text.length < 12 ? text : (" " + text).slice(1);
}

function objectDeCycle(object) {
  const objects = [];
  const paths = [];
  return (function deReCycle(value, path) {
    let index;
    let name;
    let newIterable;
    if (
      typeof value === "object" &&
      value !== null &&
      !(value instanceof Boolean) &&
      !(value instanceof Date) &&
      !(value instanceof Number) &&
      !(value instanceof RegExp) &&
      !(value instanceof String)
    ) {
      for (index = 0; index < objects.length; index += 1) {
        if (objects[index] === value) {
          return { "&circularReference": paths[index] };
        }
      }
      objects.push(value);
      paths.push(path);
      if (prototypeName(value) === TAG_ARRAY) {
        newIterable = [];
        for (index = 0; index < value.length; index += 1) {
          newIterable[index] = deReCycle(value[index], `${path}["${index}"]`);
        }
      } else {
        newIterable = Object.create(object);
        for (name in value) {
          if (Object.prototype.hasOwnProperty.call(value, name)) {
            newIterable[name] = deReCycle(value[name], `${path}[${JSON.stringify(name)}]`);
          }
        }
      }
      return newIterable;
    }
    return value;
  })(object, "&");
}

function funcNameExtract(func) {
  if (func.name) {
    return func.name;
  }
  const result = /^function\s+([\w]+)\s*\(/.exec(func.toString());
  return result ? result[1] : "";
}

function objectSize(obj) {
  return Object.keys(obj).length;
}

function objectPick(object, keys) {
  if (!keys.length || !Object.keys(object).length) {
    return {};
  }
  return keys.reduce((accumulator, key) => {
    accumulator[key] = object[key];
    return accumulator;
  }, {});
}

function objectClass(value) {
  return value.constructor.name;
}

function objectType(value) {
  const type = prototypeName(value)
    .toLowerCase()
    .split("[object ")
    .pop()
    .split("]")
    .shift();
  if (["global", "window"].includes(type)) {
    return "object";
  }
  if (type.includes("error")) {
    return "error";
  }
  return type;
}

class Theme {
  /**
   * @constructor
   * @param {number=3} level
   * @param {Object|string=} theme
   */
  constructor(level = 3, theme) {
    this.cli = new chalk.Instance({ level: Math.min(level, chalk.supportsColor.level) });
    let rgb;
    switch (true) {
      case theme === "dark":
        rgb = THEME_DARK;
        break;
      case theme === "light":
        rgb = THEME_LIGHT;
        break;
      case prototypeName(theme) === TAG_OBJECT:
        rgb = { ...THEME_LIGHT, ...theme };
        break;
      default:
        rgb = THEME_LIGHT;
        break;
    }
    this.argument = this.compose(...rgb.argument);
    this.boolean = this.compose(...rgb.boolean);
    this.comment = this.compose(...rgb.comment);
    this.keyword = this.compose(...rgb.keyword);
    this.name = this.compose(...rgb.name);
    this.number = this.compose(...rgb.number);
    this.plain = this.compose(...rgb.plain);
    this.property = this.compose(...rgb.property);
    this.string = this.compose(...rgb.string);
  }
  static toRGB(color) {
    color = Number.parseInt(color.toString(), 10);
    if (!Number.isInteger(color)) {
      return 255;
    }
    return Math.min(255, Math.max(0, color));
  }
  compose(red = 255, green = 255, blue = 255) {
    red = Theme.toRGB(red);
    green = Theme.toRGB(green);
    blue = Theme.toRGB(blue);
    return (value) => this.cli.rgb(red, green, blue)(value.toString());
  }
}

class Consono {
  #arrayMaxElements;
  #arrow;
  #clear;
  #colorize;
  #console;
  #currentDepth;
  #depth;
  #exit;
  #immediate;
  #indentType;
  #indent;
  #mapMaxEntries;
  #objectMaxProps;
  #quotesEnd;
  #quotesStart;
  #returns;
  #setMaxValues;
  #stringMaxLength;
  #theme;
  /**
   * @public
   * @constructor
   * @param {Object=} options
   * @param {Object|string=} theme
   */
  constructor(options = {}, theme) {
    this.setOptions(options);
    this.setTheme(theme);
  }
  /**
   * @public
   * @param {Object|string=} theme
   */
  setTheme(theme) {
    /** @protected */
    this.#theme = new Theme(this.#colorize ? 3 : 0, theme);
  }
  /**
   * @public
   * @param {Object=} options
   */
  setOptions(options = {}) {
    options = options || {};
    const opts = {
      ...OPTIONS_DEFAULT,
      ...options,
    };
    this.#arrayMaxElements = Number.parseInt(opts.arrayMaxElements);
    this.#arrow = `${opts.assignSymbol}`;
    this.#clear = !!opts.clear;
    this.#colorize = !!opts.colorize;
    this.#console = !!opts.console;
    this.#currentDepth = 0;
    this.#depth = Number.parseInt(opts.depth);
    if (opts.exit === false) {
      this.#exit = false;
    } else if (opts.exit === true) {
      this.#exit = 0;
    } else if (isInteger(opts.exit)) {
      this.#exit = opts.exit;
    } else {
      this.#exit = false;
    }
    this.#indentType = `${opts.indent}`;
    this.#indent = this.#indentType.repeat(opts.indentPad);
    this.#mapMaxEntries = Number.parseInt(opts.mapMaxEntries);
    this.#objectMaxProps = Number.parseInt(opts.objectMaxProps);
    this.#quotesEnd = `${opts.quotesEnd}`;
    this.#quotesStart = `${opts.quotesStart}`;
    this.#returns = !!opts.returns;
    this.#immediate = !!opts.immediate;
    this.#setMaxValues = Number.parseInt(opts.setMaxValues);
    this.#stringMaxLength = Number.parseInt(opts.stringMaxLength);
  }
  /**
   * @public
   * @param {*} value
   * @param {string=} indent
   * @param {boolean|string=true} describe
   * @param {string=""} subType
   * @returns {string}
   */
  toPrintable(value, indent = "", describe = true, subType = "") {
    let print = "";
    let startsWith = "";
    let endsWith = "";
    let iterationLimit = Number.MAX_SAFE_INTEGER;
    const type = objectType(value);
    switch (type) {
      case "array": {
        const arrLength = value.length;
        if (arrLength > this.#arrayMaxElements) {
          startsWith = `${this.#theme.keyword("array")}${subType.length ? ` ${this.#theme.keyword(subType)}` : ""} \
${this.#theme.plain("(")}${this.#theme.argument("elements")}${this.#theme.plain("=")}\
${this.#theme.number(arrLength)}${this.#theme.plain(",")} \
${this.#theme.argument("shown")}=${this.#theme.number(this.#arrayMaxElements)}${this.#theme.plain(")")} \
${this.#theme.plain("[")}\n`;
        } else {
          startsWith = `${this.#theme.keyword("array")}${subType.length ? ` ${this.#theme.keyword(subType)}` : ""} \
${this.#theme.plain("(")}${this.#theme.argument("elements")}${this.#theme.plain("=")}\
${this.#theme.number(arrLength)}${this.#theme.plain(")")} \
${this.#theme.plain("[")}\n`;
        }
        endsWith = `${indent}${this.#theme.plain("]")}`;
        iterationLimit = this.#arrayMaxElements;
        break;
      }
      case "object": {
        const origObject = value;
        value = objectDeCycle(value);
        if (describe === true) {
          const size = objectSize(value);
          let printSize = "";
          if (size > this.#objectMaxProps) {
            printSize = `${this.#theme.plain("(")}\
${this.#theme.argument("props")}${this.#theme.plain("=")}${this.#theme.number(size)}\
${this.#theme.plain(",")} \
${this.#theme.argument("shown")}${this.#theme.plain("=")}${this.#theme.number(this.#objectMaxProps)}${this.#theme.plain(
              ")",
            )}`;
          } else {
            printSize = `${this.#theme.plain("(")}\
${this.#theme.argument("props")}${this.#theme.plain("=")}${this.#theme.number(size)}\
${this.#theme.plain(")")}`;
          }
          startsWith = `${this.#theme.keyword("object")} \
${this.#theme.keyword(objectClass(origObject))} ${printSize} ${this.#theme.plain("{")}\n`;
          endsWith = `${indent}${this.#theme.plain("}")}`;
        } else {
          startsWith = `${this.#theme.plain("(")}\n`;
          endsWith = `${indent}${this.#theme.plain(")")}`;
        }
        iterationLimit = this.#objectMaxProps;
        break;
      }
      case "arguments": {
        const argLength = value.length;
        if (argLength > this.#arrayMaxElements) {
          startsWith = `${this.#theme.keyword("arguments")} \
${this.#theme.plain("(")}\
${this.#theme.argument("arity")}${this.#theme.plain("=")}${this.#theme.number(argLength)}, \
${this.#theme.argument("shown")}${this.#theme.plain("=")}${this.#theme.number(this.#arrayMaxElements)}\
${this.#theme.plain(")")} ${this.#theme.plain("[")}\n`;
        } else {
          startsWith = `${this.#theme.keyword("arguments")} \
${this.#theme.plain("(")}\
${this.#theme.argument("arity")}${this.#theme.plain("=")}${this.#theme.number(argLength)}\
${this.#theme.plain(")")} ${this.#theme.plain("[")}\n`;
        }
        endsWith = `${indent}${this.#theme.plain("]")}`;
        iterationLimit = this.#arrayMaxElements;
        break;
      }
      case "set": {
        const setSize = value.size;
        if (setSize > this.#setMaxValues) {
          startsWith = `${this.#theme.keyword("set")} \
${this.#theme.plain("(")}\
${this.#theme.argument("size")}${this.#theme.plain("=")}${this.#theme.number(setSize)}${this.#theme.plain(",")} \
${this.#theme.argument("shown")}${this.#theme.plain("=")}${this.#theme.number(this.#setMaxValues)}\
${this.#theme.plain(")")} ${this.#theme.plain("{")}\n`;
        } else {
          startsWith = `${this.#theme.keyword("set")} \
${this.#theme.plain("(")}\
${this.#theme.argument("size")}${this.#theme.plain("=")}${this.#theme.number(setSize)}\
${this.#theme.plain(")")} ${this.#theme.plain("{")}\n`;
        }
        endsWith = `${indent}}`;
        iterationLimit = this.#setMaxValues;
        break;
      }
      case "map": {
        const mapSize = value.size;
        if (mapSize > this.#mapMaxEntries) {
          startsWith = `${this.#theme.keyword("map")} \
${this.#theme.plain("(")}\
${this.#theme.argument("size")}${this.#theme.plain("=")}${this.#theme.number(mapSize)}${this.#theme.plain(",")} \
${this.#theme.argument("shown")}${this.#theme.plain("=")}${this.#theme.number(this.#mapMaxEntries)}\
${this.#theme.plain(")")} ${this.#theme.plain("{")}\n`;
        } else {
          startsWith = `${this.#theme.keyword("map")} ${this.#theme.plain("(")}\
${this.#theme.argument("size")}${this.#theme.plain("=")}${this.#theme.number(mapSize)}${this.#theme.plain(")")} \
${this.#theme.plain("{")}\n`;
        }
        endsWith = `${indent}${this.#theme.plain("}")}`;
        iterationLimit = this.#mapMaxEntries;
        break;
      }
      default:
        return this.formatValue(indent, value);
    }
    let iteration = 0;
    switch (type) {
      case "set": {
        const iterateSet = Array.from(value);
        for (const itemKey in iterateSet) {
          const originalValue = iterateSet[itemKey];
          const formattedValue = this.formatValue(indent, originalValue);
          print += this.formatAssign("set", indent, itemKey, formattedValue);
          iteration += 1;
          if (iteration >= iterationLimit) {
            break;
          }
        }
        break;
      }
      case "map":
        for (const entry of value.entries()) {
          const [entryKey, entryValue] = entry;
          const formattedValue = this.formatValue(indent, { key: entryKey, value: entryValue }, false);
          print += this.formatAssign("map", indent, entryKey, formattedValue);
          iteration += 1;
          if (iteration >= iterationLimit) {
            break;
          }
        }
        break;
      default: {
        const keys = Object.keys(value)
          .sort((alpha, beta) => alpha.localeCompare(beta))
          .reduce((previous, current) => (previous[current] = void 0) || previous, {});
        for (const key in keys) {
          if (!Object.prototype.hasOwnProperty.call(value, key)) {
            continue;
          }
          const originalValue = value[key];
          const originalParamType = objectType(originalValue);
          const formattedValue = this.formatValue(indent, originalValue);
          print += this.formatAssign(originalParamType, indent, key, formattedValue);
          iteration += 1;
          if (iteration >= iterationLimit) {
            break;
          }
        }
        break;
      }
    }
    return `${startsWith}${print}${endsWith}`;
  }
  /**
   * @protected
   * @param {string} indent
   * @param {*} originalValue
   * @param {boolean|string=true} describe
   * @returns {string}
   */
  formatValue(indent, originalValue, describe = true) {
    let value = "";
    let type = objectType(originalValue);
    let subType = "";
    const tag = prototypeName(originalValue);
    switch (tag) {
      case TAG_VOID:
        [type, value] = this.formatUndefined();
        break;
      case TAG_NULL:
        [type, value] = this.formatNull();
        break;
      case TAG_GLOBAL:
      case TAG_WINDOW:
        [type, value] = this.formatGlobal(tag, originalValue, indent);
        break;
      case TAG_BIGINT:
        [type, value] = this.formatBigInt(originalValue);
        break;
      case TAG_NUMBER:
        [type, value] = this.formatNumber(originalValue);
        break;
      case TAG_BOOL:
        [type, value] = this.formatBoolean(originalValue);
        break;
      case TAG_STRING:
        [type, value] = this.formatString(originalValue);
        break;
      case TAG_REGEXP:
        [type, value] = this.formatRegexp(originalValue);
        break;
      case TAG_FUNCTION:
      case TAG_ASYNC_FUNCTION:
      case TAG_GENERATOR_FUNCTION:
        [type, value] = this.formatFunction(tag, originalValue);
        break;
      case TAG_DATE:
        [type, value] = this.formatDate(originalValue);
        break;
      case TAG_ARGUMENTS:
        [type, value] = this.formatArguments(originalValue);
        break;
      case TAG_SYMBOL:
        [type, value] = this.formatSymbol(originalValue);
        break;
      case TAG_PROMISE:
        [type, value] = this.formatPromise();
        break;
      case TAG_GENERATOR:
        [type, value] = this.formatGenerator();
        break;
      case TAG_ERROR:
        [type, value] = this.formatError(originalValue);
        break;
      case TAG_WEAK_SET:
      case TAG_WEAK_MAP:
        [type, value] = this.formatWeak(tag);
        break;
      case TAG_SET:
        [type, value] = this.formatSet(originalValue);
        break;
      case TAG_MAP:
        [type, value] = this.formatMap(originalValue);
        break;
      case TAG_ARRAY_BUFFER:
      case TAG_SHARED_ARRAY_BUFFER:
        [type, value] = this.formatBuffer(tag, originalValue);
        break;
      default:
        if (tag.includes("Array")) {
          type = "array";
          subType = objectClass(originalValue).toLowerCase();
          originalValue = Array.from(originalValue);
        } else if (tag.includes("Iterator]")) {
          const iterator = tag.split(" ")[1];
          if (iterator === "Set") {
            return this.toPrintable(new Set(Array.from(originalValue).map((e) => e[1])), indent, describe);
          } else if (iterator === "Map") {
            return this.toPrintable(new Map(Array.from(originalValue)), indent, describe);
          } else if (iterator === "String") {
            return this.toPrintable(
              Array.from(originalValue)
                .map((e) => e[1])
                .join(""),
              indent,
              describe,
            );
          } else if (iterator === "Array") {
            return this.toPrintable(
              Array.from(originalValue).map((e) => e[1]),
              indent,
              describe,
            );
          }
        }
        break;
    }
    switch (type) {
      case "array":
      case "object":
        type = "";
        if (this.#currentDepth === this.#depth) {
          const size = objectSize(originalValue);
          let printSize = "";
          if (size > this.#objectMaxProps) {
            printSize = `${this.#theme.plain("(")}\
${this.#theme.argument("props")}${this.#theme.plain("=")}${this.#theme.number(size)}${this.#theme.plain(",")} \
${this.#theme.argument("shown")}${this.#theme.plain("=")}${this.#theme.number(this.#objectMaxProps)}\
${this.#theme.plain(")")}`;
          } else {
            printSize = `${this.#theme.plain("(")}\
${this.#theme.argument("props")}${this.#theme.plain("=")}${this.#theme.number(size)}\
${this.#theme.plain(")")}`;
          }
          value = `${this.#theme.keyword("object")} ${this.#theme.keyword(objectClass(originalValue))} ${printSize}`;
        } else {
          this.#currentDepth += 1;
          const indentToPrint =
            type === "array" ? `${this.#theme.comment(indent)}` : `${indent}${this.#theme.comment(this.#indent)}`;
          value = this.toPrintable(originalValue, indentToPrint, describe, subType);
          this.#currentDepth -= 1;
        }
        break;
      default:
        if (!type.length) {
          type = tag
            .split("[object ")
            .pop()
            .split("]")
            .shift()
            .toLowerCase();
          value = originalValue.toString();
        }
        break;
    }
    return `${this.#theme.keyword(type)}${type.length ? this.#theme.plain(" • ") : ""}${value}`;
  }
  /**
   * @protected
   * @param {arguments} value
   * @returns {[string, string]}
   */
  formatArguments(value) {
    return ["arguments", this.toPrintable(value)];
  }
  /**
   * @protected
   * @param {BigInteger} value
   * @returns {[string, string]}
   */
  formatBigInt(value) {
    return ["number bigint", this.#theme.number(value)];
  }
  /**
   * @protected
   * @param {boolean} value
   * @returns {[string, string]}
   */
  formatBoolean(value) {
    return ["boolean", this.#theme.boolean(value)];
  }
  /**
   * @protected
   * @param {string} tag
   * @param {Buffer} value
   * @returns {[string, string]}
   */
  formatBuffer(tag, value) {
    return [
      TAG_ARRAY_BUFFER ? "array buffer" : "array buffer shared",
      `${this.#theme.plain("(")}\
${this.#theme.argument("bytes")}${this.#theme.plain("=")}${this.#theme.number(value.byteLength)}\
${this.#theme.plain(")")}`,
    ];
  }
  /**
   * @protected
   * @param {Date} value
   * @returns {[string, string]}
   */
  formatDate(value) {
    return ["date", this.#theme.name(value.toISOString() + " • " + value.toString())];
  }
  /**
   * @protected
   * @param {Error} value
   * @returns {[string, *]}
   */
  formatError(value) {
    return [`error ${objectClass(value)}`, this.#theme.string(value.message)];
  }
  /**
   * @protected
   * @param {string} tag
   * @param {Function} value
   * @returns {[string, string]}
   */
  formatFunction(tag, value) {
    let type = "function";
    switch (tag) {
      case TAG_ASYNC_FUNCTION:
        type = `${type} async`;
        break;
      case TAG_GENERATOR_FUNCTION:
        type = `${type} generator`;
        break;
    }
    const name = funcNameExtract(value);
    if (name.length) {
      type = `${type} ${this.#theme.name(name)}`;
    } else {
      type = `${type} anonymous`;
    }
    const source =
      `${value}`
        .replace(/\n+/g, "")
        .split(")")
        .shift() + ") {…}";
    return [type, this.#theme.argument(source)];
  }
  /**
   * @protected
   * @returns {[string, string]}
   */
  formatGenerator() {
    return ["generator", this.#theme.argument("Generator {…}")];
  }
  /**
   * @protected
   * @param {string} tag
   * @param {global|window} value
   * @param {string} indent
   * @returns {[string, string]}
   */
  formatGlobal(tag, value, indent) {
    return [
      `global ${tag === TAG_WINDOW ? "window" : "this"}`,
      this.toPrintable({ ...value }, `${indent}${this.#theme.comment(this.#indent)}`),
    ];
  }
  /**
   * @protected
   * @param {Map} value
   * @returns {[string, string]}
   */
  formatMap(value) {
    return ["map", this.toPrintable(value)];
  }
  /**
   * @protected
   * @returns {[string, string]}
   */
  formatNull() {
    return ["empty", this.#theme.string("null")];
  }
  /**
   * @protected
   * @param {number} value
   * @returns {[string, string]}
   */
  formatNumber(value) {
    let type;
    if (Number.isFinite(value)) {
      if (Number.isInteger(value)) {
        if (value === 0) {
          if (Object.is(value, -0)) {
            type = "number negative zero";
          } else {
            type = "number zero";
          }
        } else {
          type = "number integer";
        }
      } else {
        type = "number float";
      }
    } else {
      type = "number";
      if (Number.isNaN(value)) {
        type += " nan";
      } else if (value === Number.POSITIVE_INFINITY) {
        type += " positive infinity";
      } else {
        type += " negative infinity";
      }
    }
    return [type, this.#theme.number(Object.is(value, -0) ? "-0" : value)];
  }
  /**
   * @protected
   * @returns {[string, string]}
   */
  formatPromise() {
    return ["promise", this.#theme.argument("Promise {…}")];
  }
  /**
   * @protected
   * @param {RegExp} value
   * @returns {[string, string]}
   */
  formatRegexp(value) {
    return [`regexp ${value.flags}`, this.#theme.name(value)];
  }
  /**
   * @protected
   * @param {Set} value
   * @returns {[string,string]}
   */
  formatSet(value) {
    return ["set", this.toPrintable(value)];
  }
  /**
   * @protected
   * @param {string} text
   * @returns {[string, string]}
   */
  formatString(text) {
    const stringAsArray = [...text];
    const stringSize = stringAsArray.length;
    const stringLength = text.length;
    let printString = "";
    if (this.#stringMaxLength > 0) {
      if (stringLength !== stringSize) {
        printString = stringAsArray.slice(0, this.#stringMaxLength).join("");
      } else {
        printString = text.slice(0, this.#stringMaxLength);
      }
    }
    let value;
    if (stringLength === stringSize) {
      value = `${this.#theme.string(this.#quotesStart)}\
${this.#theme.string(printString || text)}${this.#theme.string(this.#quotesEnd)} \
${this.#theme.plain("(")}${this.#theme.argument("length")}${this.#theme.plain("=")}${this.#theme.number(stringLength)}`;
    } else {
      value = `${this.#theme.string(this.#quotesStart)}\
${this.#theme.string(printString || text)}${this.#theme.string(this.#quotesEnd)} \
${this.#theme.plain("(")}\
${this.#theme.argument("length")}${this.#theme.plain("=")}${this.#theme.number(stringLength)}${this.#theme.plain(",")} \
${this.#theme.argument("symbols")}${this.#theme.plain("=")}${this.#theme.number(stringSize)}`;
    }
    if (stringSize > this.#stringMaxLength) {
      value = `${value}${this.#theme.plain(",")} \
${this.#theme.argument("shown")}${this.#theme.plain("=")}${this.#theme.number(
        this.#stringMaxLength,
      )}${this.#theme.plain(")")}`;
    } else {
      value = `${value}${this.#theme.plain(")")}`;
    }
    stringClearReference(printString);
    return ["string", value];
  }
  /**
   * @protected
   * @param {Symbol} value
   * @returns {[string, string]}
   */
  formatSymbol(value) {
    return ["symbol", value.toString()];
  }
  /**
   * @protected
   * @returns {[string, string]}
   */
  formatUndefined() {
    return ["empty", this.#theme.string("undefined")];
  }
  /**
   * @protected
   * @param {string} tag
   * @returns {[string,string]}
   */
  formatWeak(tag) {
    if (tag === TAG_WEAK_MAP) {
      return ["map weak", ""];
    } else {
      return ["set weak", ""];
    }
  }
  /**
   * @protected
   * @param paramType
   * @param {string} indent
   * @param {number|string} key
   * @param {*} value
   * @returns {string}
   */
  formatAssign(paramType, indent, key, value) {
    let keyPart;
    if (paramType === "map") {
      return `${indent}${this.#theme.comment(this.#indent)}${value}\
${this.#theme.plain(",")}\n`;
    } else if (paramType === "set") {
      return `${indent}${this.#theme.comment(this.#indent)}${this.#theme.plain(this.#arrow)} ${value}\
${this.#theme.plain(",")}\n`;
    } else if (isInteger(key) || (paramType === "array" && typeof key !== "string")) {
      keyPart = `${this.#theme.plain("[")}${this.#theme.property(key)}${this.#theme.plain("]")}`;
    } else {
      keyPart = `${this.#theme.plain(this.#quotesStart)}${this.#theme.property(key)}${this.#theme.plain(
        this.#quotesEnd,
      )}`;
    }
    return `${indent}${this.#theme.comment(this.#indent)}${keyPart} ${this.#theme.plain(this.#arrow)} ${value}\
${this.#theme.plain(",")}\n`;
  }
  /**
   * @public
   * @param {*} variable
   * @returns {string|undefined}
   */
  log(variable) {
    if (this.#console) {
      if (this.#clear) {
        cliExit();
      }
      if (this.#immediate) {
        setTimeout(() => console.log(this.toPrintable(variable)), 0);
      } else {
        console.log(this.toPrintable(variable));
      }
      processExit(this.#exit);
    }
    if (this.#returns) {
      return this.toPrintable(variable);
    }
  }
  /**
   * @name factory
   * @public
   * @static
   * @param {boolean|Object} options
   * @param {Object|string=} theme
   * @returns {string|undefined}
   */
  static factory(options = true, theme) {
    const createdOptions = Consono.createOptions(options);
    const instance = new Consono(createdOptions, theme);
    return function consono(variable) {
      if (createdOptions.console) {
        if (createdOptions.clear) {
          cliExit();
        }
        if (createdOptions.immediate) {
          setTimeout(() => console.log(instance.toPrintable(variable)), 0);
        } else {
          console.log(instance.toPrintable(variable));
        }
        processExit(createdOptions.exit);
      }
      if (createdOptions.returns) {
        return instance.toPrintable(variable);
      }
    };
  }
  /**
   * @name createOptions
   * @public
   * @static
   * @param {boolean|Object} options
   * @returns {Object}
   */
  static createOptions(options = true) {
    const basicOptions = { ...OPTIONS_DEFAULT };
    if (typeof options === "boolean") {
      basicOptions.console = options;
    } else if (options && typeof options === "object") {
      Object.assign(basicOptions, options);
    }
    return objectPick(basicOptions, OPTIONS_KEYS);
  }
}

/**
 * @name consono
 * @param {*} variable
 * @param {boolean|Object} options
 * @param {Object|string=} theme
 * @returns {string|undefined}
 */
function consono(variable, options = true, theme) {
  const createdOptions = Consono.createOptions(options);
  const instance = new Consono(createdOptions, theme);
  if (createdOptions.console) {
    if (createdOptions.clear) {
      cliExit();
    }
    if (createdOptions.immediate) {
      setTimeout(() => console.log(instance.toPrintable(variable)), 0);
    } else {
      console.log(instance.toPrintable(variable));
    }
    processExit(createdOptions.exit);
  }
  if (createdOptions.returns) {
    return instance.toPrintable(variable);
  }
}

const options = OPTIONS_DEFAULT;

export default consono;
export { consono, Consono, options, THEME_LIGHT, THEME_DARK };
