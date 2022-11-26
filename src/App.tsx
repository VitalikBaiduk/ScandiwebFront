import React from "react";
import "./App.css";
import styled from "styled-components";
import All from "./components/pages/all/All";
import Navigation from "./components/navigation/Navigation";

const ExtraWrapper = styled.div`
  width: 100%;
  padding: 30px 100px 100px 115px;
  box-sizing: border-box;
`;

function App() {
  return (
    <ExtraWrapper className="App">
      <Navigation />
      <All />
    </ExtraWrapper>
  );
}

export default App;
