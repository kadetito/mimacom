import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { ReactComponent as CartEmpty } from "../../assets/cart-empty.svg";
import { ReactComponent as CartFull } from "../../assets/cart-full.svg";
import { ReactComponent as Close } from "../../assets/close.svg";
import { ReactComponent as Garbage } from "../../assets/garbage.svg";
import {
  countDuplicatesItemArray,
  removeArrayDuplicates,
  removeItemArray,
} from "../../utils/arrayFunc";

const STR__PRODS: any = process.env.REACT_APP_STR_PRODS;

const Cart = (props: any) => {
  const { products, productsCart, getProductsCart } = props;
  const [cartOpen, setCartOpen] = useState<any>(false);
  const widthCartContent = cartOpen ? 400 : 0;
  const [singlProductscar, setSinglProductscar] = useState<any>([]);
  const [cartTotalPrice, setCartTotalPrice] = useState<any>(0);

  useEffect(() => {
    const allProductsId = removeArrayDuplicates(productsCart);
    setSinglProductscar(allProductsId);
  }, [productsCart]);

  useEffect(() => {
    const productData: { id: any; quantity: number }[] = [];
    let totalPrice = 0;
    const allProductsId = removeArrayDuplicates(productsCart);
    allProductsId.forEach((productId) => {
      const quantity = countDuplicatesItemArray(productId, productsCart);
      const productValue = {
        id: productId,
        quantity: quantity,
      };
      productData.push(productValue);
    });
    if (!products.loading && products.result) {
      products.result.forEach((product: { id: any; price: number }) => {
        productData.forEach((item) => {
          if (product.id == item.id) {
            const totalValue = product.price * item.quantity;
            totalPrice = totalValue + totalPrice;
          }
        });
      });
    }
    setCartTotalPrice(totalPrice);
  }, [productsCart, products]);

  const openCart = () => {
    setCartOpen(true);
  };

  const closCart = () => {
    setCartOpen(false);
  };

  const emptycart = () => {
    localStorage.removeItem(STR__PRODS);
    getProductsCart();
  };

  const increaseQuantity = (id: any) => {
    const arrayItemsCart = productsCart;
    arrayItemsCart.push(id);
    localStorage.setItem(STR__PRODS, arrayItemsCart);
    getProductsCart();
  };

  const decreaseQuantity = (id: { toString: () => any }) => {
    const arrayItemsCart = productsCart;
    const result = removeItemArray(arrayItemsCart, id.toString());
    localStorage.setItem(STR__PRODS, result);
    getProductsCart();
  };

  return (
    <div>
      <Button variant="link" className="cart__button">
        {productsCart.length > 0 ? (
          <CartFull onClick={openCart} />
        ) : (
          <CartEmpty onClick={openCart} />
        )}
      </Button>
      <div className="cart__content" style={{ width: widthCartContent }}>
        <div className="row">
          <div className="col-12">
            <CartContentHeader closCart={closCart} emptycart={emptycart} />
            {singlProductscar.map((idProducts: any, index: any) => (
              <CartContentProds
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                key={index}
                products={products}
                idsProductsCart={productsCart}
                idProductCart={idProducts}
              />
            ))}
            <CartContentFooter cartTotalPrice={cartTotalPrice} />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

function CartContentHeader(props: { closCart: any; emptycart: any }) {
  const { closCart, emptycart } = props;

  return (
    <div className="cart__content-header">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between">
            <div>
              <Close onClick={closCart} /> <b>Carrito</b>
            </div>
            <div>
              <Button className="boton__right" onClick={emptycart}>
                <Garbage />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartContentProds(props: {
  products: { loading: any; result: any };
  idsProductsCart: any;
  idProductCart: any;
  increaseQuantity: any;
  decreaseQuantity: any;
}) {
  const {
    products: { loading, result },
    idsProductsCart,
    idProductCart,
    increaseQuantity,
    decreaseQuantity,
  } = props;

  if (!loading && result) {
    return result.map((product: { id: any }, index: any) => {
      if (idProductCart === product.id) {
        const quantity = countDuplicatesItemArray(product.id, idsProductsCart);
        return (
          <RenderProd
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            key={index}
            product={product}
            quantity={quantity}
          ></RenderProd>
        );
      }
    });
  }
  return null;
}

function RenderProd(props: {
  product: any;
  quantity: any;
  increaseQuantity: any;
  decreaseQuantity: any;
}) {
  const { product, quantity, increaseQuantity, decreaseQuantity } = props;
  return (
    <div className="cart__contenido">
      <div className="row">
        <div className="col-12">
          <div className="card  m-3 p-3">
            <div className="row">
              <div className="col-4">
                <img
                  className="cart__imagen"
                  src={product.image_url}
                  alt={product.productName}
                />
              </div>
              <div className="col-8">
                <div className="cart__contenido_product-info">
                  <h3>{product.productName.substr(0, 55)}...</h3>
                  <h4>{product.price}€</h4>
                </div>
                <div>
                  <p>Cantidad: {quantity}</p>
                  <div>
                    <button
                      className="boton__mas-menos me-2"
                      onClick={() => increaseQuantity(product.id)}
                    >
                      +
                    </button>
                    <button
                      className="boton__mas-menos"
                      onClick={() => decreaseQuantity(product.id)}
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartContentFooter(props: { cartTotalPrice: any }) {
  const { cartTotalPrice } = props;

  return (
    <div className="cart__contenido-footer">
      <div className="row">
        <div className="col-12 text-center mt-5">
          {cartTotalPrice === 0 ? (
            <h5>No hay productos en el carro</h5>
          ) : (
            <>
              <div>
                <h4>Total: {cartTotalPrice}€</h4>
              </div>

              <Button className="mt-3 boton__tramitar">Tramitar pedido</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
