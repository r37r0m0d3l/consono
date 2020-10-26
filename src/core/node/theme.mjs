import chalk from "chalk";

import THEME_DARK from "../../const/theme_dark.mjs";
import THEME_LIGHT from "../../const/theme_light.mjs";
import { THEME_DEFAULT } from "../../const/theme_default.mjs";

export default class Theme {
  /**
   * @constructor
   * @param {number=3} level
   * @param {Object|string=} theme
   */
  constructor(level = 3, theme = THEME_DEFAULT) {
    this.cli = new chalk.Instance({ level: Math.min(level, chalk.supportsColor.level) });
    let rgb;
    switch (true) {
      case theme === "dark":
        rgb = THEME_DARK;
        break;
      case theme === "light":
        rgb = THEME_LIGHT;
        break;
      case Object.prototype.toString.call(theme) === "[object Object]":
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
