import Consono from "../../core/browser/consono.mjs";
import cliExit from "../../utils/cliExit.mjs";
import cliPrint from "../../utils/browser/cliPrint.mjs";
import processExit from "../../utils/processExit.mjs";

/**
 * @name consono
 * @description Print variable
 * @param {*} variable
 * @param {boolean|Object} options
 * @param {Object|string=} theme
 * @returns {string|undefined}
 */
export default function consono(variable, options = true, theme) {
  const createdOptions = Consono.createOptions(options);
  const instance = new Consono(createdOptions, theme);
  if (createdOptions.console) {
    if (createdOptions.clear) {
      cliExit();
    }
    if (createdOptions.immediate) {
      setTimeout(() => cliPrint(instance.toPrintable(variable), createdOptions.stdout), 0);
    } else {
      cliPrint(instance.toPrintable(variable), createdOptions.stdout);
    }
    processExit(createdOptions.exit);
  }
}
