export interface IConsonoOptions {
  arrayMaxElements: number;
  assignSymbol: string;
  clear: boolean;
  colorize: boolean;
  console: boolean;
  depth: number;
  exit: boolean;
  indent: string;
  mapMaxEntries: number;
  objectMaxProps: number;
  quotesEnd: string;
  quotesStart: string;
  setMaxValues: number;
  stringMaxLength: number;
}

export default consono;

export declare function consono(variable: any, options?: boolean | IConsonoOptions): string | void;

export declare class Consono {
  public static factory(options?: boolean | IConsonoOptions): Consono;
  public constructor(options?: IConsonoOptions);
  public log(variable: any): string | void;
  public setOptions(options?: IConsonoOptions): void;
}

export declare const options: IConsonoOptions;
