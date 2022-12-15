import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as SuccessOrder } from "../../../assets/successIcon.svg";

export const Wrapper = styled.div`
  width: 100%;
  margin-top: 110px;
`;

export const Title = styled.p`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  text-transform: uppercase;
  color: #1d1f22;
`;

export const ProductWrapper = styled.div`
  width: 100%;
  border-top: 1px solid #e5e5e5;
  box-sizing: border-box;
  padding-top: 25px;
  margin-top: 25px;
  &:first-child {
    margin-top: 55px;
  }
`;

export const BlockForEmptyBin = styled.div`
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 150px auto;
`;

export const EmptyText = styled.p`
  width: 100%;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 160%;
  color: #1d1f22;
  margin-bottom: 30px;
  text-align: center;
  &.inButton {
    color: #ffffff;
    margin-bottom: 0;
    line-height: 100%;
  }
`;

export const ToShoppingLink = styled(Link)`
  background: #5ece7b;
  color: #ffffff;
  text-decoration: none;
  line-height: 100%;
  cursor: pointer;
  box-sizing: border-box;
  padding: 15px 10px;
  transition: 0.2s linear;
  &:hover {
    background-color: #4aa361;
  }
`;

export const TotalPriceBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-top: 1px solid #e5e5e5;
  padding-top: 30px;
  margin-top: 25px;
  box-sizing: border-box;
`;

export const TotalBlockKey = styled.span`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;
  color: #1d1f22;
  margin-top: 8px;
  &:first-child {
    margin: 0;
  }
`;

export const TotalBlockValue = styled.span`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  color: #1d1f22;
`;

export const TotalKey = styled.span`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #1d1f22;
  margin-top: 8px;
`;

export const TotalValue = styled.span`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  color: #1d1f22;
`;

export const OrderButton = styled.div`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 120%;
  display: flex;
  text-transform: uppercase;
  color: #ffffff;
  background: #5ece7b;
  margin-top: 15px;
  padding: 15px 115px;
  box-sizing: border-box;
  cursor: pointer;
  transition: 0.2s linear;
  &:hover {
    background-color: #4aa361;
  }
`;

export const SuccessOrderBlock = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const SuccessOrderModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 100px 200px;
`;

export const SuccessOrderText = styled.span`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 34px;
  line-height: 24px;
  color: #1d1f22;
  margin-top: 20px;
`;

export const StyledIcon = styled(SuccessOrder)`
  width: 40%;
`;
