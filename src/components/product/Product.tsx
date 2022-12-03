import React, { Component } from "react";
import { graphql } from "@apollo/client/react/hoc";
import { getProduct } from "../../api/getProduct";
import { withRouter } from "../../utils/withRouter";
import { ProductAttributeName } from "../../enums/ProductAttributeName";
import {
  AddToCartButton,
  AttributesBlock,
  AttributesItem,
  AttributesName,
  Brand,
  ColorAttributesItem,
  ImageBlock,
  InfoBlock,
  MainImage,
  NameOfItem,
  PriceLabel,
  PriceValue,
  SmallImage,
  WrapeprAttributesItem,
  Wrapper,
  WrapperProductDescription,
  WrapperSmallImage,
} from "./styles";
import {
  ProductAttributesItemsType,
  ProductAttributesType,
} from "../../types/types";

class Product extends Component<any, any> {
  state = {
    mainImage: "",
  };

  render(): React.ReactNode {
    const { gallery, attributes, name, brand, prices, description } = this.props
      .data.product
      ? this.props.data.product
      : {
          gallery: [],
          attributes: [
            {
              id: "",
              name: "",
              type: "",
              items: [{ displayValue: "", value: "", id: "" }],
            },
          ],
          name: "",
          brand: "",
          prices: [{ currency: { label: "", symbol: "" }, amount: "" }],
          description: "",
        };

    const changeImageHandler = (image: string) => {
      this.setState({ mainImage: image });
    };
    console.log(description);

    return (
      <Wrapper>
        <ImageBlock>
          <WrapperSmallImage>
            {gallery.map((el: string, index: number) => {
              return (
                <SmallImage
                  key={index}
                  onMouseEnter={() => {
                    changeImageHandler(el);
                  }}
                  src={el}
                />
              );
            })}
          </WrapperSmallImage>
          <MainImage
            src={this.state.mainImage ? this.state.mainImage : gallery[0]}
          />
        </ImageBlock>
        <InfoBlock>
          <NameOfItem>{name}</NameOfItem>
          <Brand>{brand}</Brand>
          {attributes.map((el: ProductAttributesType, index: number) => {
            return (
              <AttributesBlock className={index === 0 ? "firstAttribute" : ""}>
                <AttributesName>{el.name + ":"}</AttributesName>
                <WrapeprAttributesItem>
                  {el.items.map((item: ProductAttributesItemsType) => {
                    if (el.name === ProductAttributeName.COLOR) {
                      return (
                        <ColorAttributesItem
                          backgroundColor={item.value}
                        ></ColorAttributesItem>
                      );
                    } else {
                      return (
                        <AttributesItem>
                          {name === "Jacket" ? item.value : item.displayValue}
                        </AttributesItem>
                      );
                    }
                  })}
                </WrapeprAttributesItem>
              </AttributesBlock>
            );
          })}
          <PriceLabel>PRICE:</PriceLabel>
          <PriceValue>
            {prices ? prices[0].currency.symbol + prices[0].amount : ""}
          </PriceValue>
          <AddToCartButton>ADD TO CART</AddToCartButton>
          <WrapperProductDescription
            style={{ fontFamily: "Roboto Condensed" }}
            dangerouslySetInnerHTML={{ __html: description }}
          ></WrapperProductDescription>
        </InfoBlock>
      </Wrapper>
    );
  }
}

export default withRouter(
  graphql<{ id: string }>(getProduct, {
    options: ({ id }) => ({
      variables: { id },
    }),
  })(Product)
);
