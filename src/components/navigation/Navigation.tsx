import React, { Component } from "react";
import { ReactComponent as BrandIcon } from "../../assets/BrandIcon.svg";
import { ReactComponent as Bin } from "../../assets/Bin.svg";
import CurrencyModal from "./currencyModal/CurrencyModal";
import {
  ActionsBlock,
  Currency,
  NavigationLabels,
  StyledArrowIcon,
  Wrapper,
  WrapperCurrency,
  WrapperNavigationLabels,
} from "./styles";
import { NavigationStateType } from "../../types/types";

class Navigation extends Component<any, NavigationStateType> {
  state = {
    arrowActive: false,
    currency: "$",
  };

  render(): React.ReactNode {
    const { arrowActive, currency } = this.state;

    const labelsArr = [
      { name: "all", path: "/all" },
      { name: "clothes", path: "/clothes" },
      { name: "technic", path: "/tech" },
    ];

    const setCurrency = (currencySign: string) => {
      this.setState({ arrowActive: false, currency: currencySign });
    };

    const mouseLeaveHandler = () => {
      this.setState({ arrowActive: false });
    };

    return (
      <Wrapper>
        <WrapperNavigationLabels>
          {labelsArr.map((el, index) => {
            return (
              <NavigationLabels to={el.path} key={index}>
                {el.name}
              </NavigationLabels>
            );
          })}
        </WrapperNavigationLabels>
        <BrandIcon />
        <ActionsBlock>
          <WrapperCurrency
            onMouseEnter={() => {
              this.setState({ arrowActive: !arrowActive });
            }}
          >
            <Currency>{currency}</Currency>
            <StyledArrowIcon className={arrowActive ? "active" : ""} />
          </WrapperCurrency>
          <Bin />
          {arrowActive && (
            <CurrencyModal
              mouseLeaveHandler={mouseLeaveHandler}
              setCurrency={setCurrency}
            />
          )}
        </ActionsBlock>
      </Wrapper>
    );
  }
}

export default Navigation;
