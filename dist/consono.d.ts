/**
 * @typedef IConsonoOptions
 * @type {object}
 * @property {number} [arrayMaxElements=99] Maximum number of elements in array to show.
 * @property {string} [assignSymbol='→'] Assign symbol.
 * @property {boolean} [clear=false] Clear console before output.
 * @property {boolean} [colorize=true] Colorize the output.
 * @property {boolean} [console=true] Output to console.
 * @property {number} [depth=20] Default depth of object.
 * @property {boolean|number} [exit=false] Number greater than zero - exit status with passed error code. 'false' - do nothing. 'true' - exit status ok.
 * @property {boolean} [immediate=false] Call console.log immediately.
 * @property {string} [indent='ˑˑ'] Print indentation.
 * @property {number} [mapMaxEntries=99] Maximum number of entries in map to show.
 * @property {number} [objectMaxProps=99] Maximum number of properties in object to show.
 * @property {string} [quotesEnd='"'] Quote end.
 * @property {string} [quotesStart='"'] Quote start.
 * @property {boolean} [returns=true] Return inspected variable as string.
 * @property {number} [setMaxValues=99] Maximum number of values in set to show.
 * @property {boolean} [stdout=false] Call `process.stdout.write` instead of `console.log`.
 * @property {number} [stringMaxLength=360] Maximum length of string to show.
 */
export interface IConsonoOptions {
  /**
   * @description Maximum number of elements in array to show.
   * @default 99
   */
  arrayMaxElements?: number;
  /**
   * @description Assign symbol.
   * @default "→"
   */
  assignSymbol?: string;
  /**
   * @description Clear console before output.
   * @default false
   */
  clear?: boolean;
  /**
   * @description Colorize the output.
   * @default true
   */
  colorize?: boolean;
  /**
   * @description Output to console.
   * @default true
   */
  console?: boolean;
  /**
   * @description Default depth of object.
   * @default 20
   */
  depth?: number;
  /**
   * @description Number greater than zero - exit status with passed error code. 'false' - do nothing. 'true' - exit status ok.
   * @default false
   */
  exit?: boolean | number;
  /**
   * @description Call console.log immediately.
   * @default false
   */
  immediate?: boolean;
  /**
   * @description Print indentation.
   * @default "ˑˑ"
   */
  indent?: string;
  /**
   * @description Maximum number of entries in map to show.
   * @default 99
   */
  mapMaxEntries?: number;
  /**
   * @description Maximum number of properties in object to show.
   * @default 99
   */
  objectMaxProps?: number;
  /**
   * @description Quote end.
   * @default `"`
   */
  quotesEnd?: string;
  /**
   * @description Quote start.
   * @default `"`
   */
  quotesStart?: string;
  /**
   * @description Return inspected variable as string.
   * @default true
   */
  returns?: boolean;
  /**
   * @description Maximum number of values in set to show.
   * @default 99
   */
  setMaxValues?: number;
  /**
   * @description Call `process.stdout.write` instead of `console.log`.
   * @default false
   */
  stdout?: boolean;
  /**
   * @description Maximum length of string to show.
   * @default 360
   */
  stringMaxLength?: number;
}

export interface IConsonoTheme {
  argument?: [number, number, number];
  boolean?: [number, number, number];
  comment?: [number, number, number];
  keyword?: [number, number, number];
  name?: [number, number, number];
  number?: [number, number, number];
  plain?: [number, number, number];
  property?: [number, number, number];
  string?: [number, number, number];
}

export default consono;

/**
 * @name consono
 * @description Print variable
 * @param {*} variable
 * @param {boolean|object} options
 * @param {object|string="dark"} theme
 * @returns {undefined|string}
 */
export declare function consono(
  variable: any,
  options?: boolean | IConsonoOptions,
  theme?: "dark" | "light" | IConsonoTheme,
): string | void;

/**
 * @name consonoExit
 * @description Print variable and exit process
 * @param {*} variable
 * @param {boolean|Object} options
 * @param {Object|string=} theme
 * @param {boolean|number=} exitCode
 * @returns {string|undefined}
 */
export declare function consonoExit(
  variable: any,
  options?: boolean | IConsonoOptions,
  theme?: "dark" | "light" | IConsonoTheme,
  exitCode?: boolean | number,
): string | void;

/**
 * @name consonoJSON
 * @description Print variable as JSON without highlighting
 * @param {*} variable
 * @param {boolean|Object} [options=true]
 * @returns {string|undefined}
 */
export declare function consonoJSON(variable: any, options?: boolean | IConsonoOptions): string | void;

/**
 * @name consonoPlain
 * @description Print variable without highlighting
 * @param {*} variable
 * @param {boolean|Object} options
 * @returns {string|undefined}
 */
export declare function consonoPlain(variable: any, options?: boolean | IConsonoOptions): string | void;

/**
 * @name consonoReturn
 * @description Return variable with highlighting
 * @param {*} variable
 * @param {boolean|Object} options
 * @param {Object|string=} theme
 * @returns {string|undefined}
 */
export declare function consonoReturn(
  variable: any,
  options?: boolean | IConsonoOptions,
  theme?: "dark" | "light" | IConsonoTheme,
): string;

export declare class Consono {
  /**
   * @public
   * @static
   * @param {boolean|Object} options
   * @param {Object|string="dark"} theme
   * @returns {Function}
   */
  public static factory(
    options?: boolean | IConsonoOptions,
    theme?: "dark" | "light" | IConsonoTheme,
  ): (variable: any) => string | void;
  /**
   * @public
   * @constructor
   * @param {Object=} options
   * @param {Object|string="dark"} theme
   */
  public constructor(options?: IConsonoOptions, theme?: "dark" | "light" | IConsonoTheme);
  /**
   * @public
   * @param {*} variable
   * @returns {string|undefined}
   */
  public log(variable: any): string | void;
  /**
   * @public
   * @param {Object=} options
   */
  public setOptions(options?: IConsonoOptions): void;
  /**
   * @public
   * @param {Object|string="dark"} theme
   */
  public setTheme(theme?: "dark" | "light" | IConsonoTheme): void;
  /**
   * @public
   * @param {*} value
   * @param {string=} indent
   * @param {boolean|string=true} describe
   * @param {string=""} subType
   * @returns {string}
   */
  public toPrintable(value: any, indent: string, describe: boolean | string, subType: string): string;
}

export declare const options: IConsonoOptions;
export declare const THEME_DARK: IConsonoTheme;
export declare const THEME_LIGHT: IConsonoTheme;
