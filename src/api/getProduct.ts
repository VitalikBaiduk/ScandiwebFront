import { gql } from "@apollo/client";

export const getProduct = gql`
  query product($id: String!) {
    product(id: $id!) {
      name
    }
  }
`;
