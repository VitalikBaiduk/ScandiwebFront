import React, { Component } from "react";
import { ProductAttributeName } from "../../../../enums/ProductAttributeName";
import { ProductStateType } from "../../../../state/reducers/productReducer";
import { ReactComponent as Arrow } from "./assets/LeftArrow.svg";
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
  WrapeprAttributesItem,
} from "../../styles";
import {
  HorizontalLine,
  ImageBlock,
  ImageControllButton,
  ImageDislayControllButtonsBlock,
  InfoBlock,
  QuantityBlock,
  QuantityControllButtons,
  QuantityLabel,
  StyledImg,
  StyledPriceValue,
  VerticalLineForPlus,
  Wrapper,
} from "./styles/styles";

interface ProductForCartProps extends ProductData {
  currency: any;
  removeProduct: (name: string) => void;
  getTotalPrice: (price: number, inc: boolean, decr: boolean) => void;
  updatedPrices: any;
  attributeState: any[];
  className?: string;
  productCount: (count: number, name: string) => void;
}

class ProductForCart extends Component<ProductForCartProps, any> {
  state = {
    quantity: 1,
    imageNumber: 0,
  };

  render(): React.ReactNode {
    const stateCurrency = this.props.currency.currency;
    let { quantity, imageNumber } = this.state;
    const {
      getTotalPrice,
      removeProduct,
      name,
      gallery,
      brand,
      attributes,
      attributeState,
      className,
      productCount,
    } = this.props;

    const setClassName = className ? className : "";

    const currentPrice = this.props.prices.find((el: any) => {
      return stateCurrency === el.currency.symbol;
    });

    const finalPrice = currentPrice!.amount * quantity;

    const incProduct = () => {
      this.setState({ quantity: (quantity += 1) });
      debugger;
      productCount(quantity, name);
      currentPrice &&
        getTotalPrice(currentPrice ? currentPrice.amount : 0, true, false);
    };

    const decProduct = () => {
      if (quantity >= 2) {
        this.setState({
          quantity: (quantity = quantity - 1),
        });
        currentPrice &&
          getTotalPrice(currentPrice ? currentPrice.amount : 0, false, true);
      } else {
        removeProduct(name);
      }
    };
    const onImageControllButtonClick = (buttonType: string) => {
      buttonType === "inc"
        ? imageNumber !== gallery.length - 1
          ? this.setState({ imageNumber: (imageNumber += 1) })
          : this.setState({ imageNumber: 0 })
        : buttonType === "dec" && imageNumber !== 0
        ? this.setState({
            imageNumber: (imageNumber = imageNumber - 1),
          })
        : this.setState({
            imageNumber: gallery.length - 1,
          });
    };

    return (
      <Wrapper className={setClassName}>
        <InfoBlock>
          <NameOfItem className={setClassName}>{name}</NameOfItem>
          <Brand className={setClassName}>{brand}</Brand>
          <StyledPriceValue className={setClassName}>
            {currentPrice!.currency.symbol + finalPrice.toFixed(2)}
          </StyledPriceValue>
          {attributes.map((element: ProductAttributesType, i: number) => {
            return (
              <AttributesBlock
                className={
                  i === 0 ? `firstAttribute ${setClassName}` : setClassName
                }
              >
                <AttributesName className={setClassName}>
                  {element.name + ":"}
                </AttributesName>
                <WrapeprAttributesItem className={setClassName}>
                  {element.items.map(
                    (item: ProductAttributesItemsType, index: number) => {
                      const activeItem: ProductStateType = attributeState.find(
                        (el: ProductStateType) => {
                          return el.name === element.name;
                        }
                      );
                      const isActive = activeItem
                        ? activeItem.activeElement === index
                          ? "active"
                          : ""
                        : "";
                      return element.name !== ProductAttributeName.COLOR ? (
                        <AttributesItem
                          className={`${isActive} ${setClassName}`}
                        >
                          {name === "Jacket" ? item.value : item.displayValue}
                        </AttributesItem>
                      ) : (
                        <ColorAttributesItem
                          className={
                            item.value === "#FFFFFF" && isActive && setClassName
                              ? `${isActive} ${setClassName} forWhite `
                              : item.value === "#FFFFFF" && setClassName
                              ? `${setClassName} forWhite`
                              : `${isActive} ${setClassName}`
                          }
                          backgroundColor={item.value}
                        ></ColorAttributesItem>
                      );
                    }
                  )}
                </WrapeprAttributesItem>
              </AttributesBlock>
            );
          })}
        </InfoBlock>
        <ImageBlock>
          <QuantityBlock>
            <QuantityControllButtons
              className={setClassName}
              onClick={incProduct}
            >
              <HorizontalLine />
              <VerticalLineForPlus />
            </QuantityControllButtons>
            <QuantityLabel>{quantity}</QuantityLabel>
            <QuantityControllButtons
              className={setClassName}
              onClick={decProduct}
            >
              <HorizontalLine />
            </QuantityControllButtons>
          </QuantityBlock>
          <StyledImg className={setClassName} src={gallery[imageNumber]} />
          {gallery.length !== 1 && !setClassName && (
            <ImageDislayControllButtonsBlock>
              <ImageControllButton
                onClick={() => onImageControllButtonClick("dec")}
              >
                <Arrow />
              </ImageControllButton>
              <ImageControllButton
                onClick={() => onImageControllButtonClick("inc")}
                className={"right"}
              >
                <Arrow />
              </ImageControllButton>
            </ImageDislayControllButtonsBlock>
          )}
        </ImageBlock>
      </Wrapper>
    );
  }
}

export default ProductForCart;
