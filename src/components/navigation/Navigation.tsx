import React, { Component, ComponentType } from "react";
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
import { changeCurrency } from "../../state/actions/changeCurrency";
import { connect } from "react-redux";
import { graphql, MutateProps } from "@apollo/client/react/hoc";
import { getCurrencies } from "../../api/getCurrencies";
import { DataProps } from "react-apollo";

class Navigation extends Component<any, NavigationStateType> {
  state = {
    arrowActive: false,
  };

  render(): React.ReactNode {
    const { arrowActive } = this.state;

    const labelsArr = [
      { name: "all", path: "/all" },
      { name: "clothes", path: "/clothes" },
      { name: "technic", path: "/tech" },
    ];

    const setCurrency = (currencySign: string) => {
      this.props.changeCurrency(currencySign);
      this.setState({ arrowActive: false });
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
            <Currency>{this.props.currency.currency}</Currency>
            <StyledArrowIcon className={arrowActive ? "active" : ""} />
          </WrapperCurrency>
          <Bin />
          {arrowActive && (
            <CurrencyModal
              mouseLeaveHandler={mouseLeaveHandler}
              setCurrency={setCurrency}
              currenciesList={this.props.data.currencies}
            />
          )}
        </ActionsBlock>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    currency: state.currency,
  };
};

const mapDispatchToProps = () => {
  return {
    changeCurrency,
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
