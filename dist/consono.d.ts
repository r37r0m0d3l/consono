export interface IConsonoOptions {
  arrayMaxElements?: number;
  assignSymbol?: string;
  clear?: boolean;
  colorize?: boolean;
  console?: boolean;
  depth?: number;
  exit?: boolean | number;
  immediate?: boolean;
  indent?: string;
  mapMaxEntries?: number;
  objectMaxProps?: number;
  quotesEnd?: string;
  quotesStart?: string;
  returns?: boolean;
  setMaxValues?: number;
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
