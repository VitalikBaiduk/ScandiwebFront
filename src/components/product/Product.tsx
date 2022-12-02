import React, { Component } from "react";
import { graphql } from "@apollo/client/react/hoc";
import { getProduct } from "../../api/getProduct";
import { withRouter } from "../utils/withRouter";

class Product extends Component<any, any> {
  componentDidMount(): void {
    const id = this.props.params;
    console.log(id);
  }

  render(): React.ReactNode {
    const { loading, data } = this.props.data;
    // const { products } = this.props.data.category
    //   ? this.props.data.category
    //   : { products: [] };
    console.log(this.props);

    // console.log(loading);
    // console.log(data);

    return <>some data</>;
  }
}

export default withRouter(
  graphql<{ id: string }>(getProduct, {
    options: ({ id }) => ({
      variables: { id },
    }),
  })(Product)
);
