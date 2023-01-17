import React, { Component } from "react";
import { connect } from "react-redux";
import {
  makeOrder,
  productCount,
  removeProduct,
} from "../../../state/actions/handleProdutInCart";
import {
  changeFirstTotalPrice,
  increasetTotalPrice,
  reduceTotalPrice,
} from "../../../state/actions/changePrices";
import ProductForCart from "../product/components/productForCart/ProductForCart";
import { ProductDataWithActiveAttr } from "../../../types/types";
import { Title } from "../../../styles/global";
import {
  BlockForEmptyBin,
  EmptyText,
  OrderButton,
  ProductWrapper,
  StyledIcon,
  SuccessOrderBlock,
  SuccessOrderModal,
  SuccessOrderText,
  ToShoppingLink,
  TotalBlockKey,
  TotalBlockValue,
  TotalKey,
  TotalPriceBlock,
  TotalValue,
  Wrapper,
} from "./styles";

class Cart extends Component<any, {}> {
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
  state = {
    order: false,
  };

  render(): React.ReactNode {
    const {
      cartReducer,
      currency,
      increasetTotalPrice,
      reduceTotalPrice,
      removeProduct,
      productCount,
      makeOrder,
    } = this.props;

    const products = cartReducer.data;
    const stateCurrency = currency.currency;

    let quantity = 0;
    products.map((el: any) =>
      el.count ? (quantity += el.count) : (quantity += 1)
    );

    const getTotalPrice = (price: number, inc: boolean, decr: boolean) => {
      inc && increasetTotalPrice(price);
      decr && reduceTotalPrice(price);
    };

    return (
      <Wrapper>
        <Title>Cart</Title>
        {products && products.length ? (
          products.map((el: ProductDataWithActiveAttr, index: number) => {
            return (
              <ProductWrapper key={index}>
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
                  getProductCount={productCount}
                  productCount={el.count}
                  id={el.id}
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
        {products && products.length !== 0 && (
          <TotalPriceBlock>
            <TotalBlockKey>
              Tax 21%:
              <TotalBlockValue>
                {" " + stateCurrency + cartReducer.tax.toFixed(2)}
              </TotalBlockValue>
            </TotalBlockKey>
            <TotalBlockKey>
              Quantity: <TotalBlockValue>{quantity}</TotalBlockValue>
            </TotalBlockKey>
            <TotalKey>
              Total:{" "}
              <TotalValue>{stateCurrency + cartReducer.totalPrice}</TotalValue>
            </TotalKey>
            <OrderButton
              onClick={() => {
                this.setState({ order: true });
                makeOrder();
              }}
            >
              ORDER
            </OrderButton>
          </TotalPriceBlock>
        )}
        {this.state.order && (
          <SuccessOrderBlock onClick={() => this.setState({ order: false })}>
            <SuccessOrderModal>
              <StyledIcon />
              <SuccessOrderText>The order was completed</SuccessOrderText>
            </SuccessOrderModal>
          </SuccessOrderBlock>
        )}
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

const mapDuspatchToProps = () => {
  return {
    removeProduct,
    changeFirstTotalPrice,
    increasetTotalPrice,
    reduceTotalPrice,
    productCount,
    makeOrder,
  };
};

export default connect(mapStateToProps, mapDuspatchToProps())(Cart);
