import React from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

const productList = [
  {
    id: 1,
    name: "Mac Book",
    price: 1200,
    imgSrc:
      "https://img.freepik.com/premium-psd/laptop-psd-mockup-with-gradient-led-light_53876-138283.jpg",
  },
  {
    id: 2,
    name: "Iphone",
    price: 800,
    imgSrc: "https://dummyjson.com/image/i/products/2/1.jpg",
  },
];

const Home = () => {
  const dispatch = useDispatch();
  const addTocartHandler = (options) => {
    dispatch({ type: "addToCart", payload: options });
    toast.success("Added to Cart Successfully.");
    dispatch({
      type: "calculateTotal",
    });
  };
  return (
    <div className="Home">
      {productList.map((i) => (
        <ProductCard
          key={i.id}
          imgSrc={i.imgSrc}
          name={i.name}
          price={i.price}
          id={i.id}
          handler={addTocartHandler}
        />
      ))}
    </div>
  );
};

const ProductCard = ({ name, id, price, handler, imgSrc }) => (
  <div className="productCard">
    <img src={imgSrc} alt={name} />
    <p>{name}</p>
    <h4>{price}</h4>
    <button onClick={() => handler({ id, name, imgSrc, quantity: 1, price })}>
      Add to Cart
    </button>
  </div>
);
export default Home;
