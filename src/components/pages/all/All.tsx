import React, { Component } from "react";
import { graphql } from "@apollo/client/react/hoc";
import ProductCard from "../../productCard/ProductCard";
import { ProductCardWrapper, Title, Wrapper } from "../../../styles/global";
import { getAllItem } from "../../../api/getAll";

class All extends Component<any, {}> {
  render(): React.ReactNode {
    const { products } = this.props.data.category
      ? this.props.data.category
      : { products: [] };

    return (
      <Wrapper>
        <Title>All</Title>
        <ProductCardWrapper>
          {products.length &&
            products.map((el: any) => {
              return (
                <ProductCard
                  key={el.id}
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
