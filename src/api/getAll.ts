import { gql } from "@apollo/client";

export const getAllItem = gql`
  query {
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
