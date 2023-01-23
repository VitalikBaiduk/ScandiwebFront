import { gql } from "@apollo/client";

export const getClothesItem = gql`
  query {
    category(input: { title: "clothes" }) {
      name
      products {
        id
        name
        gallery
        inStock
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
