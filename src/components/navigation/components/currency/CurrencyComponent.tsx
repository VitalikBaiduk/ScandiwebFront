import { graphql, MutateProps } from "@apollo/client/react/hoc";
import React, { Component, ComponentType } from "react";
import { DataProps } from "react-apollo";
import { connect } from "react-redux";
import { getCurrencies } from "../../../../api/getCurrencies";
import { changeCartOvelayStatus } from "../../../../state/actions/changeCartOvelayStatus";
import { changeCurrency } from "../../../../state/actions/changeCurrency";
import { Currency, StyledArrowIcon, WrapperCurrency } from "../../styles";

class CurrencyComponent extends Component<any, any> {
  state = {
    arrowActive: false,
  };

  render(): React.ReactNode {
    const { currency } = this.props;
    const { arrowActive } = this.state;

    return (
      <WrapperCurrency
        onClick={() => this.setState({ arrowActive: !arrowActive })}
      >
        <Currency>{currency.currency}</Currency>
        <StyledArrowIcon className={arrowActive ? "active" : ""} />
      </WrapperCurrency>
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

const CurrencyContainer = connect(
  mapStateToProps,
  mapDispatchToProps()
)(CurrencyComponent);

export default graphql(getCurrencies)(
  CurrencyContainer as ComponentType<
    Partial<DataProps<{}, {}>> & Partial<MutateProps<{}, {}>>
  >
);
