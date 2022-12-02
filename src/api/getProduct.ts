import { gql } from "@apollo/client";

export const getProduct = gql`
  query product($id: String!) {
    product(id: $id) {
      name
      gallery
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
