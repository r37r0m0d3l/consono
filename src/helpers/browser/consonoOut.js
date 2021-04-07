import Consono from "../../core/browser/consono.js";
import cliExit from "../../utils/cliExit.js";
import processExit from "../../utils/processExit.js";
import objectKeysSort from "../../utils/objectKeysSort.js";

/**
 * @name consonoOut
 * @description Print variable as JSON without highlighting. Uses `process.stdout.write`.
 * @param {*} variable
 * @param {boolean|Object} [options=true]
 * @param {boolean} [sortKeys=true]
 * @returns {string|undefined}
 * @since 1.4.12
 */
export default function consonoOut(variable, options, sortKeys = true) {
  let out;
  if (variable === undefined) {
    out = undefined;
  } else {
    if (sortKeys) {
      out = JSON.stringify(objectKeysSort(JSON.parse(JSON.stringify(variable))), null, 2);
    } else {
      out = JSON.stringify(JSON.parse(JSON.stringify(variable)), null, 2);
    }
  }
  const createdOptions = Consono.createOptions({ ...options });
  if (createdOptions.console) {
    if (createdOptions.clear) {
      cliExit();
    }
    if (createdOptions.immediate) {
      setTimeout(() => {
        if (out === undefined) {
          console.log(undefined);
        } else {
          console.log(out);
        }
      }, 0);
    } else {
      if (out === undefined) {
        console.log(undefined);
      } else {
        console.log(out);
      }
    }
    processExit(createdOptions.exit);
  }
  if (createdOptions.returns) {
    return out;
  }
}
