import Consono from "../../core/node/consono.mjs";
import cliExit from "../../utils/cliExit.mjs";
import cliPrint from "../../utils/node/cliPrint.mjs";
import processExit from "../../utils/processExit.mjs";
import { THEME_DEFAULT } from "../../const/theme_default.mjs";

/**
 * @name consonoExit
 * @description Print variable and exit process
 * @param {*} variable
 * @param {boolean|Object} options
 * @param {Object|string=} theme
 * @param {boolean|number=} exitCode
 * @returns {string|undefined}
 */
export default function consonoExit(variable, options = true, theme = THEME_DEFAULT, exitCode = 0) {
  const createdOptions = Consono.createOptions({ ...options, exit: exitCode });
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
