import styled from "styled-components";
import { ProductColorAttributesItemProps } from "../../../types/types";
import { ReactComponent as CartIcon } from "../../../assets/CircleIcon.svg";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 80px;
`;

export const ImageBlock = styled.div`
  position: relative;
  width: 100%;
  max-width: 700px;
  max-height: 510px;
  display: flex;
  margin-right: 100px;
`;

export const WrapperSmallImage = styled.div`
  /* max-height: 510px; */
  overflow: scroll;
  display: flex;
  flex-direction: column;
`;

export const SmallImage = styled.img`
  max-width: 80px;
  max-height: 80px;
  margin-bottom: 30px;
  cursor: pointer;
  &:last-child {
    margin-bottom: 0px;
  }
`;

export const MainImage = styled.img`
  max-width: 610px;
  max-height: 510px;
  object-fit: cover;
  margin-left: 30px;
`;

export const InfoBlock = styled.div`
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const NameOfItem = styled.span`
  font-weight: 600;
  font-size: 30px;
  line-height: 27px;
  color: #1d1f22;
  &.overlay {
    font-weight: 300;
    font-size: 16px;
    line-height: 160%;
  }
`;

export const Brand = styled.span`
  font-weight: 400;
  font-size: 30px;
  line-height: 27px;
  color: #1d1f22;
  margin-top: 15px;
  &.overlay {
    font-weight: 300;
    font-size: 16px;
    margin: 0;
  }
`;

export const AttributesBlock = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  &.firstAttribute {
    margin-top: 45px;
    &.overlay {
      margin-top: 10px;
    }
  }
  &.overlay {
    margin-top: 10px;
  }
`;

export const AttributesName = styled.span`
  font-family: "Roboto Condensed";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  text-transform: uppercase;
  line-height: 18px;
  color: #1d1f22;
  &.overlay {
    font-family: "Raleway";
    font-weight: 400;
    font-size: 14px;
  }
`;

export const WrapeprAttributesItem = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin-top: 10px;
  &.overlay {
    gap: 8px;
  }
`;

export const AttributesItem = styled.div`
  width: 65px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #1d1f22;
  color: #1d1f22;
  cursor: pointer;
  transition: 0.2s linear;
  box-sizing: border-box;
  &.active {
    background-color: #1d1f22;
    color: #ffffff;
    &.overlay {
      width: 24px;
      height: 24px;
    }
  }
  &.overlay {
    width: 24px;
    height: 24px;
  }
`;

export const ColorAttributesItem = styled.div<ProductColorAttributesItemProps>`
  width: 32px;
  height: 32px;
  border: 1px solid white;
  cursor: pointer;
  background-color: ${(props: any) => props.backgroundColor};
  transition: 0.2s linear;
  &.active {
    border: 1px solid #5ece7b;
    transform: scale(1.1);
  }
  &.forWhite {
    border: 1px solid black;
    &.active {
      border: 1px solid #5ece7b;
    }
  }
  &.overlay {
    width: 20px;
    height: 20px;
  }
`;

export const PriceLabel = styled.span`
  font-family: "Roboto Condensed";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
  color: #1d1f22;
  margin-top: 35px;
`;

export const PriceValue = styled.span`
  font-weight: 700;
  font-size: 20px;
  line-height: 18px;
  color: #1d1f22;
  margin-top: 10px;
`;

export const AddToCartButton = styled.button`
  width: 100%;
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
  &.disable {
    background: #d3d3d3;
  }
`;

export const WrapperProductDescription = styled.div`
  width: 100%;
  max-width: 300px;
  margin-top: 40px;
`;

export const StyledCartIcon = styled(CartIcon)`
  position: absolute;
  bottom: 75px;
  right: 30px;
`;
