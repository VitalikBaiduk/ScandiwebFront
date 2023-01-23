import { gql } from "@apollo/client";

export const getTechnic = gql`
  query {
    category(input: { title: "tech" }) {
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
