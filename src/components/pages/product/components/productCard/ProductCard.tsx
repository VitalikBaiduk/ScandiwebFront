import React, { Component } from "react";
import { ProductCardProps } from "../../../../../types/types";
import {
  ProductName,
  ProductPrice,
  StyledImage,
  TextInfo,
  Wrapper,
} from "./styles";
import { ReactComponent as CartIcon } from "../../../../../assets/CircleIcon.svg";
import styled from "styled-components";

export const StyledCartIcon = styled(CartIcon)`
  position: absolute;
  bottom: 75px;
  right: 30px;
`;

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
        <StyledCartIcon />
      </Wrapper>
    );
  }
}

export default ProductCard;
