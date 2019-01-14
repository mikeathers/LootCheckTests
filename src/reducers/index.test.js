import rootReducer from "./index";

describe("rootReducer", () => {
  it("should initialize the default state", () => {
    expect(rootReducer({}, {})).toEqual({ balance: 0, bitcoin: {} });
  });
});
