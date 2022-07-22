import React, { useEffect, useState } from "react";
import { SpinnerDiamond } from 'spinners-react';
import Header from "./components/Header/Header";
import Sort from "./components/Sort/Sort";
import Categories from "./components/Categories/Categories";
import PizzaBlock from "./components/PizzaBlock/PizzaBlock";


function App() {

  const [items, setItems] = useState([]);
  const [isSpinnerOn, setSpinnerOn] = useState(false);

  const fetchData = async () => {
    try {
      setSpinnerOn(true);
      const response = await fetch("https://62daf28cd1d97b9e0c497c4d.mockapi.io/items");
      if (response.ok && response.status < 400) {
        const result = await response.json();
        setSpinnerOn(false);
        setItems(result);
      }
    } catch (e) {
      setSpinnerOn(false);
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {isSpinnerOn && (<SpinnerDiamond size={50} thickness={100} speed={100} color="#36ad47" secondaryColor="rgba(57, 62, 172, 0.97)" style={{ marginLeft: "auto", marginRight: "auto" }} />)}
              {!!items.length && items.map((item) => (<PizzaBlock key={item.id} {...item} />))}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
export default App;
