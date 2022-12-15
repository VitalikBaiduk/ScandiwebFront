import { Link } from "react-router-dom";
import styled from "styled-components";

export const ExtraCardWrapper = styled(Link)`
  width: 100%;
  display: flex;
  text-decoration: none;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 355px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;
  box-sizing: border-box;
  transition: 0.1s linear;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    transform: scale(1.1);
  }
`;

export const StyledImage = styled.img`
  max-width: 100%;
  height: 330px;
  object-fit: contain;
`;

export const TextInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ProductName = styled.span`
  font-weight: 300;
  font-size: 18px;
  line-height: 160%;
  color: #1d1f22;
  margin-top: 25px;
`;

export const ProductPrice = styled.span`
  font-weight: 500;
  font-size: 18px;
  line-height: 160%;
  color: #1d1f22;
`;
