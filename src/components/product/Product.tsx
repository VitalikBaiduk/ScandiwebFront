import React, { Component, ComponentType } from "react";
import { DataProps, graphql, MutateProps } from "@apollo/client/react/hoc";
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
import { connect } from "react-redux";
import {
  changeProductState,
  clearProductState,
} from "../../state/actions/changeProductState";
import { ProductStateType } from "../../state/reducers/productReducer";
import { addProduct } from "../../state/actions/addProdutToCart";

class Product extends Component<any, any> {
  componentDidMount(): void {
    this.props.clearProductState();
  }

  state = {
    mainImage: "",
    activeAttribute: null,
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

    const stateCurrency = this.props.currency.currency;

    const changeImageHandler = (image: string) => {
      this.setState({ mainImage: image });
    };

    const currentPrice = prices.find((el: any) => {
      return stateCurrency === el.currency.symbol;
    });

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
          {attributes.map((element: ProductAttributesType, i: number) => {
            return (
              <AttributesBlock className={i === 0 ? "firstAttribute" : ""}>
                <AttributesName>{element.name + ":"}</AttributesName>
                <WrapeprAttributesItem>
                  {element.items.map(
                    (item: ProductAttributesItemsType, index: number) => {
                      const activeItem: ProductStateType =
                        this.props.productReducer.find(
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
                          className={isActive}
                          onClick={() => {
                            this.props.changeProductState(index, element.name);
                          }}
                          backgroundColor={item.value}
                        ></ColorAttributesItem>
                      ) : (
                        <AttributesItem
                          className={isActive}
                          onClick={() => {
                            this.props.changeProductState(index, element.name);
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
            onClick={() => {
              this.props.addProduct({
                gallery,
                attributes,
                name,
                brand,
                prices,
              });
            }}
          >
            ADD TO CART
          </AddToCartButton>
          <WrapperProductDescription
            style={{ fontFamily: "Roboto Condensed" }}
            dangerouslySetInnerHTML={{ __html: description }}
          ></WrapperProductDescription>
        </InfoBlock>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    currency: state.currency,
    productReducer: state.productReducer.attributesState,
  };
};

const mapDispatchToProps = () => {
  return {
    changeProductState,
    clearProductState,
    addProduct,
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
