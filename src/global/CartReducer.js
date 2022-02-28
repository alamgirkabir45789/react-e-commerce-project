/* eslint-disable no-unreachable */
export const CartReducer = (state, action) => {
  const { shoppingCart, totalPrice, qty } = state;

  let product;
  let index;
  let updatedPrice;
  let updatedQty;

  console.log("Qty", qty);
  switch (action.type) {
    case "ADD_TO_CART":
      const check = shoppingCart.find((item) => item.id === action.id);
      if (check) {
        return state;
      } else {
        product = action.product;
        product["qty"] = 1;
        updatedQty = qty + 1;
        updatedPrice = totalPrice + product.price;
        return {
          shoppingCart: [product, ...shoppingCart],
          totalPrice: updatedPrice,
          qty: updatedQty,
        };
      }
      break;

    case "INCREMENT":
      product = { ...action.cart };
      product.qty = product.qty + 1;
      updatedPrice = totalPrice + product.price;
      updatedQty = qty + 1;
      index = shoppingCart.findIndex((cart) => cart.id === action.id);
      shoppingCart[index] = product;

      return {
        shoppingCart: [...shoppingCart],
        totalPrice: updatedPrice,
        qty: updatedQty,
      };
      break;
    case "DECREMENT":
      console.log("res");

      product = { ...action.cart };
      if (product.qty > 1) {
        product.qty = product.qty - 1;
        updatedPrice = totalPrice - product.price;
        updatedQty = qty - 1;
        index = shoppingCart.findIndex((cart) => cart.id === action.id);
        shoppingCart[index] = product;
        return {
          shoppingCart: [...shoppingCart],
          totalPrice: updatedPrice,
          qty: updatedQty,
        };
      } else {
        return state;
      }
      break;
    case "DELETE_PRODUCT":
      const filteredProduct = shoppingCart.filter(
        (product) => product.id !== action.id
      );
      product = action.cart;
      updatedQty = qty - product.qty;
      updatedPrice = totalPrice - product.price * product.qty;
      return {
        shoppingCart: [...filteredProduct],
        totalPrice: updatedPrice,
        qty: updatedQty,
      };
      break;
    case "EMPTY":
      return { shoppingCart: [], totalPrice: 0, qty: 0 };
      break;
    default:
      return state;
  }
};
