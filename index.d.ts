export interface IConsonoOptions {
  arrayMaxElements?: number;
  assignSymbol?: string;
  clear?: boolean;
  colorize?: boolean;
  console?: boolean;
  depth?: number;
  exit?: boolean;
  indent?: string;
  mapMaxEntries?: number;
  objectMaxProps?: number;
  quotesEnd?: string;
  quotesStart?: string;
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

export declare class Consono {
  /**
   * @public
   * @static
   * @param {boolean|object} options
   * @param {object|string="dark"} theme
   * @returns {Function}
   */
  public static factory(options?: boolean | IConsonoOptions, theme?: "dark" | "light" | IConsonoTheme): Function;
  /**
   * @public
   * @constructor
   * @param {object=} options
   * @param {object|string="dark"} theme
   */
  public constructor(options?: IConsonoOptions, theme?: "dark" | "light" | IConsonoTheme);
  /**
   * @public
   * @param {*} variable
   * @returns {undefined|string}
   */
  public log(variable: any): string | void;
  /**
   * @public
   * @param {object=} options
   */
  public setOptions(options?: IConsonoOptions): void;
  /**
   * @public
   * @param {object|string="dark"} theme
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
export declare const theme: IConsonoTheme;
