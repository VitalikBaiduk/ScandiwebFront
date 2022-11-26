import { gql } from "@apollo/client/core";
import React, { Component } from "react";
import { graphql } from "@apollo/client/react/hoc";
import styled from "styled-components";
import ProductCard from "../../productCard/ProductCard";

const getAllItem = gql`
  {
    category(input: { title: "all" }) {
      name
      products {
        id
        name
        gallery
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 42px;
  line-height: 160%;
  color: #1d1f22;
  margin-bottom: 50px;
`;

const ProductCardWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  gap: 100px 40px;
`;

interface AllProps {
  category?: any;
}

class All extends Component<any, {}> {
  render(): React.ReactNode {
    const { products } = this.props.data.category
      ? this.props.data.category
      : "";

    return (
      <Wrapper>
        <Title>All</Title>
        <ProductCardWrapper>
          {products.map((el: any) => {
            return (
              <ProductCard
                imageUrl={el.gallery[0] ? el.gallery[0] : ""}
                name={el.name}
                price={el.prices[0].currency.symbol + el.prices[0].amount}
              />
            );
          })}
        </ProductCardWrapper>
      </Wrapper>
    );
  }
}

export default graphql(getAllItem)(All);
