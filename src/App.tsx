import React from "react";
import "./App.css";
import NavigationContainer from "./components/navigation/Navigation";
import AllPageContainer from "./components/pages/all/All";
import ClothesPageContainer from "./components/pages/clothes/Clothes";
import { Route, Routes } from "react-router-dom";
import TechnicPageContainer from "./components/pages/tech/Technic";
import ProductPageContainer from "./components/product/Product";
import { ExtraWrapper } from "./styles/global";

class App extends React.Component {
  render(): React.ReactNode {
    return (
      <ExtraWrapper className="App">
        <NavigationContainer />
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
        </Routes>
      </ExtraWrapper>
    );
  }
}

export default App;
