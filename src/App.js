import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import Products from "./components/Products";
import CartContextProvider from "./global/CartContext";
import ProductContextProvider from "./global/ProductContext";
function App() {
  return (
    <Fragment>
      <ProductContextProvider>
        <CartContextProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Products />}></Route>

              <Route path="cart" element={<Cart />}></Route>

              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </BrowserRouter>
        </CartContextProvider>
      </ProductContextProvider>
    </Fragment>
  );
}

export default App;
