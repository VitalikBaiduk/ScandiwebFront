import React, { Component } from "react";
import styled from "styled-components";
import { ReactComponent as BrandIcon } from "../../assets/BrandIcon.svg";
import { ReactComponent as Bin } from "../../assets/Bin.svg";
import { ReactComponent as Arrow } from "../../assets/arrow.svg";
import CurrencyModal from "./currencyModal/CurrencyModal";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const WrapperNavigationLabels = styled.div`
  width: 100%;
  max-width: 240px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavigationLabels = styled.p`
  position: relative;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 120%;
  color: #1d1f22;
  cursor: pointer;
  transition: width 0.35s;
  &::after {
    content: "";
    position: absolute;
    background: #5ece7b;
    left: -23%;
    bottom: -35px;
    width: 0;
    height: 2px;
    transition: width 0.35s;
  }
  &:hover {
    font-weight: 600;
    color: #5ece7b;
    &::after {
      width: 150%;
    }
  }
`;

const ActionsBlock = styled.div`
  position: relative;
  width: 100%;
  max-width: 220px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const WrapperCurrency = styled.div`
  display: flex;
  align-items: flex-end;
  cursor: pointer;
  margin-right: 20px;
`;

const Currency = styled.p`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 100%;
  color: #1d1f22;
  margin-right: 10px;
`;

const StyledArrowIcon = styled(Arrow)`
  margin-bottom: 3px;
  transition: all 0.3s ease-in-out;
  &.active {
    transform: rotate(180deg);
  }
`;

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

    const labelsArr = ["all", "clothes", "tech"];

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
            return <NavigationLabels>{el.toUpperCase()}</NavigationLabels>;
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
