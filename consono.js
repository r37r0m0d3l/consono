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
  const tag = prototypeTag(value).toLowerCase();
  let type = tag
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
  constructor(level = 3) {
    this.cli = new chalk.Instance({ level });
  }
  out(value, red = 255, green = 255, blue = 255) {
    return this.cli.rgb(red, green, blue)(value.toString());
  }
  argument(value) {
    return this.out(value, 253, 151, 31);
  }
  boolean(value) {
    return this.out(value, 174, 129, 255);
  }
  comment(value) {
    return this.out(value, 117, 113, 94);
  }
  keyword(value) {
    return this.out(value, 249, 38, 114);
  }
  string(value) {
    return this.out(value, 166, 226, 46);
  }
  number(value) {
    return this.out(value, 174, 129, 255);
  }
  property(value) {
    return this.out(value, 102, 217, 239);
  }
  name(value) {
    return this.out(value, 230, 219, 116);
  }
}

class Consono {
  /**
   * @public
   * @param {object=} options
   */
  constructor(options = {}) {
    this.setOptions(options);
    this.cli = new Theme(this.colorize ? 3 : 0);
  }
  /**
   * @public
   * @param {object=} options
   */
  setOptions(options = {}) {
    const opts = {
      ...{
        arrayMaxElements: 99,
        assignSymbol: "→",
        clear: false,
        colorize: false,
        console: true,
        depth: 20,
        exit: false,
        indent: "ˑˑ",
        indentPad: 1,
        objectMaxProps: 99,
        quotesEnd: `"`,
        quotesStart: `"`,
        stringMaxLength: 360,
      },
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
    this.objectMaxProps = opts.objectMaxProps;
    this.quotesEnd = opts.quotesEnd;
    this.quotesStart = opts.quotesStart;
    this.stringMaxLength = opts.stringMaxLength;
  }
  /**
   * @protected
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
        startsWith = `${this.cli.keyword("array")}${
          subType.length ? ` ${this.cli.keyword(subType)}` : ""
        } (${this.cli.argument("elements")}=${this.cli.number(value.length)}) [\n`;
        endsWith = `${indent}]`;
        iterationLimit = this.arrayMaxElements;
        break;
      case "object":
        const origObject = value;
        value = deCycle(value);
        if (describe === true) {
          const size = objSize(value);
          let printSize = "";
          if (size > this.objectMaxProps) {
            printSize = `(${this.cli.argument("props")}=${this.cli.number(size)}, ${this.cli.argument(
              "shown",
            )}=${this.cli.number(this.objectMaxProps)})`;
          } else {
            printSize = `(${this.cli.argument("props")}=${this.cli.number(size)})`;
          }
          startsWith = `${this.cli.keyword("object")} ${this.cli.keyword(getClass(origObject))} ${printSize} {\n`;
          endsWith = `${indent}}`;
        } else {
          startsWith = `(\n`;
          endsWith = `${indent})`;
        }
        iterationLimit = this.objectMaxProps;
        break;
      case "arguments":
        startsWith = `${this.cli.keyword("arguments")} (${this.cli.argument("arity")}=${this.cli.number(
          value.length,
        )}) [\n`;
        endsWith = `${indent}]`;
        iterationLimit = this.arrayMaxElements;
        break;
      case "set":
        startsWith = `${this.cli.keyword("set")} (${this.cli.argument("size")}=${this.cli.number(value.size)}) {\n`;
        endsWith = `${indent}}`;
        iterationLimit = this.arrayMaxElements;
        break;
      case "map":
        startsWith = `${this.cli.keyword("map")} (${this.cli.argument("size")}=${this.cli.number(value.size)}) {\n`;
        endsWith = `${indent}}`;
        iterationLimit = this.objectMaxProps;
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
        for (const key in value) {
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
            return this.toPrintable(Array.from(originalValue).map((e) => e[1]), indent, describe);
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
            printSize = `(${this.cli.argument("props")}=${this.cli.number(size)}, ${this.cli.argument(
              "shown",
            )}=${this.cli.number(this.objectMaxProps)})`;
          } else {
            printSize = `(${this.cli.argument("props")}=${this.cli.number(size)})`;
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
    return `${this.cli.keyword(type)}${type.length ? this.cli.comment(" • ") : ""}${value}`;
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
    const type = TAG_ARRAY_BUFFER ? "array buffer" : "array buffer shared";
    return [type, `(${this.cli.argument("bytes")}=${this.cli.number(value.byteLength)})`];
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
      value = `${this.cli.string(this.quotesStart)}${this.cli.string(printString || text)}${this.cli.string(
        this.quotesEnd,
      )} \
(${this.cli.argument("length")}=${this.cli.number(stringLength)}`;
    } else {
      value = `${this.cli.string(this.quotesStart)}${this.cli.string(printString || text)}${this.cli.string(
        this.quotesEnd,
      )} \
(${this.cli.argument("length")}=${this.cli.number(stringLength)}, \
${this.cli.argument("symbols")}=${this.cli.number(stringSize)}`;
    }
    if (stringSize > this.stringMaxLength) {
      value = `${value}, \
${this.cli.argument("shown")}=${this.cli.number(this.stringMaxLength)})`;
    } else {
      value = `${value})`;
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
      return `${indent}${this.cli.comment(this.indent)}${value},\n`;
    } else if (paramType === "set") {
      return `${indent}${this.cli.comment(this.indent)}${this.arrow} ${value},\n`;
    } else if (isNumericKey(key) || (paramType === "array" && typeof key !== "string")) {
      keyPart = `${this.cli.argument("[")}${this.cli.name(key)}${this.cli.argument("]")}`;
    } else {
      keyPart = `${this.cli.argument(this.quotesStart)}${this.cli.name(key)}${this.cli.argument(this.quotesEnd)}`;
    }
    return `${indent}${this.cli.comment(this.indent)}${keyPart} ${this.arrow} ${value},\n`;
  }
  /**
   * @public
   * @param {*} any
   * @returns {undefined|string}
   */
  log(any) {
    if (this.console) {
      if (this.clear) {
        clearCli();
      }
      console.log(this.toPrintable(any));
      if (this.exit) {
        processExit();
      }
    } else {
      return this.toPrintable(any);
    }
  }
}

/**
 * @public
 * @param {boolean|object} options
 * @returns {undefined|string}
 */
Consono.factory = function factory(options = true) {
  const opts = { console: true };
  if (typeof options === "boolean") {
    opts.console = options;
  } else if (options && typeof options === "object") {
    Object.assign(opts, options);
  }
  const instance = new Consono(options);
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
 * @param {*} any
 * @param {boolean|object} options
 * @returns {undefined|string}
 */
function consono(any, options = true) {
  const opts = { console: true };
  if (typeof options === "boolean") {
    opts.console = options;
  } else if (options && typeof options === "object") {
    Object.assign(opts, options);
  }
  const instance = new Consono(options);
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
}

module.exports.default = consono;

module.exports.consono = consono;

module.exports.Consono = Consono;
