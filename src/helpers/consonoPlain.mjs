import Consono from "../core/consono.mjs";
import WEB from "../const/web.mjs";
import cliExit from "../utils/cliExit.mjs";
import cliPrint from "../utils/cliPrint.mjs";
import processExit from "../utils/processExit.mjs";

/**
 * @name consonoPlain
 * @description Print variable without highlighting
 * @param {*} variable
 * @param {boolean|Object} options
 * @returns {string|undefined}
 */
export default function consonoPlain(variable, options = true) {
  const createdOptions = Consono.createOptions({ ...options, colorize: false });
  const instance = new Consono(createdOptions);
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
  if (createdOptions.returns && !WEB) {
    return instance.toPrintable(variable);
  }
}