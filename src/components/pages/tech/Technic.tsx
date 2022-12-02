import React, { Component } from "react";
import { graphql } from "@apollo/client/react/hoc";
import { ProductCardWrapper, Title, Wrapper } from "../../../styles/global";
import ProductCard from "../../productCard/ProductCard";
import { getTechnic } from "../../../api/getTechnic";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CardWrapper = styled(Link)`
  width: 100%;
  text-decoration: none;
`;

class Technic extends Component<any, {}> {
  render(): React.ReactNode {
    const { products } = this.props.data.category
      ? this.props.data.category
      : { products: [] };

    return (
      <Wrapper>
        <Title>Technic</Title>
        <ProductCardWrapper>
          {products.length &&
            products.map((el: any) => {
              return (
                <CardWrapper key={el.id} to={`proguct/${el.id}`}>
                  <ProductCard
                    key={el.id}
                    imageUrl={el.gallery[0] ? el.gallery[0] : ""}
                    name={el.name}
                    price={el.prices[0].currency.symbol + el.prices[0].amount}
                  />
                </CardWrapper>
              );
            })}
        </ProductCardWrapper>
      </Wrapper>
    );
  }
}

export default graphql(getTechnic)(Technic);
