import { gql } from "@apollo/client";

export const getTechnic = gql`
  {
    category(input: { title: "tech" }) {
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
