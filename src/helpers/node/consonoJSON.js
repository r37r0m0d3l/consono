import Consono from "../../core/browser/consono.js";
import cliExit from "../../utils/cliExit.js";
import processExit from "../../utils/processExit.js";

/**
 * @name consonoJSON
 * @description Print variable as JSON without highlighting. Uses `console.dir`.
 * @param {*} variable
 * @param {boolean|Object} [options=true]
 * @returns {string|undefined}
 * @since 1.4.11
 */
export default function consonoJSON(variable, options) {
  let out;
  if (variable === undefined) {
    out = undefined;
  } else {
    out = JSON.parse(JSON.stringify(variable), null, 2);
  }
  const createdOptions = Consono.createOptions({ ...options });
  if (createdOptions.console) {
    if (createdOptions.clear) {
      cliExit();
    }
    if (createdOptions.immediate) {
      setTimeout(() => {
        if (out === undefined) {
          console.dir(undefined);
        } else {
          console.dir(out);
        }
      }, 0);
    } else {
      if (out === undefined) {
        console.dir(undefined);
      } else {
        console.dir(out);
      }
    }
    processExit(createdOptions.exit);
  }
  if (createdOptions.returns) {
    return out;
  }
}
