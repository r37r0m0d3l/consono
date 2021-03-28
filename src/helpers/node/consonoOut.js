import Consono from "../../core/browser/consono.js";
import cliExit from "../../utils/cliExit.js";
import processExit from "../../utils/processExit.js";

/**
 * @name consonoOut
 * @description Print variable as JSON without highlighting. Uses `process.stdout.write`.
 * @param {*} variable
 * @param {boolean|Object} [options=true]
 * @returns {string|undefined}
 * @since 1.4.12
 */
export default function consonoOut(variable, options) {
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
          process.stdout.write(undefined);
        } else {
          process.stdout.write(out);
        }
        process.stdout.write("\n");
      }, 0);
    } else {
      if (out === undefined) {
        process.stdout.write(undefined);
      } else {
        process.stdout.write(out);
      }
      process.stdout.write("\n");
    }
    processExit(createdOptions.exit);
  }
  if (createdOptions.returns) {
    return out;
  }
}
