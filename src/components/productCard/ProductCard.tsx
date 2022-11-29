import React, { Component } from "react";
import {
  ProductName,
  ProductPrice,
  StyledImage,
  TextInfo,
  Wrapper,
} from "./styles";

interface ProductCardProps {
  imageUrl: string;
  name: string;
  price: string;
}

class ProductCard extends Component<ProductCardProps, {}> {
  render(): React.ReactNode {
    const { imageUrl, name, price } = this.props;

    return (
      <Wrapper>
        <StyledImage src={imageUrl} />
        <TextInfo>
          <ProductName>{name}</ProductName>
          <ProductPrice>{price}</ProductPrice>
        </TextInfo>
      </Wrapper>
    );
  }
}

export default ProductCard;
