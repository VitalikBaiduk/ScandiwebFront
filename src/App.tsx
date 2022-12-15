import React from "react";
import "./App.css";
import NavigationContainer from "./components/navigation/Navigation";
import AllPageContainer from "./components/pages/all/All";
import ClothesPageContainer from "./components/pages/clothes/Clothes";
import { Route, Routes } from "react-router-dom";
import TechnicPageContainer from "./components/pages/tech/Technic";
import ProductPageContainer from "./components/product/Product";
import { ExtraWrapper, OpenModal } from "./styles/global";
import Cart from "./components/pages/cart/Cart";
import { connect } from "react-redux";
import { changeCartOvelayStatus } from "./state/actions/changeCartOvelayStatus";

class App extends React.Component<any, any> {
  render(): React.ReactNode {
    const { isOpenCartOverlay } = this.props.globalStateReducer;
    return (
      <ExtraWrapper className={isOpenCartOverlay ? "blockScroll" : ""}>
        <NavigationContainer />
        {isOpenCartOverlay && (
          <OpenModal
            onClick={() => {
              this.props.changeCartOvelayStatus(false);
            }}
          />
        )}
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

const mapDispatchToProps = () => {
  return {
    changeCartOvelayStatus,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(App);
