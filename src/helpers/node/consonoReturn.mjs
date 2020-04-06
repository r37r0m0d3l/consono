import Consono from "../../core/node/consono.mjs";
import cliExit from "../../utils/cliExit.mjs";
import cliPrint from "../../utils/node/cliPrint.mjs";
import processExit from "../../utils/processExit.mjs";

/**
 * @name consonoReturn
 * @description Return variable with highlighting
 * @param {*} variable
 * @param {boolean|Object} options
 * @param {Object|string=} theme
 * @returns {string|undefined}
 */
export default function consonoReturn(variable, options = true, theme) {
  const createdOptions = Consono.createOptions({ ...options, console: false, returns: true });
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
  if (createdOptions.returns) {
    return instance.toPrintable(variable);
  }
}
