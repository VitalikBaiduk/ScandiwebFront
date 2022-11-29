import React from "react";
import "./App.css";
import styled from "styled-components";
import Navigation from "./components/navigation/Navigation";
import All from "./components/pages/all/All";
import Clothes from "./components/pages/clothes/Clothes";
import { Route, Routes } from "react-router-dom";
import Technic from "./components/pages/tech/Technic";
import Product from "./components/product/Product";

const ExtraWrapper = styled.div`
  width: 100%;
  padding: 30px 100px 100px 115px;
  box-sizing: border-box;
`;

function App() {
  return (
    <ExtraWrapper className="App">
      <Navigation />
      <Routes>
        <Route path="/all" element={<All />} />
        <Route path="/clothes" element={<Clothes />} />
        <Route path="/tech" element={<Technic />} />
        <Route path="*" element={<All />} />
      </Routes>
      <Product id={"ps-5"} />
    </ExtraWrapper>
  );
}

export default App;
