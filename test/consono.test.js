const consono = require("../src/consono.js").default;

describe("Main test", () => {
  const options = {
    colorize: false,
    console: false,
  };
  it("Booleans", () => {
    expect(consono(true, options)).toStrictEqual("boolean • true");
    expect(consono(false, options)).toStrictEqual("boolean • false");
  });
  it("Strings", () => {
    expect(consono("Hello", options)).toStrictEqual(`string • "Hello" (length=5)`);
  });
});
