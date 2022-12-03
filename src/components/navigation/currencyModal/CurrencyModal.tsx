import React, { Component } from "react";
import styled from "styled-components";
import {
  CurrencyModalProps,
  CurrencyModalStateType,
  CurrencyItemType,
} from "../../../types/types";

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  max-width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 25px;
  left: 112px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  background-color: #ffffffff;
`;

const CurrencyItem = styled.span`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px 0;
  transition: 0.2s linear;
  cursor: pointer;
  &:hover {
    background-color: #eeeeee;
  }
  &.active {
    background-color: #eeeeee;
  }
`;

class CurrencyModal extends Component<
  CurrencyModalProps,
  CurrencyModalStateType
> {
  state = {
    arrowActive: false,
  };

  render(): React.ReactNode {
    const { setCurrency, mouseLeaveHandler, currenciesList } = this.props;
    return (
      <Wrapper onMouseLeave={mouseLeaveHandler}>
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
