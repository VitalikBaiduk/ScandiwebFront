import React, { Component, ComponentType } from "react";
import { ReactComponent as BrandIcon } from "../../assets/BrandIcon.svg";
import { ReactComponent as Bin } from "../../assets/Bin.svg";
import {
  ActionsBlock,
  BinWrapper,
  CountOfElemInBin,
  CurrencyComponentWrapper,
  NavigationLabels,
  Wrapper,
  WrapperNavigationLabels,
} from "./styles";
import {
  NavigationStateType,
  NavigationType,
  ProductDataWithActiveAttr,
} from "../../types/types";
import { changeCurrency } from "../../state/actions/changeCurrency";
import { connect } from "react-redux";
import { graphql, MutateProps } from "@apollo/client/react/hoc";
import { DataProps } from "react-apollo";
import { changeCartOvelayStatus } from "../../state/actions/changeCartOvelayStatus";
import CartOverlay from "../pages/сart/cartOverlay/CartOverlay";
import CurrencyComponent from "./components/currency/CurrencyComponent";
import { getCategories } from "../../api/getCategories";
import CurrencyModalContainer from "./components/currency/CurrencyModal";
class Navigation extends Component<any, NavigationStateType> {
  state = {
    arrowActive: false,
    activeCartOverlay: false,
  };

  render(): React.ReactNode {
    const { arrowActive, activeCartOverlay } = this.state;
    const {
      changeCurrency,
      cartReducer,
      data,
      changeCartOvelayStatus,
      globalStateReducer,
      currency,
    } = this.props;

    const navigationData = data.categories;

    const setCurrency = (currencySign: string) => {
      changeCurrency(currencySign);
      this.setState({ arrowActive: false });
    };

    const products = localStorage.getItem("productArr")
      ? JSON.parse(localStorage.getItem("productArr")!)
      : cartReducer;

    let quantity = 0;

    products.map((el: ProductDataWithActiveAttr) =>
      el.count ? (quantity += el.count) : (quantity += 1)
    );

    return (
      <Wrapper>
        <WrapperNavigationLabels>
          {navigationData &&
            navigationData.map((el: NavigationType, index: number) => {
              return (
                <NavigationLabels to={el.name} key={index}>
                  {el.name}
                </NavigationLabels>
              );
            })}
        </WrapperNavigationLabels>
        <BrandIcon />
        <ActionsBlock>
          <CurrencyComponentWrapper
            onClick={() => this.setState({ arrowActive: !arrowActive })}
          >
            <CurrencyComponent />
          </CurrencyComponentWrapper>
          <BinWrapper
            onClick={() => {
              this.setState({ activeCartOverlay: !activeCartOverlay });
              changeCartOvelayStatus(!activeCartOverlay);
            }}
          >
            <Bin />
            {quantity > 0 && <CountOfElemInBin>{quantity}</CountOfElemInBin>}
          </BinWrapper>
          {arrowActive && (
            <CurrencyModalContainer
              setCurrency={setCurrency}
              currenciesList={currency.currencies ? currency.currencies : []}
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

export default graphql(getCategories)(
  NavigationContainer as ComponentType<
    Partial<DataProps<{}, {}>> & Partial<MutateProps<{}, {}>>
  >
);
