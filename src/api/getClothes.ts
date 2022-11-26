import { gql } from "@apollo/client";

export const getClothesItem = gql`
  {
    category(input: { title: "clothes" }) {
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
