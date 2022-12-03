import React, { Component } from "react";
import { graphql } from "@apollo/client/react/hoc";
import { ProductCardWrapper, Title, Wrapper } from "../../../styles/global";
import { getClothesItem } from "../../../api/getClothes";
import ProductCard from "../../productCard/ProductCard";
import { ExtraCardWrapper } from "../../productCard/styles";

class Clothes extends Component<any, {}> {
  render(): React.ReactNode {
    const { products } = this.props.data.category
      ? this.props.data.category
      : { products: [] };

    return (
      <Wrapper>
        <Title>Clothes</Title>
        <ProductCardWrapper>
          {products.length &&
            products.map((el: any) => {
              return (
                <ExtraCardWrapper key={el.id} to={`proguct/${el.id}`}>
                  <ProductCard
                    imageUrl={el.gallery[0] ? el.gallery[0] : ""}
                    name={el.name}
                    price={el.prices[0].currency.symbol + el.prices[0].amount}
                  />
                </ExtraCardWrapper>
              );
            })}
        </ProductCardWrapper>
      </Wrapper>
    );
  }
}

export default graphql(getClothesItem)(Clothes);
