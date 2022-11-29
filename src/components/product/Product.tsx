import React, { Component } from "react";
import { graphql } from "@apollo/client/react/hoc";
import { getProduct } from "../../api/getProduct";
import { ChildProps } from "react-apollo";

class Product extends Component<any, any> {
  render(): React.ReactNode {
    const { loading, data } = this.props.data;
    // const { products } = this.props.data.category
    //   ? this.props.data.category
    //   : { products: [] };
    console.log(this.props.data);

    // console.log(loading);
    // console.log(data);

    return <>some data</>;
  }
}

export default graphql<{ id: string }>(getProduct, {
  options: ({ id }) => ({
    variables: { id },
  }),
})(Product);
