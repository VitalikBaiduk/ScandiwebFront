import { gql } from "@apollo/client/core";
import React, { Component } from "react";
import { graphql } from "@apollo/client/react/hoc";
import styled from "styled-components";

const getAllItem = gql`
  {
    category(input: { title: "all" }) {
      name
      products {
        id
        name
        gallery
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;

const Wrapper = styled.div`
  width: 100%;
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  margin-top: 80px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 42px;
  line-height: 160%;
  color: #1d1f22;
`;

class All extends Component {
  render(): React.ReactNode {
    console.log(this.props);

    return (
      <Wrapper>
        <Title>All</Title>
      </Wrapper>
    );
  }
}

export default graphql(getAllItem)(All);
