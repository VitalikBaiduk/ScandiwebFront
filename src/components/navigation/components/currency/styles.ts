import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  max-width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 25px;
  left: 126px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  background-color: #ffffffff;
`;

export const CurrencyItem = styled.span`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px 0;
  transition: 0.2s linear;
  cursor: pointer;
  &:hover {
    background-color: #eeeeee;
  }
  &.active {
    background-color: #eeeeee;
  }
`;
