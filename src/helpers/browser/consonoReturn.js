import Consono from "../../core/browser/consono.js";
import cliExit from "../../utils/cliExit.js";
import cliPrint from "../../utils/browser/cliPrint.js";
import processExit from "../../utils/processExit.js";
import { THEME_DEFAULT } from "../../const/theme_default.js";

/**
 * @name consonoReturn
 * @description Return variable with highlighting
 * @param {*} variable
 * @param {boolean|Object} options
 * @param {Object|string=} theme
 * @returns {string|undefined}
 */
export default function consonoReturn(variable, options = true, theme = THEME_DEFAULT) {
  const createdOptions = Consono.createOptions({ ...options, console: false, returns: true });
  const instance = new Consono(createdOptions, theme);
  if (createdOptions.console) {
    if (createdOptions.clear) {
      cliExit();
    }
    if (createdOptions.immediate) {
      setTimeout(() => cliPrint(instance.toPrintable(variable) /*, createdOptions.stdout*/), 0);
    } else {
      cliPrint(instance.toPrintable(variable) /*, createdOptions.stdout*/);
    }
    processExit(createdOptions.exit);
  }
  if (createdOptions.returns) {
    return instance.toPrintable(variable);
  }
}
