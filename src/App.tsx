import React from "react";
import "./App.css";
import NavigationContainer from "./components/navigation/Navigation";
import AllPageContainer from "./components/pages/all/All";
import ClothesPageContainer from "./components/pages/clothes/Clothes";
import { Route, Routes } from "react-router-dom";
import TechnicPageContainer from "./components/pages/tech/Technic";
import Product from "./components/product/Product";
import { ExtraWrapper } from "./styles/global";
import { Provider } from "react-redux";
import { store } from "./state/store";

class App extends React.Component {
  render(): React.ReactNode {
    return (
      <Provider store={store}>
        <ExtraWrapper className="App">
          <NavigationContainer />
          <Routes>
            <Route path="/all" element={<AllPageContainer />} />
            <Route path="/clothes" element={<ClothesPageContainer />} />
            <Route path="/tech" element={<TechnicPageContainer />} />
            <Route path="all/proguct/:id" element={<Product />} />
            <Route path="clothes/proguct/:id" element={<Product />} />
            <Route path="tech/proguct/:id" element={<Product />} />
            <Route path="*" element={<AllPageContainer />} />
          </Routes>
        </ExtraWrapper>
      </Provider>
    );
  }
}

export default App;
