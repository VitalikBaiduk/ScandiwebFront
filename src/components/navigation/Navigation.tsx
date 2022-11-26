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

interface NavigationPropsType {}

interface NavigationStateType {
  arrowActive: boolean;
  currency: string;
}

class Navigation extends Component<NavigationPropsType, NavigationStateType> {
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
          {labelsArr.map((el) => {
            return (
              <NavigationLabels to={el.path}>
                {el.name.toUpperCase()}
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
