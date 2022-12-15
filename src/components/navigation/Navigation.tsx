import React, { Component, ComponentType } from "react";
import { ReactComponent as BrandIcon } from "../../assets/BrandIcon.svg";
import { ReactComponent as Bin } from "../../assets/Bin.svg";
import CurrencyModal from "./currencyModal/CurrencyModal";
import {
  ActionsBlock,
  BinWrapper,
  CountOfElemInBin,
  Currency,
  NavigationLabels,
  StyledArrowIcon,
  Wrapper,
  WrapperCurrency,
  WrapperNavigationLabels,
} from "./styles";
import { NavigationStateType } from "../../types/types";
import { changeCurrency } from "../../state/actions/changeCurrency";
import { connect } from "react-redux";
import { graphql, MutateProps } from "@apollo/client/react/hoc";
import { getCurrencies } from "../../api/getCurrencies";
import { DataProps } from "react-apollo";
import { changeCartOvelayStatus } from "../../state/actions/changeCartOvelayStatus";
import CartOverlay from "../pages/сart/cartOverlay/CartOverlay";

class Navigation extends Component<any, NavigationStateType> {
  state = {
    arrowActive: false,
    activeCartOverlay: false,
  };

  render(): React.ReactNode {
    const { arrowActive, activeCartOverlay } = this.state;
    const {
      changeCurrency,
      currency,
      cartReducer,
      data,
      changeCartOvelayStatus,
      globalStateReducer,
    } = this.props;

    const labelsArr = [
      { name: "all", path: "/all" },
      { name: "clothes", path: "/clothes" },
      { name: "technic", path: "/tech" },
    ];

    const setCurrency = (currencySign: string) => {
      changeCurrency(currencySign);
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
            onClick={() => this.setState({ arrowActive: !arrowActive })}
          >
            <Currency>{currency.currency}</Currency>
            <StyledArrowIcon className={arrowActive ? "active" : ""} />
          </WrapperCurrency>
          <BinWrapper
            onClick={() => {
              this.setState({ activeCartOverlay: !activeCartOverlay });
              changeCartOvelayStatus(!activeCartOverlay);
            }}
          >
            <Bin />
            {cartReducer.length > 0 && (
              <CountOfElemInBin>{cartReducer.length}</CountOfElemInBin>
            )}
          </BinWrapper>
          {arrowActive && (
            <CurrencyModal
              setCurrency={setCurrency}
              currenciesList={data.currencies}
            />
          )}
        </ActionsBlock>
        {globalStateReducer.isOpenCartOverlay && <CartOverlay />}
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    currency: state.currency,
    cartReducer: state.cartReducer.data,
    globalStateReducer: state.globalStateReducer,
  };
};

const mapDispatchToProps = () => {
  return {
    changeCurrency,
    changeCartOvelayStatus,
  };
};

const NavigationContainer = connect(
  mapStateToProps,
  mapDispatchToProps()
)(Navigation);

export default graphql(getCurrencies)(
  NavigationContainer as ComponentType<
    Partial<DataProps<{}, {}>> & Partial<MutateProps<{}, {}>>
  >
);
