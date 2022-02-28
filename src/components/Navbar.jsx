import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../global/CartContext";
const Navbar = () => {
  const { qty } = useContext(CartContext);
  console.log(qty);
  return (
    <nav>
      <ul className="left">
        <li>
          <Link to="/">BanglaExpress</Link>
        </li>{" "}
      </ul>
      <ul className="right">
        <li>
          <Link to="cart">
            <span className="shoppingCart">
              <i className="fa-solid fa-cart-plus"></i>
              <span className="cartCount">{qty}</span>
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
