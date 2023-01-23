import styled from "styled-components";

export const ExtraWrapper = styled.div`
  width: 100%;
  max-width: 2560px;
  padding: 30px 100px 100px 115px;
  box-sizing: border-box;
  margin: 0 auto;
  &.blockScroll {
    height: 100vh;
    overflow: hidden;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  box-sizing: border-box;
`;

export const Title = styled.h1`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 42px;
  line-height: 160%;
  color: #1d1f22;
  margin-bottom: 50px;
  text-transform: uppercase;
`;

export const ProductCardWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  gap: 100px 40px;
`;

export const OpenModal = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 95px;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;
