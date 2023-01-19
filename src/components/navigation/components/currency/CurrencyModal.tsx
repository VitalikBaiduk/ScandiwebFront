import React, { Component } from "react";
import { connect } from "react-redux";
import { setTotalPrice } from "../../../../state/actions/setTotalPrice";
import {
  CurrencyModalProps,
  CurrencyModalStateType,
  CurrencyItemType,
} from "../../../../types/types";
import { Wrapper } from "./styles";
import { CurrencyItem } from "./styles";

class CurrencyModal extends Component<
  CurrencyModalProps,
  CurrencyModalStateType
> {
  state = {
    arrowActive: false,
  };

  render(): React.ReactNode {
    const { setCurrency, currenciesList, setTotalPrice } = this.props;
    return (
      <Wrapper>
        {currenciesList.map((el: CurrencyItemType, index) => {
          return (
            <CurrencyItem
              key={index}
              onClick={() => {
                setCurrency(el.symbol);
                setTotalPrice(el.symbol);
                localStorage.setItem("currency", el.symbol);
              }}
            >
              {el.symbol + " " + el.label}
            </CurrencyItem>
          );
        })}
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = () => {
  return {
    setTotalPrice,
  };
};

const CurrencyModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps()
)(CurrencyModal);

export default CurrencyModalContainer;
