import React, { createContext, useState } from "react";
import dslr from "../assets/dslr.jpg";
import headphone from "../assets/headphone.jpg";
import iPhone from "../assets/i-phone.jpg";
import microphone from "../assets/microphone.jpg";
import perfume from "../assets/perfume.jpg";
import ring from "../assets/ring.jpg";
import shoes from "../assets/shoes.jpg";
import watch from "../assets/watch.jpg";

export const ProductContext = createContext();
const ProductContextProvider = (props) => {
  const [products] = useState([
    {
      id: 1,
      name: "DSLR",
      price: 2300,
      image: dslr,
      status: "hot",
    },
    {
      id: 2,
      name: "Watch",
      price: 1300,
      image: watch,
      status: "new",
    },
    {
      id: 3,
      name: "Shoes",
      price: 900,
      image: shoes,
      status: "hot",
    },
    {
      id: 4,
      name: "Perfume",
      price: 200,
      image: perfume,
      status: "hot",
    },
    {
      id: 5,
      name: "Ring",
      price: 700,
      image: ring,
      status: "new",
    },
    {
      id: 6,
      name: "Microphone",
      price: 900,
      image: microphone,
      status: "new",
    },
    {
      id: 7,
      name: "I-Phone",
      price: 800,
      image: iPhone,
      status: "hot",
    },
    {
      id: 8,
      name: "Head Phones",
      price: 500,
      image: headphone,
      status: "new",
    },
  ]);
  return (
    <ProductContext.Provider value={{ products: [...products] }}>
      {props.children}
    </ProductContext.Provider>
  );
};
export default ProductContextProvider;
