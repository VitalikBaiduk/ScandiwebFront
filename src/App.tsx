import React from "react";
import "./App.css";
import NavigationContainer from "./components/navigation/Navigation";
import AllPageContainer from "./components/pages/all/All";
import ClothesPageContainer from "./components/pages/clothes/Clothes";
import { Route, Routes } from "react-router-dom";
import TechnicPageContainer from "./components/pages/tech/Technic";
import ProductPageContainer from "./components/product/Product";
import { ExtraWrapper } from "./styles/global";
import Cart from "./components/pages/cart/Cart";
import styled from "styled-components";
import { connect } from "react-redux";
import { editableInputTypes } from "@testing-library/user-event/dist/utils";

export const NavigationWrapper = styled.div`
  width: 100%;
  max-width: 2560px;
  padding: 30px 100px 0 115px;
  box-sizing: border-box;
  margin: 0 auto;
`;

const OpenModal = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 95px;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

class App extends React.Component<any, any> {
  render(): React.ReactNode {
    const { isOpenCartOverlay } = this.props.globalStateReducer;
    return (
      <ExtraWrapper className={isOpenCartOverlay ? "blockScroll" : ""}>
        <NavigationContainer />
        {isOpenCartOverlay && <OpenModal />}
        <Routes>
          <Route path="/all" element={<AllPageContainer />} />
          <Route path="/clothes" element={<ClothesPageContainer />} />
          <Route path="/tech" element={<TechnicPageContainer />} />
          <Route path="all/proguct/:id" element={<ProductPageContainer />} />
          <Route
            path="clothes/proguct/:id"
            element={<ProductPageContainer />}
          />
          <Route path="tech/proguct/:id" element={<ProductPageContainer />} />
          <Route path="*" element={<AllPageContainer />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </ExtraWrapper>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    globalStateReducer: state.globalStateReducer,
  };
};

export default connect(mapStateToProps, {})(App);
