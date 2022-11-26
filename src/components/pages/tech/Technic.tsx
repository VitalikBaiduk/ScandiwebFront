import React, { Component } from "react";
import { graphql } from "@apollo/client/react/hoc";
import { ProductCardWrapper, Title, Wrapper } from "../../../styles/global";
import ProductCard from "../../productCard/ProductCard";
import { getTechnic } from "../../../api/getTechnic";

class Technic extends Component<any, {}> {
  render(): React.ReactNode {
    const { products } = this.props.data.category;

    return (
      <Wrapper>
        <Title>Technic</Title>
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

export default graphql(getTechnic)(Technic);
