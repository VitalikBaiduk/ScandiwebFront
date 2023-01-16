import React, { Component } from "react";
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
    const { setCurrency, currenciesList } = this.props;
    return (
      <Wrapper>
        {currenciesList.map((el: CurrencyItemType, index) => {
          return (
            <CurrencyItem
              key={index}
              onClick={() => {
                setCurrency(el.symbol);
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

export default CurrencyModal;
