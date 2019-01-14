import React from "react";
import { shallow, mount } from "enzyme";

import { Loot } from "./Loot";

describe("Loot", () => {
  let props = { balance: 10, bitcoin: {} };
  let loot = shallow(<Loot {...props} />);
  it("should render correctly", () => {
    expect(loot).toMatchSnapshot();
  });

  describe("when mounted", () => {
    const fetchBitcoinMock = jest.fn();
    beforeEach(() => {
      props.fetchBitcoin = fetchBitcoinMock;
      loot = mount(<Loot {...props} />);
    });

    it("dispatches the `fetchBitcoin()` method it receives from props", () => {
      expect(fetchBitcoinMock).toHaveBeenCalled();
    });
  });

  describe("when there are valid bitcoin props", () => {
    beforeEach(() => {
      props = { balance: 10, bitcoin: { bpi: { USD: { rate: "1000" } } } };
      loot = shallow(<Loot {...props} />);
    });

    it("should display the correct bitcoin value", () => {
      expect(loot.find("h3").text()).toEqual("Bitcoin Balance: 0.01");
    });
  });
});
