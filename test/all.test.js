const { consono } = require("../consono.js");

describe("Test collection", () => {
  //#region Value properties
  consono(global || globalThis);
  consono(Infinity);
  consono(Number.POSITIVE_INFINITY);
  consono(Number.NEGATIVE_INFINITY);
  consono(null);
  consono(undefined);
  //#endregion

  //#region Fundamental objects
  consono(true);
  consono(function() {});
  consono(function helloWorld() {});
  consono(() => {});
  consono(Symbol("🌈"));
  consono({});
  class MyClass {}
  const myClass = new MyClass();
  myClass.deeper = new MyClass();
  consono(myClass);
  consono(new Error("Standard error"));
  consono(new EvalError("Unable to run this code"));
  consono(new RangeError("Must be less than 10 and greater than 0"));
  consono(new ReferenceError("This is error from try/catch"));
  consono(new SyntaxError("Not a source code"));
  consono(new TypeError("Value is not of the expected type"));
  //#endregion

  //#region Numbers and dates
  consono(NaN);
  consono(1);
  consono(1.5);
  consono(BigInt(9007199254740991));
  consono(new Date());
  consono(Math);
  //#endregion

  //#region Text processing
  consono("😀😁😂🤣😃😄😅😆😉😊", { stringMaxLength: 5 });
  consono(/[0-9]+/);
  consono(/\w+/giu);
  //#endregion

  //#region Indexed collections
  consono([1, 2, 3]);
  consono(Int8Array.from([1, 2, 3]));
  //#endregion

  //#region Keyed collections
  consono(new Set(["a", true, { prop: 1 }]));
  consono(
    new Map([
      ["first", "a"],
      [true, "b"],
    ]),
  );
  consono(new WeakMap());
  consono(new WeakSet());
  //#endregion

  //#region Structured data
  consono(new ArrayBuffer(8));
  consono(new SharedArrayBuffer(16));
  //#endregion

  //#region Control abstraction objects
  consono(new Promise(() => {}));
  consono(async function helloWorld() {});
  consono(async () => {});
  consono(function* gen() {
    yield 1;
  });
  const GeneratorFunction = Object.getPrototypeOf(function*() {}).constructor;
  const generatorFunction = new GeneratorFunction("a", "yield a * 2");
  const iterator = generatorFunction(10);
  consono(generatorFunction);
  consono(iterator);
  //#endregion

  //#region Reflection
  consono(new Proxy({}, () => {}));
  //#endregion

  //#region Other
  (function(a, b) {
    consono(arguments);
  })(true, false);
  consono(new Map([["key", "value"]]).entries());
  consono(new Set(["a", "b"]).entries());
  //#endregion

  it("should not crash on call", () => {
    const log = jest.spyOn(console, "log").mockImplementation((any) => any);
    consono(true);
    expect(log).toHaveBeenCalled();
  });
});
