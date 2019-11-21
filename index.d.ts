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

export declare function consono(
  variable: any,
  options?: boolean | IConsonoOptions,
  theme?: "dark" | "light" | IConsonoTheme,
): string | void;

export declare class Consono {
  public static factory(options?: boolean | IConsonoOptions, theme?: "dark" | "light" | IConsonoTheme): Consono;
  public constructor(options?: IConsonoOptions, theme?: "dark" | "light" | IConsonoTheme);
  public log(variable: any): string | void;
  public setOptions(options?: IConsonoOptions): void;
  public setTheme(theme?: "dark" | "light" | IConsonoTheme): void;
}

export declare const options: IConsonoOptions;
export declare const theme: IConsonoTheme;
