import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { removeProduct } from "../../../state/actions/addProdutToCart";
import { ProductData } from "../../../types/types";
import ProductForCart from "../../product/components/productForCart/ProductForCart";

const Wrapper = styled.div`
  width: 100%;
  margin-top: 110px;
`;

const Title = styled.p`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  text-transform: uppercase;
  color: #1d1f22;
`;

const ProductWrapper = styled.div`
  width: 100%;
  border-top: 1px solid #e5e5e5;
  box-sizing: border-box;
  padding-top: 25px;
  margin-top: 25px;
  &:first-child {
    margin-top: 55px;
  }
`;

const BlockForEmptyBin = styled.div`
  /* width: 100%;
  height: 100%; */
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 150px auto;
`;

const EmptyText = styled.p`
  width: 100%;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 160%;
  color: #1d1f22;
  margin-bottom: 30px;
  text-align: center;
  &.inButton {
    color: #ffffff;
    margin-bottom: 0;
    line-height: 100%;
  }
`;

const ToShoppingLink = styled(Link)`
  background: #5ece7b;
  color: #ffffff;
  text-decoration: none;
  line-height: 100%;
  cursor: pointer;
  box-sizing: border-box;
  padding: 15px 10px;
  transition: 0.2s linear;
  &:hover {
    background-color: #4aa361;
  }
`;

class Cart extends Component<any, {}> {
  render(): React.ReactNode {
    // console.log(this.props.cartReducer);
    const products = this.props.cartReducer;
    // console.log(products);

    return (
      <Wrapper>
        <Title>Cart</Title>
        {products && products.length ? (
          products.map((el: ProductData) => {
            return (
              <ProductWrapper>
                <ProductForCart
                  attributes={el.attributes}
                  brand={el.brand}
                  gallery={el.gallery}
                  name={el.name}
                  prices={el.prices}
                  __typename={el.__typename}
                  currency={this.props.currency}
                  removeProduct={this.props.removeProduct}
                />
              </ProductWrapper>
            );
          })
        ) : (
          <BlockForEmptyBin>
            <EmptyText>The cart is empty</EmptyText>
            <ToShoppingLink to={"/all"}>
              <EmptyText className={"inButton"}>
                Go ahead to shopping!
              </EmptyText>
            </ToShoppingLink>
          </BlockForEmptyBin>
        )}
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    currency: state.currency,
    cartReducer: state.cartReducer.data,
  };
};

const mapDuspatchToProps = () => {
  return {
    removeProduct,
  };
};

export default connect(mapStateToProps, mapDuspatchToProps())(Cart);
