import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card } from "reactstrap";
import { CartContext } from "../global/CartContext";
toast.configure();
const Cart = () => {
  const navigate = useNavigate();
  const { shoppingCart, totalPrice, qty, dispatch } = useContext(CartContext);
  const handleToken = async (token) => {
    console.log(token);
    const product = { name: "All products", price: totalPrice };
    const response = await axios.post("http://localhost:8080/checkout", {
      product,
      token,
    });

    const { status } = response.data;
    if (status === "success") {
      dispatch({ type: "EMPTY" });
      navigate("/");
      toast.success(
        "You have paid successfully,You can continue your shopping",
        { position: toast.POSITION.TOP_RIGHT }
      );
    }
  };
  return (
    <Card className="cart-container">
      <div className="cart-details" style={{ marginTop: "100px" }}>
        {shoppingCart.length > 0 ? (
          shoppingCart.map((cart) => (
            <div className="cart" key={cart.id}>
              <span className="cart-image">
                <img src={cart.image} alt="not found" />
              </span>
              <span className="cart-product-name">{cart.name}</span>
              <span className="cart-product-price">${cart.price}.00</span>
              <span
                className="increment"
                onClick={() =>
                  dispatch({ type: "INCREMENT", id: cart.id, cart: cart })
                }
              >
                <i className="fa-solid fa-plus"></i>
              </span>
              <span className="product-quantity">{cart.qty}</span>
              <span
                className="decrement"
                onClick={() =>
                  dispatch({
                    type: "DECREMENT",
                    id: cart.id,
                    cart: cart,
                  })
                }
              >
                <i className="fa-solid fa-minus"></i>
              </span>
              <span className="product-total-price">
                {cart.price * cart.qty}
              </span>
              <span
                className="delete-product"
                onClick={() =>
                  dispatch({
                    type: "DELETE_PRODUCT",
                    id: cart.id,
                    cart: cart,
                  })
                }
              >
                <i className="fa-solid fa-trash"></i>
              </span>
            </div>
          ))
        ) : (
          <div className="empty">Sorry your cart is currently empty</div>
        )}
      </div>
      {shoppingCart.length ? (
        <div className="cart-summary">
          <div className="summary">
            <h3>Cart Summary</h3>
            <div className="total-items">
              <div className="items">Total Items</div>
              <div className="items-count">{qty}</div>
            </div>

            <div className="total-price-section">
              <div className="total-price-title">Total Price</div>
              <div className="items-price">${totalPrice}.00</div>
            </div>
            <div className="stripe-section">
              <StripeCheckout
                stripeKey="pk_test_51KXbxLLZaK5XVv1qTxpKekcsa7ye35UpL7Cjov31OXtMwZp9hB8L4Evv1j8v7sQPgSOilueux3kAWnvIteUe0jH600CHBi8Rod"
                token={handleToken}
                billingAddress
                shippingAddress
                amount={totalPrice * 100}
                name="All Products"
              ></StripeCheckout>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </Card>
  );
};

export default Cart;
