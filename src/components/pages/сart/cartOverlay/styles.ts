import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  top: 65px;
  right: -15px;
  width: 100%;
  max-width: 330px;
  max-height: 680px;
  background-color: white;
  box-sizing: border-box;
  padding: 30px 16px;
  z-index: 99999999999;
`;

export const Title = styled.span`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 160%;
  color: #1d1f22;
`;

export const ProductCount = styled.span`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 160%;
  color: #1d1f22;
`;

export const ProductWrapper = styled.div`
  width: 100%;
  max-height: 370px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

export const TotalPriceBlock = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
`;

export const StyledText = styled.span`
  font-family: "Roboto Condensed";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
  color: #1d1f22;
`;

export const Price = styled.span`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 160%;
  color: #1d1f22;
`;

export const ButtonBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;

export const ButtonText = styled(Link)<{
  border: string;
  background: string;
  padding: string;
}>`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 120%;
  text-transform: uppercase;
  text-decoration: none;
  border: ${(props: any) => props.border};
  background-color: ${(props: any) => props.background};
  color: ${(props: any) => props.color};
  box-sizing: border-box;
  padding: ${(props: any) => props.padding};
`;
