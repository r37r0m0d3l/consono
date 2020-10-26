import { THEME_DEFAULT } from "../../const/theme_default.mjs";

const Reset = "\x1b[0m";

const FgBlack = "\x1b[30m";
const FgRed = "\x1b[31m";
const FgGreen = "\x1b[32m";
// const FgYellow = "\x1b[33m";
const FgBlue = "\x1b[34m";
const FgMagenta = "\x1b[35m";
// const FgCyan = "\x1b[36m";
const FgWhite = "\x1b[37m";

const THEME_LIGHT = {
  argument: FgRed,
  boolean: FgMagenta,
  comment: FgBlack,
  keyword: FgBlue,
  name: FgGreen,
  number: FgMagenta,
  plain: FgBlack,
  property: FgRed,
  string: FgGreen,
};

const THEME_DARK = {
  argument: FgRed,
  boolean: FgMagenta,
  comment: FgWhite,
  keyword: FgBlue,
  name: FgGreen,
  number: FgMagenta,
  plain: FgWhite,
  property: FgRed,
  string: FgGreen,
};

export default class Theme {
  /**
   * @constructor
   * @param {number=3} level
   * @param {Object|string=} theme
   */
  // eslint-disable-next-line no-unused-vars
  constructor(level = 3, theme = THEME_DEFAULT) {
    let rgb;
    switch (true) {
      case theme === "dark":
        rgb = THEME_DARK;
        break;
      case theme === "light":
        rgb = THEME_LIGHT;
        break;
      default:
        rgb = THEME_LIGHT;
        break;
    }
    this.argument = (value) => rgb.argument + value.toString() + Reset;
    this.boolean = (value) => rgb.boolean + value.toString() + Reset;
    this.comment = (value) => rgb.comment + value.toString() + Reset;
    this.keyword = (value) => rgb.keyword + value.toString() + Reset;
    this.name = (value) => rgb.name + value.toString() + Reset;
    this.number = (value) => rgb.number + value.toString() + Reset;
    this.plain = (value) => rgb.plain + value.toString() + Reset;
    this.property = (value) => rgb.property + value.toString() + Reset;
    this.string = (value) => rgb.string + value.toString() + Reset;
  }
}
