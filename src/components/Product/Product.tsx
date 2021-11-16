import React from "react";
import { Button } from "react-bootstrap";
import { ProductsInterface } from "../../interfaces/productos.interface";

const Product = (props: ProductsInterface) => {
  const { product, addCart } = props;

  return (
    <div
      className="col-6 col-xs-4 col-sm-6  col-md-4 col-lg-3"
      key={product.id}
    >
      <div className="card m-2 p-3 mb-4">
        <div className="img-contain">
          <img
            className="card-img-top"
            alt={product.productName}
            src={product.image_url}
          />
        </div>
        <div className="card-title d-flex align-items-start justify-content-center">
          <h4>{product.productName}</h4>
        </div>
        <div className="price__estilo d-flex justify-content-center">
          <div>
            <h3>{product.price}€</h3>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 ">
            <div className="d-flex align-items-center justify-content-center">
              <div>
                <Button
                  className="boton__comprar"
                  onClick={() => addCart(product.id, product.productName)}
                >
                  Añadir al carro
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
