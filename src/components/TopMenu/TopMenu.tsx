import React from "react";

import Cart from "../Cart/Cart";
import logotipo from "../../assets/logotipo.png";

const TopMenu = (props: any) => {
  const { products, productsCart, getProductsCart } = props;
  return (
    <div className="header__container">
      <div className="row ps-3 pe-3 borde__bottom">
        <div className="col-6 p-2 d-flex align-items-center justify-content-start">
          <div>
            <h2>Grocery</h2>
          </div>
        </div>
        <div className="col-6 d-flex justify-content-end align-items-center">
          <Cart
            products={products}
            productsCart={productsCart}
            getProductsCart={getProductsCart}
          />
        </div>
      </div>
    </div>
  );
};

export default TopMenu;
