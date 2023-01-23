import React, { Component, ComponentType } from "react";
import { graphql, MutateProps } from "@apollo/client/react/hoc";
import ProductCard from "../product/components/productCard/ProductCard";
import { ProductCardWrapper, Title, Wrapper } from "../../../styles/global";
import { getAllItem } from "../../../api/getAll";
import {
  ExtraCardWrapper,
  LinkCardWrapper,
  OutOfStockText,
  OutOfStockWrapper,
} from "../product/components/productCard/styles";
import { connect } from "react-redux";
import { DataProps } from "react-apollo";
import { StyledCartIcon } from "../product/styles";
import { getCorrectPrice } from "../../../utils/priceHandler";
import { PriceItem } from "../../../types/types";

class All extends Component<any, {}> {
  render(): React.ReactNode {
    const { products, name } = this.props.data.category
      ? this.props.data.category
      : {
          name: "",
          products: [],
        };

    const actualCurrency = localStorage.getItem("currency");

    return (
      <Wrapper>
        <Title>{name}</Title>
        <ProductCardWrapper>
          {products.length &&
            products.map((el: any) => {
              const price = el.prices.find(
                (priceItem: PriceItem) =>
                  actualCurrency === priceItem.currency.symbol
              );

              return (
                <ExtraCardWrapper key={el.id}>
                  <LinkCardWrapper to={`proguct/${el.id}`}>
                    <ProductCard
                      imageUrl={el.gallery[0] ? el.gallery[0] : ""}
                      name={el.name}
                      price={
                        price.currency.symbol + getCorrectPrice(price.amount)
                      }
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

const AllPageContainer = connect(mapStateToProps, {})(All);
export default graphql(getAllItem)(
  AllPageContainer as ComponentType<
    Partial<DataProps<{}, {}>> & Partial<MutateProps<{}, {}>>
  >
);
