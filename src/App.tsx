import React from "react";
import "./App.css";
import styled from "styled-components";
import Navigation from "./components/navigation/Navigation";
import All from "./components/pages/all/All";
import Clothes from "./components/pages/clothes/Clothes";
import { Route, Routes } from "react-router-dom";
import Technic from "./components/pages/tech/Technic";
import Product from "./components/product/Product";
import { ExtraWrapper } from "./styles/global";

function App() {
  return (
    <ExtraWrapper className="App">
      <Navigation />
      <Routes>
        <Route path="/all" element={<All />} />
        <Route path="/clothes" element={<Clothes />} />
        <Route path="/tech" element={<Technic />} />
        <Route path="all/proguct/:id" element={<Product />} />
        <Route path="clothes/proguct/:id" element={<Product />} />
        <Route path="tech/proguct/:id" element={<Product />} />
        <Route path="*" element={<All />} />
      </Routes>
    </ExtraWrapper>
  );
}

export default App;
