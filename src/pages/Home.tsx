import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import { ProductsInterface } from "../interfaces/productos.interface";
import Products from "../components/Products/Products";
import TopMenu from "../components/TopMenu/TopMenu";
import useFetch from "../hooks/useFetch";
import lupa from "../assets/search.svg";

const baseUrl: any = process.env.REACT_APP_API_URL;
const STR__PRODS: any = process.env.REACT_APP_STR_PRODS;

function Home() {
  const url = `db.json`;
  const products: any = useFetch(url, null);

  const [productsCart, setProductsCart] = useState<any>([]);
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState<any>([]);

  useEffect(() => {
    getProductsCart();
  }, []);

  const getProductsCart = () => {
    const idsProducts = localStorage.getItem(STR__PRODS);
    if (idsProducts) {
      const idsProductsSplit = idsProducts.split(",");
      setProductsCart(idsProductsSplit);
    } else {
      setProductsCart([]);
    }
  };

  const addCart = (id: any, productName: any) => {
    const idsProducts = productsCart;
    idsProducts.push(id);
    setProductsCart(idsProducts);
    localStorage.setItem(STR__PRODS, productsCart);
    getProductsCart();
    toast.success(`${productName} añadido correctamente`);
  };

  const handleChange = (e: any) => {
    setBusqueda(e.target.value);
    filtrado(e.target.value);
  };

  const filtrado = (busqueda: any) => {
    let result = products.result.filter(
      (elemento: { productName: { toString: () => string } }) => {
        if (
          elemento.productName
            .toString()
            .toLowerCase()
            .includes(busqueda.toLowerCase())
        ) {
          return elemento;
        }
      }
    );
    const loading = false;
    const error = null;
    setResultados({ loading, result, error });
  };

  return (
    <>
      <TopMenu
        products={products}
        productsCart={productsCart}
        getProductsCart={getProductsCart}
      />

      <div className="container">
        <div className="row mt-0">
          <div className="col-12">
            <div className="header__container">
              <div className="row ps-5 pe-3 borde__bottom-min mb-4">
                <div className="col-md-6 m-0 pt-2 ">
                  <Breadcrumb />
                </div>
                <div className="col-md-6 m-0 pt-4 pb-4 ">
                  <div className="media_margin d-flex justify-content-start">
                    <input
                      name="busqueda"
                      onChange={handleChange}
                      value={busqueda}
                      type="text"
                      className="form-control"
                      placeholder="Filtrar productos"
                    />
                    <Button
                      className="boton__buscar"
                      disabled={true}
                      type="button"
                      id="button-addon2"
                    >
                      <img className="glass__icon" src={lupa} alt="Search" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {resultados.length === 0 ? (
              <Products products={products} addCart={addCart} />
            ) : (
              <Products products={resultados} addCart={addCart} />
            )}
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        hideProgressBar
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable
        pauseOnHover={false}
      />
    </>
  );
}

export default Home;
