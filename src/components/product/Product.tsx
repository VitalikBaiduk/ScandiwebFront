import React, { Component } from "react";
import { graphql } from "@apollo/client/react/hoc";
import { getProduct } from "../../api/getProduct";
import { withRouter } from "../../utils/withRouter";
import styled from "styled-components";
import { ProductAttributeName } from "../../enums/ProductAttributeName";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  /* justify-content: space-between; */
  margin-top: 80px;
`;

const ImageBlock = styled.div`
  width: 100%;
  max-width: 700px;
  display: flex;
  margin-right: 100px;
`;

const WrapperSmallImage = styled.div`
  display: flex;
  flex-direction: column;
`;

const SmallImage = styled.img`
  max-width: 80px;
  max-height: 80px;
  margin-bottom: 30px;
  cursor: pointer;
  &:last-child {
    margin-bottom: 0px;
  }
`;

const MainImage = styled.img`
  max-width: 610px;
  max-height: 510px;
  object-fit: cover;
  margin-left: 30px;
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const NameOfItem = styled.p`
  font-weight: 600;
  font-size: 30px;
  line-height: 27px;
  color: #1d1f22;
`;

const Brand = styled.p`
  font-weight: 400;
  font-size: 30px;
  line-height: 27px;
  color: #1d1f22;
  margin-top: 15px;
`;

const AttributesBlock = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  &.firstAttribute {
    margin-top: 45px;
  }
`;

const AttributesName = styled.p`
  font-family: "Roboto Condensed";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  text-transform: uppercase;
  line-height: 18px;
  color: #1d1f22;
`;

const WrapeprAttributesItem = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const AttributesItem = styled.div`
  width: 65px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #1d1f22;
  color: #1d1f22;
  cursor: pointer;
  transition: 0.2s linear;
  &:hover {
    background-color: #1d1f22;
    color: #ffffff;
  }
`;

interface ColorAttributesItemProps {
  backgroundColor: string;
}

const ColorAttributesItem = styled.div<ColorAttributesItemProps>`
  width: 32px;
  height: 32px;
  border: 1px solid white;
  cursor: pointer;
  background-color: ${(props: any) => props.backgroundColor};
  &:hover {
    border: 1px solid #5ece7b;
  }
`;

const PriceLabel = styled.p`
  font-family: "Roboto Condensed";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
  color: #1d1f22;
  margin-top: 35px;
`;

const PriceValue = styled.p`
  font-weight: 700;
  font-size: 20px;
  line-height: 18px;
  color: #1d1f22;
  margin-top: 10px;
`;

const AddToCartButton = styled.button`
  width: 100%;
  max-width: 300px;
  background: #5ece7b;
  color: #ffffff;
  cursor: pointer;
  border: none;
  box-sizing: border-box;
  padding: 15px 0;
  margin-top: 30px;
  transition: 0.2s linear;
  &:hover {
    background-color: #4aa361;
  }
`;

interface AttributesItemsType {
  displayValue: string;
  value: string;
  id: string;
}
interface AttributesType {
  id: string;
  name: string;
  type: string;
  items: AttributesItemsType[];
}

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
          {attributes.map((el: AttributesType, index: number) => {
            return (
              <AttributesBlock className={index === 0 ? "firstAttribute" : ""}>
                <AttributesName>{el.name + ":"}</AttributesName>
                <WrapeprAttributesItem>
                  {el.items.map((item: AttributesItemsType) => {
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
