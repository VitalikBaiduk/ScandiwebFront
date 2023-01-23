import React, { Component } from "react";
import { ProductAttributeName } from "../../../../../enums/ProductAttributeName";
import { ProductStateType } from "../../../../../state/reducers/productReducer";
import { ReactComponent as Arrow } from "./assets/LeftArrow.svg";
import {
  ActiveAttebutes,
  ProductAttributesItemsType,
  ProductAttributesType,
  ProductData,
} from "../../../../../types/types";
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
import { getCorrectPrice } from "../../../../../utils/PriceFunc";

interface ProductForCartProps extends ProductData {
  currency: any;
  removeProduct: (id: string) => void;
  updatedPrices: any;
  attributeState: ActiveAttebutes[];
  className?: string;
  getProductCount: (count: number, id: string) => void;
  productCount: number;
  id: string;
  setTotalPrice: (currency: string | null) => void;
}

class ProductForCart extends Component<ProductForCartProps, any> {
  state = {
    imageNumber: 0,
    quantity: 1,
  };

  render(): React.ReactNode {
    let { imageNumber } = this.state;
    const {
      removeProduct,
      name,
      gallery,
      brand,
      attributes,
      attributeState,
      className,
      getProductCount,
      productCount,
      id,
      prices,
      setTotalPrice,
    } = this.props;

    let quantity = productCount ? productCount : 1;

    const setClassName = className ? className : "";

    const currentPrice = prices.find((el: any) => {
      if (el) {
        return (
          el !== null && localStorage.getItem("currency") === el.currency.symbol
        );
      }
    });

    const incProduct = () => {
      this.setState({ quantity: (quantity += 1) });
      getProductCount(quantity, id);
      setTotalPrice(localStorage.getItem("currency"));
    };

    const decProduct = () => {
      if (quantity >= 2) {
        this.setState({
          quantity: (quantity = quantity - 1),
        });
        getProductCount(quantity, id);
        setTotalPrice(localStorage.getItem("currency"));
      } else {
        getProductCount(quantity, id);
        removeProduct(id);
        setTotalPrice(localStorage.getItem("currency"));
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
            {currentPrice &&
              currentPrice.currency.symbol +
                getCorrectPrice(currentPrice.amount)}
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
                      const activeItem: ActiveAttebutes | undefined =
                        attributeState.find((el: ProductStateType) => {
                          return el.name === element.name;
                        });
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
