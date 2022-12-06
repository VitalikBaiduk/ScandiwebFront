import React, { Component } from "react";
import styled from "styled-components";
import { ProductAttributeName } from "../../../../enums/ProductAttributeName";
import { ProductStateType } from "../../../../state/reducers/productReducer";
import {
  ProductAttributesItemsType,
  ProductAttributesType,
  ProductData,
} from "../../../../types/types";
import {
  AttributesBlock,
  AttributesItem,
  AttributesName,
  Brand,
  ColorAttributesItem,
  NameOfItem,
  PriceValue,
  WrapeprAttributesItem,
} from "../../styles";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledPriceValue = styled(PriceValue)`
  margin-top: 20px;
`;

const ImageBlock = styled.div`
  display: flex;
  /* align-items: center; */
`;

const QuantityBlock = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-right: 25px;
`;

const QuantityControllButtons = styled.div`
  position: relative;
  width: 45px;
  height: 45px;
  text-align: center;
  border: 1px solid #1d1f22;
  box-sizing: border-box;
  cursor: pointer;
`;

const HorizontalLine = styled.div`
  position: absolute;
  left: 33.33%;
  right: 33.33%;
  top: 50%;
  bottom: 50%;
  border-top: 1px solid #1d1f22;
`;

const VerticalLineForPlus = styled.div`
  position: absolute;
  left: 50%;
  right: 50%;
  top: 33.33%;
  bottom: 33.33%;
  border-left: 1px solid #1d1f22;
`;

const QuantityLabel = styled.p`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 160%;
  color: #1d1f22;
`;

const StyledImg = styled.img`
  max-width: 200px;
  object-fit: contain;
`;

interface ProductForCartProps extends ProductData {
  currency: any;
  removeProduct: (name: string) => void;
}

class ProductForCart extends Component<ProductForCartProps, any> {
  state = {
    quantity: 1,
  };

  render(): React.ReactNode {
    const stateCurrency = this.props.currency.currency;

    const currentPrice = this.props.prices.find((el: any) => {
      return stateCurrency === el.currency.symbol;
    });

    const finalPrice = currentPrice
      ? currentPrice.amount * this.state.quantity
      : "";
    console.log(this.props.gallery[0]);

    return (
      <Wrapper>
        <InfoBlock>
          <NameOfItem>{this.props.name}</NameOfItem>
          <Brand>{this.props.brand}</Brand>
          <StyledPriceValue>
            {currentPrice ? currentPrice.currency.symbol + finalPrice : ""}
          </StyledPriceValue>
          {this.props.attributes.map(
            (element: ProductAttributesType, i: number) => {
              return (
                <AttributesBlock className={i === 0 ? "firstAttribute" : ""}>
                  <AttributesName>{element.name + ":"}</AttributesName>
                  <WrapeprAttributesItem>
                    {element.items.map(
                      (item: ProductAttributesItemsType, index: number) => {
                        // const activeItem: ProductStateType =
                        //   this.props.productReducer.find(
                        //     (el: ProductStateType) => {
                        //       return el.name === element.name;
                        //     }
                        //   );
                        // const isActive = activeItem
                        //   ? activeItem.activeElement === index
                        //     ? "active"
                        //     : ""
                        //   : "";
                        return element.name !== ProductAttributeName.COLOR ? (
                          <AttributesItem
                          // className={isActive}
                          // onClick={() => {
                          //   this.props.changeProductState(
                          //     index,
                          //     element.name
                          //   );
                          // }}
                          >
                            {this.props.name === "Jacket"
                              ? item.value
                              : item.displayValue}
                          </AttributesItem>
                        ) : (
                          <ColorAttributesItem
                            // className={isActive}
                            // onClick={() => {
                            //   this.props.changeProductState(
                            //     index,
                            //     element.name
                            //   );
                            // }}
                            backgroundColor={item.value}
                          ></ColorAttributesItem>
                        );
                      }
                    )}
                  </WrapeprAttributesItem>
                </AttributesBlock>
              );
            }
          )}
        </InfoBlock>
        <ImageBlock>
          <QuantityBlock>
            <QuantityControllButtons
              onClick={() =>
                this.setState({ quantity: (this.state.quantity += 1) })
              }
            >
              <HorizontalLine />
              <VerticalLineForPlus />
            </QuantityControllButtons>
            <QuantityLabel>{this.state.quantity}</QuantityLabel>
            <QuantityControllButtons
              onClick={() =>
                this.state.quantity >= 2
                  ? this.setState({
                      quantity: (this.state.quantity = this.state.quantity - 1),
                    })
                  : this.props.removeProduct(this.props.name)
              }
            >
              <HorizontalLine />
            </QuantityControllButtons>
          </QuantityBlock>
          <StyledImg src={this.props.gallery[0]} />
        </ImageBlock>
      </Wrapper>
    );
  }
}

export default ProductForCart;
