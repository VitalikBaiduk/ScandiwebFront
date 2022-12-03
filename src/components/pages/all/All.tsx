import React, { Component, ComponentType } from "react";
import { graphql, MutateProps } from "@apollo/client/react/hoc";
import ProductCard from "../../productCard/ProductCard";
import { ProductCardWrapper, Title, Wrapper } from "../../../styles/global";
import { getAllItem } from "../../../api/getAll";
import { ExtraCardWrapper } from "../../productCard/styles";
import { connect } from "react-redux";
import { DataProps } from "react-apollo";

class All extends Component<any, {}> {
  render(): React.ReactNode {
    const { products } = this.props.data.category
      ? this.props.data.category
      : {
          products: [],
        };

    const stateCurrency = this.props.currency.currency;

    return (
      <Wrapper>
        <Title>All</Title>
        <ProductCardWrapper>
          {products.length &&
            products.map((el: any) => {
              const price = el.prices.find((priceItem: any) => {
                return stateCurrency === priceItem.currency.symbol;
              });
              return (
                <ExtraCardWrapper key={el.id} to={`proguct/${el.id}`}>
                  <ProductCard
                    key={el.id}
                    imageUrl={el.gallery[0] ? el.gallery[0] : ""}
                    name={el.name}
                    price={price.currency.symbol + price.amount}
                  />
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
