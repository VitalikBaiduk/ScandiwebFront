import { gql } from "@apollo/client";

export const getProduct = gql`
  query product($id: String!) {
    product(id: $id) {
      name
      brand
      gallery
      description
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
    }
  }
`;
