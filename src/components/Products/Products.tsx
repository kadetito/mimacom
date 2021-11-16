import React from "react";
import { ProductsInterface } from "../../interfaces/productos.interface";

import Loader from "../Loader/Loader";
import Product from "../Product/Product";

const Products = ({ ...props }) => {
  const {
    products: { loading, result },
    addCart,
  } = props;
  //console.log(props.products.result);
  return (
    <div className="row item__global">
      {loading || !result ? (
        <>
          <Loader />
        </>
      ) : (
        result.map((product: any, index: any) => (
          <Product key={index} product={product} addCart={addCart} />
        ))
      )}
    </div>
  );
};

export default Products;
