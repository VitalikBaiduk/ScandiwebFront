import React, { Component } from "react";
import styled from "styled-components";
import {
  CurrencyModalProps,
  CurrencyModalStateType,
} from "../../../types/types";

const Wrapper = styled.div`
  position: absolute;
  max-width: 115px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 25px;
  left: 121px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  background-color: #ffffffff;
`;

const CurrencyItem = styled.span`
  padding: 10px 20px;
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
    const { setCurrency, mouseLeaveHandler } = this.props;

    const currencyArr = ["$ USD", "€ EUR", "¥ JPY"];

    return (
      <Wrapper onMouseLeave={mouseLeaveHandler}>
        {currencyArr.map((el, index) => {
          return (
            <CurrencyItem
              key={index}
              onClick={() => {
                setCurrency(el[0]);
              }}
            >
              {el}
            </CurrencyItem>
          );
        })}
      </Wrapper>
    );
  }
}

export default CurrencyModal;
