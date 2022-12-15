import styled from "styled-components";
import { PriceValue } from "../../../styles";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  &.overlay {
    &:first-child {
      margin: 0;
    }
    margin-top: 40px;
  }
`;

export const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledPriceValue = styled(PriceValue)`
  margin-top: 20px;
  &.overlay {
    font-weight: 500;
    font-size: 16px;
    margin: 0;
  }
`;

export const ImageBlock = styled.div`
  position: relative;
  display: flex;
`;

export const QuantityBlock = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-right: 25px;
`;

export const QuantityControllButtons = styled.div`
  position: relative;
  width: 45px;
  height: 45px;
  text-align: center;
  border: 1px solid #1d1f22;
  box-sizing: border-box;
  cursor: pointer;
  &.overlay {
    width: 24px;
    height: 24px;
  }
`;

export const HorizontalLine = styled.div`
  position: absolute;
  left: 33.33%;
  right: 33.33%;
  top: 50%;
  bottom: 50%;
  border-top: 1px solid #1d1f22;
`;

export const VerticalLineForPlus = styled.div`
  position: absolute;
  left: 50%;
  right: 50%;
  top: 33.33%;
  bottom: 33.33%;
  border-left: 1px solid #1d1f22;
`;

export const QuantityLabel = styled.p`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 160%;
  color: #1d1f22;
`;

export const StyledImg = styled.img`
  max-width: 200px;
  object-fit: contain;
  &.overlay {
    max-width: 120px;
  }
`;

export const ImageDislayControllButtonsBlock = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  width: 100%;
  max-width: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ImageControllButton = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.73);
  &.right {
    & > svg {
      transform: rotate(180deg);
    }
  }
`;
