import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Pizza {
  imageUrl: string;
  name: string;
  title: string;
  price: number;
  rating: number;
  sizes: string[];
}

const FullPizza: React.FC = () => {
  const navigate = useNavigate();
  const [pizza, setPizza] = useState<Pizza>();
  const { id } = useParams();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://62daf28cd1d97b9e0c497c4d.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (e) {
        // eslint-disable-next-line no-alert
        alert("We have some error");
        navigate("/");
      }
    }
    fetchPizza();
  }, [id, navigate]);

  if (!pizza) {
    return (
      <div className="container">
        {" "}
        <h3> Loading... </h3>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="pizza__item">
        <img src={pizza.imageUrl} alt={pizza.name} />
        <h2>Название: {pizza.title}</h2>
        <h4>Цена: {pizza.price}</h4>
        <h4>Размеры: {pizza.sizes.map((item) => `${item}см , `)}</h4>
        <h4>Рейтинг: {pizza.rating}</h4>
      </div>
    </div>
  );
};

export default FullPizza;
