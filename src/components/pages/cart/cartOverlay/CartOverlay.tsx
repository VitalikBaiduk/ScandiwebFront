import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { changeCartOvelayStatus } from "../../../../state/actions/changeCartOvelayStatus";
import {
  changeFirstTotalPrice,
  increasetTotalPrice,
  reduceTotalPrice,
} from "../../../../state/actions/changePrices";
import {
  productCount,
  removeProduct,
} from "../../../../state/actions/handleProdutInCart";
import { ProductDataWithActiveAttr } from "../../../../types/types";
import ProductForCart from "../../../product/components/productForCart/ProductForCart";

export const Wrapper = styled.div`
  position: absolute;
  top: 65px;
  right: -15px;
  width: 100%;
  max-width: 330px;
  max-height: 680px;
  background-color: white;
  box-sizing: border-box;
  padding: 30px 16px;
  z-index: 99999999999;
`;

export const Title = styled.span`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 160%;
  color: #1d1f22;
`;

export const ProductCount = styled.span`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 160%;
  color: #1d1f22;
`;

export const ProductWrapper = styled.div`
  width: 100%;
  max-height: 370px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

export const TotalPriceBlock = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
`;

export const StyledText = styled.span`
  font-family: "Roboto Condensed";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
  color: #1d1f22;
`;

export const Price = styled.span`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 160%;
  color: #1d1f22;
`;

export const ButtonBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;

const ButtonText = styled(Link)<{
  border: string;
  background: string;
  padding: string;
}>`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 120%;
  text-transform: uppercase;
  text-decoration: none;
  border: ${(props: any) => props.border};
  background-color: ${(props: any) => props.background};
  color: ${(props: any) => props.color};
  box-sizing: border-box;
  padding: ${(props: any) => props.padding};
`;

export class CartOverlay extends Component<any, any> {
  componentDidMount(): void {
    this.props.changeFirstTotalPrice(
      this.props.cartReducer.data,
      this.props.currency.currency
    );
  }
  componentDidUpdate(
    prevProps: Readonly<any>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    if (prevProps.currency.currency !== this.props.currency.currency) {
      this.props.changeFirstTotalPrice(
        this.props.cartReducer.data,
        this.props.currency.currency
      );
    } else if (
      this.props.cartReducer.data.length !== prevProps.cartReducer.data.length
    ) {
      this.props.changeFirstTotalPrice(
        this.props.cartReducer.data,
        this.props.currency.currency
      );
    }
  }

  render(): React.ReactNode {
    const {
      cartReducer,
      currency,
      removeProduct,
      productCount,
      increasetTotalPrice,
      reduceTotalPrice,
      changeCartOvelayStatus,
    } = this.props;

    const products = cartReducer.data;

    const getTotalPrice = (price: number, inc: boolean, decr: boolean) => {
      inc && increasetTotalPrice(price);
      decr && reduceTotalPrice(price);
    };

    return (
      <Wrapper>
        <Title>
          My Bag, <ProductCount>{products.length} items</ProductCount>
        </Title>
        <ProductWrapper>
          {products.length !== 0 &&
            products.map((el: ProductDataWithActiveAttr, index: number) => {
              return (
                <ProductForCart
                  key={index}
                  attributes={el.attributes}
                  brand={el.brand}
                  gallery={el.gallery}
                  name={el.name}
                  prices={el.prices}
                  __typename={el.__typename}
                  currency={currency}
                  removeProduct={removeProduct}
                  getTotalPrice={getTotalPrice}
                  updatedPrices={cartReducer.updatedPrices}
                  attributeState={el.activeAttebutes}
                  className={"overlay"}
                  getProductCount={productCount}
                  productCount={el.count}
                />
              );
            })}
        </ProductWrapper>
        <TotalPriceBlock>
          <StyledText>Total:</StyledText>
          <Price>{currency.currency + cartReducer.totalPrice}</Price>
        </TotalPriceBlock>
        <ButtonBlock>
          <ButtonText
            padding={"12px 35px"}
            to={"/cart"}
            border={"1px solid #1D1F22"}
            background={"#FFFFFF"}
            color={"#1d1f22"}
            onClick={() => changeCartOvelayStatus(false)}
          >
            View bag
          </ButtonText>
          <ButtonText
            padding={"13px 36px"}
            to={""}
            border={"none"}
            background={"#5ECE7B"}
            color={"#FFFFFF"}
          >
            CHECK OUT
          </ButtonText>
        </ButtonBlock>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    currency: state.currency,
    cartReducer: state.cartReducer,
  };
};

const mapDispatchToProps = () => {
  return {
    removeProduct,
    increasetTotalPrice,
    reduceTotalPrice,
    productCount,
    changeFirstTotalPrice,
    changeCartOvelayStatus,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(CartOverlay);
