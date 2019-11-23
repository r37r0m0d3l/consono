const chalk = require("chalk");

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
  indent: "ˑˑ",
  indentPad: 1,
  mapMaxEntries: 99,
  objectMaxProps: 99,
  quotesEnd: `"`,
  quotesStart: `"`,
  setMaxValues: 99,
  stringMaxLength: 360,
};

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

function clearCli() {
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

function processExit() {
  try {
    process.exit(0);
  } catch (error) {
    //
  }
}

function isNumericKey(value) {
  return Number.isInteger(Number.parseInt(value));
}

function prototypeTag(value) {
  return Object.prototype.toString.call(value);
}

function clearString(str) {
  return str.length < 12 ? str : (" " + str).slice(1);
}

function deCycle(object) {
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
      if (prototypeTag(value) === TAG_ARRAY) {
        newIterable = [];
        for (index = 0; index < value.length; index += 1) {
          newIterable[index] = deReCycle(value[index], `${path}[" + index + "]`);
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

function closureNameExtract(func) {
  if (func.name) {
    return func.name;
  }
  const result = /^function\s+([\w\$]+)\s*\(/.exec(func.toString());
  return result ? result[1] : "";
}

function objSize(obj) {
  return Object.keys(obj).length;
}

function getClass(value) {
  return value.constructor.name;
}

function getType(value) {
  let type = prototypeTag(value)
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
      case prototypeTag(theme) === TAG_OBJECT:
        rgb = { ...THEME_DARK, ...theme };
        break;
      default:
        rgb = THEME_DARK;
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
  /**
   * @public
   * @constructor
   * @param {object=} options
   * @param {object|string=} theme
   */
  constructor(options = {}, theme) {
    this.setOptions(options);
    this.setTheme(theme);
  }
  /**
   * @public
   * @param {object|string=} theme
   */
  setTheme(theme) {
    this.cli = new Theme(this.colorize ? 3 : 0, theme);
  }
  /**
   * @public
   * @param {object=} options
   */
  setOptions(options = {}) {
    options = options || {};
    const opts = {
      ...OPTIONS_DEFAULT,
      ...options,
    };
    this.arrayMaxElements = opts.arrayMaxElements;
    this.arrow = opts.assignSymbol;
    this.clear = opts.clear;
    this.colorize = opts.colorize;
    this.console = opts.console;
    this.currentDepth = 0;
    this.depth = opts.depth;
    this.exit = opts.exit;
    this.indentType = opts.indent;
    this.indent = this.indentType.repeat(opts.indentPad);
    this.mapMaxEntries = opts.mapMaxEntries;
    this.objectMaxProps = opts.objectMaxProps;
    this.quotesEnd = opts.quotesEnd;
    this.quotesStart = opts.quotesStart;
    this.setMaxValues = opts.setMaxValues;
    this.stringMaxLength = opts.stringMaxLength;
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
    const type = getType(value);
    switch (type) {
      case "array":
        const arrLength = value.length;
        if (arrLength > this.arrayMaxElements) {
          startsWith = `${this.cli.keyword("array")}${subType.length ? ` ${this.cli.keyword(subType)}` : ""} \
${this.cli.plain("(")}${this.cli.argument("elements")}${this.cli.plain("=")}\
${this.cli.number(arrLength)}${this.cli.plain(",")} \
${this.cli.argument("shown")}=${this.cli.number(this.arrayMaxElements)}${this.cli.plain(")")} \
${this.cli.plain("[")}\n`;
        } else {
          startsWith = `${this.cli.keyword("array")}${subType.length ? ` ${this.cli.keyword(subType)}` : ""} \
${this.cli.plain("(")}${this.cli.argument("elements")}${this.cli.plain("=")}\
${this.cli.number(arrLength)}${this.cli.plain(")")} \
${this.cli.plain("[")}\n`;
        }
        endsWith = `${indent}${this.cli.plain("]")}`;
        iterationLimit = this.arrayMaxElements;
        break;
      case "object":
        const origObject = value;
        value = deCycle(value);
        if (describe === true) {
          const size = objSize(value);
          let printSize = "";
          if (size > this.objectMaxProps) {
            printSize = `${this.cli.plain("(")}\
${this.cli.argument("props")}${this.cli.plain("=")}${this.cli.number(size)}\
${this.cli.plain(",")} \
${this.cli.argument("shown")}${this.cli.plain("=")}${this.cli.number(this.objectMaxProps)}${this.cli.plain(")")}`;
          } else {
            printSize = `${this.cli.plain("(")}\
${this.cli.argument("props")}${this.cli.plain("=")}${this.cli.number(size)}\
${this.cli.plain(")")}`;
          }
          startsWith = `${this.cli.keyword("object")} \
${this.cli.keyword(getClass(origObject))} ${printSize} ${this.cli.plain("{")}\n`;
          endsWith = `${indent}${this.cli.plain("}")}`;
        } else {
          startsWith = `${this.cli.plain("(")}\n`;
          endsWith = `${indent}${this.cli.plain(")")}`;
        }
        iterationLimit = this.objectMaxProps;
        break;
      case "arguments":
        const argLength = value.length;
        if (argLength > this.arrayMaxElements) {
          startsWith = `${this.cli.keyword("arguments")} \
${this.cli.plain("(")}\
${this.cli.argument("arity")}${this.cli.plain("=")}${this.cli.number(argLength)}, \
${this.cli.argument("shown")}${this.cli.plain("=")}${this.cli.number(this.arrayMaxElements)}\
${this.cli.plain(")")} ${this.cli.plain("[")}\n`;
        } else {
          startsWith = `${this.cli.keyword("arguments")} \
${this.cli.plain("(")}\
${this.cli.argument("arity")}${this.cli.plain("=")}${this.cli.number(argLength)}\
${this.cli.plain(")")} ${this.cli.plain("[")}\n`;
        }
        endsWith = `${indent}${this.cli.plain("]")}`;
        iterationLimit = this.arrayMaxElements;
        break;
      case "set":
        const setSize = value.size;
        if (setSize > this.setMaxValues) {
          startsWith = `${this.cli.keyword("set")} \
${this.cli.plain("(")}\
${this.cli.argument("size")}${this.cli.plain("=")}${this.cli.number(setSize)}${this.cli.plain(",")} \
${this.cli.argument("shown")}${this.cli.plain("=")}${this.cli.number(this.setMaxValues)}\
${this.cli.plain(")")} ${this.cli.plain("{")}\n`;
        } else {
          startsWith = `${this.cli.keyword("set")} \
${this.cli.plain("(")}\
${this.cli.argument("size")}${this.cli.plain("=")}${this.cli.number(setSize)}\
${this.cli.plain(")")} ${this.cli.plain("{")}\n`;
        }
        endsWith = `${indent}}`;
        iterationLimit = this.setMaxValues;
        break;
      case "map":
        const mapSize = value.size;
        if (mapSize > this.mapMaxEntries) {
          startsWith = `${this.cli.keyword("map")} \
${this.cli.plain("(")}\
${this.cli.argument("size")}${this.cli.plain("=")}${this.cli.number(mapSize)}${this.cli.plain(",")} \
${this.cli.argument("shown")}${this.cli.plain("=")}${this.cli.number(this.mapMaxEntries)}\
${this.cli.plain(")")} ${this.cli.plain("{")}\n`;
        } else {
          startsWith = `${this.cli.keyword("map")} ${this.cli.plain("(")}\
${this.cli.argument("size")}${this.cli.plain("=")}${this.cli.number(mapSize)}${this.cli.plain(")")} \
${this.cli.plain("{")}\n`;
        }
        endsWith = `${indent}${this.cli.plain("}")}`;
        iterationLimit = this.mapMaxEntries;
        break;
      default:
        return this.formatValue(indent, value);
    }
    let iteration = 0;
    switch (type) {
      case "set":
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
      default:
        const keys = Object.keys(value)
          .sort((alpha, beta) => alpha.localeCompare(beta))
          .reduce((previous, current) => (previous[current] = void 0) || previous, {});
        for (const key in keys) {
          if (!Object.prototype.hasOwnProperty.call(value, key)) {
            continue;
          }
          const originalValue = value[key];
          const originalParamType = getType(originalValue);
          const formattedValue = this.formatValue(indent, originalValue);
          print += this.formatAssign(originalParamType, indent, key, formattedValue);
          iteration += 1;
          if (iteration >= iterationLimit) {
            break;
          }
        }
        break;
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
    let type = getType(originalValue);
    let subType = "";
    const tag = prototypeTag(originalValue);
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
        [type, value] = this.formatPromise(originalValue);
        break;
      case TAG_GENERATOR:
        [type, value] = this.formatGenerator(originalValue);
        break;
      case TAG_ERROR:
        [type, value] = this.formatError(originalValue);
        break;
      case TAG_WEAK_SET:
      case TAG_WEAK_MAP:
        [type, value] = this.formatWeak(tag, originalValue);
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
          subType = getClass(originalValue).toLowerCase();
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
        if (this.currentDepth === this.depth) {
          const size = objSize(originalValue);
          let printSize = "";
          if (size > this.objectMaxProps) {
            printSize = `${this.cli.plain("(")}\
${this.cli.argument("props")}${this.cli.plain("=")}${this.cli.number(size)}${this.cli.plain(",")} \
${this.cli.argument("shown")}${this.cli.plain("=")}${this.cli.number(this.objectMaxProps)}\
${this.cli.plain(")")}`;
          } else {
            printSize = `${this.cli.plain("(")}\
${this.cli.argument("props")}${this.cli.plain("=")}${this.cli.number(size)}\
${this.cli.plain(")")}`;
          }
          value = `${this.cli.keyword("object")} ${this.cli.keyword(getClass(originalValue))} ${printSize}`;
        } else {
          this.currentDepth += 1;
          const ind = type === "array" ? `${this.cli.comment(indent)}` : `${indent}${this.cli.comment(this.indent)}`;
          value = this.toPrintable(originalValue, ind, describe, subType);
          this.currentDepth -= 1;
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
    return `${this.cli.keyword(type)}${type.length ? this.cli.plain(" • ") : ""}${value}`;
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
    return ["number bigint", this.cli.number(value)];
  }
  /**
   * @protected
   * @param {boolean} value
   * @returns {[string, string]}
   */
  formatBoolean(value) {
    return ["boolean", this.cli.boolean(value)];
  }
  /**
   * @protected
   * @param {string} tag
   * @param {buffer} value
   * @returns {[string, string]}
   */
  formatBuffer(tag, value) {
    return [
      TAG_ARRAY_BUFFER ? "array buffer" : "array buffer shared",
      `${this.cli.plain("(")}\
${this.cli.argument("bytes")}${this.cli.plain("=")}${this.cli.number(value.byteLength)}\
${this.cli.plain(")")}`,
    ];
  }
  /**
   * @protected
   * @param {Date} value
   * @returns {[string, string]}
   */
  formatDate(value) {
    return ["date", this.cli.name(value.toISOString() + " • " + value.toString())];
  }
  /**
   * @protected
   * @param {Error} value
   * @returns {[string, *]}
   */
  formatError(value) {
    return [`error ${getClass(value)}`, this.cli.string(value.message)];
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
    const name = closureNameExtract(value);
    if (name.length) {
      type = `${type} ${this.cli.name(name)}`;
    } else {
      type = `${type} anonymous`;
    }
    const source =
      `${value}`
        .replace(/\n+/g, "")
        .split(")")
        .shift() + ") {…}";
    return [type, this.cli.argument(source)];
  }
  /**
   * @protected
   * @param {GeneratorFunction} value
   * @returns {[string, string]}
   */
  formatGenerator(value) {
    return ["generator", this.cli.argument("Generator {…}")];
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
      this.toPrintable({ ...value }, `${indent}${this.cli.comment(this.indent)}`),
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
    return ["empty", this.cli.string("null")];
  }
  /**
   * @protected
   * @param {number} value
   * @returns {[string, string]}
   */
  formatNumber(value) {
    let type = "";
    if (Number.isFinite(value)) {
      type = Number.isInteger(value) ? "number integer" : "number float";
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
    return [type, this.cli.number(value)];
  }
  /**
   * @protected
   * @param {Promise} value
   * @returns {[string, string]}
   */
  formatPromise(value) {
    return ["promise", this.cli.argument("Promise {…}")];
  }
  /**
   * @protected
   * @param {RegExp} value
   * @returns {[string, string]}
   */
  formatRegexp(value) {
    return [`regexp ${value.flags}`, this.cli.name(value)];
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
    if (this.stringMaxLength > 0) {
      if (stringLength !== stringSize) {
        printString = stringAsArray.slice(0, this.stringMaxLength).join("");
      } else {
        printString = text.slice(0, this.stringMaxLength);
      }
    }
    let value = "";
    if (stringLength === stringSize) {
      value = `${this.cli.string(this.quotesStart)}\
${this.cli.string(printString || text)}${this.cli.string(this.quotesEnd)} \
${this.cli.plain("(")}${this.cli.argument("length")}${this.cli.plain("=")}${this.cli.number(stringLength)}`;
    } else {
      value = `${this.cli.string(this.quotesStart)}\
${this.cli.string(printString || text)}${this.cli.string(this.quotesEnd)} \
${this.cli.plain("(")}\
${this.cli.argument("length")}${this.cli.plain("=")}${this.cli.number(stringLength)}${this.cli.plain(",")} \
${this.cli.argument("symbols")}${this.cli.plain("=")}${this.cli.number(stringSize)}`;
    }
    if (stringSize > this.stringMaxLength) {
      value = `${value}${this.cli.plain(",")} \
${this.cli.argument("shown")}${this.cli.plain("=")}${this.cli.number(this.stringMaxLength)}${this.cli.plain(")")}`;
    } else {
      value = `${value}${this.cli.plain(")")}`;
    }
    clearString(printString);
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
    return ["empty", this.cli.string("undefined")];
  }
  /**
   * @protected
   * @param {string} tag
   * @param {WeakMap|WeakSet} value
   * @returns {[string,string]}
   */
  formatWeak(tag, value) {
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
      return `${indent}${this.cli.comment(this.indent)}${value}\
${this.cli.plain(",")}\n`;
    } else if (paramType === "set") {
      return `${indent}${this.cli.comment(this.indent)}${this.cli.plain(this.arrow)} ${value}\
${this.cli.plain(",")}\n`;
    } else if (isNumericKey(key) || (paramType === "array" && typeof key !== "string")) {
      keyPart = `${this.cli.plain("[")}${this.cli.property(key)}${this.cli.plain("]")}`;
    } else {
      keyPart = `${this.cli.plain(this.quotesStart)}${this.cli.property(key)}${this.cli.plain(this.quotesEnd)}`;
    }
    return `${indent}${this.cli.comment(this.indent)}${keyPart} ${this.cli.plain(this.arrow)} ${value}\
${this.cli.plain(",")}\n`;
  }
  /**
   * @public
   * @param {*} variable
   * @returns {undefined|string}
   */
  log(variable) {
    if (this.console) {
      if (this.clear) {
        clearCli();
      }
      console.log(this.toPrintable(variable));
      if (this.exit) {
        processExit();
      }
    } else {
      return this.toPrintable(variable);
    }
  }
}

/**
 * @public
 * @static
 * @param {boolean|object} options
 * @param {object|string=} theme
 * @returns {undefined|string}
 */
Consono.factory = function factory(options = true, theme) {
  const opts = { console: true };
  if (typeof options === "boolean") {
    opts.console = options;
  } else if (options && typeof options === "object") {
    Object.assign(opts, options);
  }
  const instance = new Consono(options, theme);
  return function consono(any) {
    if (opts.console) {
      if (opts.clear) {
        clearCli();
      }
      console.log(instance.toPrintable(any));
      if (opts.exit) {
        processExit();
      }
    } else {
      return instance.toPrintable(any);
    }
  };
};

/**
 * @param {*} variable
 * @param {boolean|object} options
 * @param {object|string=} theme
 * @returns {undefined|string}
 */
function consono(variable, options = true, theme) {
  const opts = { console: true };
  if (typeof options === "boolean") {
    opts.console = options;
  } else if (options && typeof options === "object") {
    Object.assign(opts, options);
  }
  const instance = new Consono(options, theme);
  if (opts.console) {
    if (opts.clear) {
      clearCli();
    }
    console.log(instance.toPrintable(variable));
    if (opts.exit) {
      processExit();
    }
  } else {
    return instance.toPrintable(variable);
  }
}

module.exports = { default: consono, consono, Consono, options: OPTIONS_DEFAULT };
