import React, { Component, ComponentType } from "react";
import { DataProps, graphql, MutateProps } from "@apollo/client/react/hoc";
import { getProduct } from "../../../api/getProduct";
import { withRouter } from "../../../utils/withRouter";
import { ProductAttributeName } from "../../../enums/ProductAttributeName";
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
} from "../../../types/types";
import { connect } from "react-redux";
import {
  changeProductState,
  clearProductState,
} from "../../../state/actions/changeProductState";
import { ProductStateType } from "../../../state/reducers/productReducer";
import { addProduct } from "../../../state/actions/handleProdutInCart";
import parse from "html-react-parser";
import { v4 as uuid } from "uuid";
import { setTotalPrice } from "../../../state/actions/setTotalPrice";
import {
  OutOfStockText,
  OutOfStockWrapper,
} from "./components/productCard/styles";

class Product extends Component<any, any> {
  componentDidMount(): void {
    this.props.clearProductState();
  }

  state = {
    mainImage: "",
  };

  render(): React.ReactNode {
    const { gallery, attributes, name, brand, prices, description, inStock } =
      this.props.data.product
        ? this.props.data.product
        : {
            gallery: [],
            inStock: false,
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

    const { mainImage } = this.state;
    const { productReducer, changeProductState, addProduct, setTotalPrice } =
      this.props;

    const changeImageHandler = (image: string) => {
      this.setState({ mainImage: image });
    };

    const currentPrice = prices.find((el: any) => {
      return localStorage.getItem("currency") === el.currency.symbol;
    });

    let currentAttributesArr: any[] = [];

    attributes.map((attrItem: ProductAttributesType) => {
      let [item] = productReducer.attributesState.filter((el: any) => {
        return el.name === attrItem.name;
      });
      currentAttributesArr.push(item);
    });

    const isInactiveElements = currentAttributesArr.find((el: any) => {
      if (el) {
        return el.activeElement === null;
      }
      return el;
    });

    const addProductToCart = () => {
      const id = uuid();
      !isInactiveElements &&
        inStock &&
        addProduct(
          {
            gallery,
            attributes,
            name,
            brand,
            prices,
            id,
          },
          currentAttributesArr
        );
      !isInactiveElements &&
        inStock &&
        localStorage.setItem(
          "productArr",
          JSON.stringify([
            ...JSON.parse(localStorage.getItem("productArr")!),
            {
              activeAttebutes: currentAttributesArr,
              attributes,
              gallery,
              name,
              brand,
              prices,
              id,
              firstPrices: prices,
            },
          ])
        );
      setTotalPrice(localStorage.getItem("currency"));
    };

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
          <MainImage src={mainImage ? mainImage : gallery[0]} />
          {!inStock && (
            <OutOfStockWrapper>
              <OutOfStockText>OUT OF STOCK</OutOfStockText>
            </OutOfStockWrapper>
          )}
        </ImageBlock>
        <InfoBlock>
          <NameOfItem>{name}</NameOfItem>
          <Brand>{brand}</Brand>
          {attributes.map((element: ProductAttributesType, i: number) => {
            return (
              <AttributesBlock
                key={i}
                className={i === 0 ? "firstAttribute" : ""}
              >
                <AttributesName>{element.name + ":"}</AttributesName>
                <WrapeprAttributesItem>
                  {element.items.map(
                    (item: ProductAttributesItemsType, index: number) => {
                      const activeItem: ProductStateType =
                        productReducer.attributesState.find(
                          (el: ProductStateType) => {
                            return el.name === element.name;
                          }
                        );

                      const isActive = activeItem
                        ? activeItem.activeElement === index
                          ? "active"
                          : ""
                        : "";

                      return element.name === ProductAttributeName.COLOR ? (
                        <ColorAttributesItem
                          key={index}
                          className={
                            item.value === "#FFFFFF" && isActive
                              ? "forWhite active"
                              : item.value === "#FFFFFF"
                              ? "forWhite"
                              : isActive
                          }
                          onClick={() => {
                            changeProductState(index, element.name);
                          }}
                          backgroundColor={item.value}
                        ></ColorAttributesItem>
                      ) : (
                        <AttributesItem
                          key={index}
                          className={isActive}
                          onClick={() => {
                            changeProductState(index, element.name);
                          }}
                        >
                          {name === "Jacket" ? item.value : item.displayValue}
                        </AttributesItem>
                      );
                    }
                  )}
                </WrapeprAttributesItem>
              </AttributesBlock>
            );
          })}
          <PriceLabel>PRICE:</PriceLabel>
          <PriceValue>
            {currentPrice
              ? currentPrice.currency.symbol + currentPrice.amount
              : ""}
          </PriceValue>
          <AddToCartButton
            className={inStock && !isInactiveElements ? "" : "disable"}
            onClick={addProductToCart}
          >
            ADD TO CART
          </AddToCartButton>
          <WrapperProductDescription>
            {parse(description)}
          </WrapperProductDescription>
        </InfoBlock>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    currency: state.currency,
    productReducer: state.productReducer,
    cartReducer: state.cartReducer,
  };
};

const mapDispatchToProps = () => {
  return {
    changeProductState,
    clearProductState,
    addProduct,
    setTotalPrice,
  };
};

const ProductPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps()
)(Product);

export default withRouter(
  graphql<{ id: string }>(getProduct, {
    options: ({ id }) => ({
      variables: { id },
    }),
  })(
    ProductPageContainer as ComponentType<
      { id: string } & Partial<DataProps<{}, {}>> & Partial<MutateProps<{}, {}>>
    >
  )
);
