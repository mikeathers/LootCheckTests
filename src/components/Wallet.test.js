import React from "react";
import { shallow } from "enzyme";
import { Wallet } from "./Wallet";

describe("Wallet", () => {
  const mockDeposit = jest.fn();
  const mockWithdraw = jest.fn();
  const props = { balance: 20, deposit: mockDeposit, withdraw: mockWithdraw };
  const wallet = shallow(<Wallet {...props} />);

  it("should render correctly", () => {
    expect(wallet).toMatchSnapshot();
  });

  it("should display the balance from props", () => {
    expect(wallet.find(".balance").text()).toEqual("Wallet Balance: 20");
  });

  it("should create an input to deposit into or withdraw from the balance", () => {
    expect(wallet.find(".input-wallet").exists()).toBe(true);
  });

  describe("when the user types into the input", () => {
    const userBalance = "25";

    beforeEach(() => {
      wallet
        .find(".input-wallet")
        .simulate("change", { target: { value: userBalance } });
    });

    it("should update the local wallet balance in `state` and converts it to a number", () => {
      expect(wallet.state().balance).toEqual(parseInt(userBalance, 10));
    });

    describe("and the user wants to make a deposit", () => {
      beforeEach(() => {
        wallet.find(".btn-deposit").simulate("click");
      });

      it("should dispatch the `deposit()` it recieves from props with the local balance", () => {
        expect(mockDeposit).toHaveBeenCalledWith(parseInt(userBalance, 10));
      });
    });

    describe("and the user wants to make a withdrawal", () => {
      beforeEach(() => wallet.find(".btn-withdraw").simulate("click"));

      it("should dispatch the `withdraw()` it receives from props with the local balance", () => {
        expect(mockWithdraw).toHaveBeenCalledWith(parseInt(userBalance, 10));
      });
    });
  });
});
