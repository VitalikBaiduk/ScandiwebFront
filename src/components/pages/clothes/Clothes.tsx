import React, { Component, ComponentType } from "react";
import { DataProps, graphql, MutateProps } from "@apollo/client/react/hoc";
import { ProductCardWrapper, Title, Wrapper } from "../../../styles/global";
import { getClothesItem } from "../../../api/getClothes";
import ProductCard from "../product/components/productCard/ProductCard";
import {
  ExtraCardWrapper,
  LinkCardWrapper,
  OutOfStockText,
  OutOfStockWrapper,
} from "../product/components/productCard/styles";
import { connect } from "react-redux";
import { StyledCartIcon } from "../product/styles";

class Clothes extends Component<any, {}> {
  render(): React.ReactNode {
    const { products, name } = this.props.data.category
      ? this.props.data.category
      : { name: "", products: [] };

    const stateCurrency = this.props.currency.currency;

    return (
      <Wrapper>
        <Title>{name}</Title>
        <ProductCardWrapper>
          {products.length &&
            products.map((el: any) => {
              const price = el.prices.find((priceItem: any) => {
                return stateCurrency === priceItem.currency.symbol;
              });
              return (
                <ExtraCardWrapper key={el.id}>
                  <LinkCardWrapper to={`proguct/${el.id}`}>
                    <ProductCard
                      imageUrl={el.gallery[0] ? el.gallery[0] : ""}
                      name={el.name}
                      price={price.currency.symbol + price.amount}
                    />
                    {!el.inStock && (
                      <OutOfStockWrapper>
                        <OutOfStockText>OUT OF STOCK</OutOfStockText>
                      </OutOfStockWrapper>
                    )}
                  </LinkCardWrapper>
                  <StyledCartIcon />
                </ExtraCardWrapper>
              );
            })}
        </ProductCardWrapper>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    currency: state.currency,
  };
};

const ClothesPageContainer = connect(mapStateToProps, {})(Clothes);
export default graphql(getClothesItem)(
  ClothesPageContainer as ComponentType<
    Partial<DataProps<{}, {}>> & Partial<MutateProps<{}, {}>>
  >
);
