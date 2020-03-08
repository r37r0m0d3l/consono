const { consono } = require("../dist/consono.cjs");

describe("calling and printing", () => {
  it("should call console.log() three times", () => {
    const log = jest.spyOn(console, "log").mockImplementation((any) => any);
    consono(true);
    consono(true, false);
    consono(true, true);
    consono(true, { console: true });
    consono(true, { console: false });
    expect(log).toHaveBeenCalled();
    expect(log.mock.calls.length).toBe(3);
  });
  it("should not exit on option", () => {
    const exit = jest.spyOn(process, "exit").mockImplementation((boolean) => boolean);
    consono(true, { exit: false });
    expect(exit).not.toHaveBeenCalled();
  });
  it("exit on option", () => {
    const exit = jest.spyOn(process, "exit").mockImplementation((number) => number);
    consono(true, { exit: true });
    expect(exit).toHaveBeenCalled();
  });
});
