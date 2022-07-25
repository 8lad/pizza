import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Sort from "../components/Sort";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";


function Home() {

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const fetchData = async () => {
        try {
            const response = await fetch("https://62daf28cd1d97b9e0c497c4d.mockapi.io/items");
            if (response.ok && response.status < 400) {
                const result = await response.json();
                setIsLoading(false);
                setItems(result);
            }
        } catch (e) {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="container">
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__box">
                <div className="content__items">
                    {isLoading ? [...new Array(10)].map(() => <Skeleton key={nanoid()} />) : (!!items.length && items.map((item) => (<PizzaBlock key={item.id} {...item} />)))}
                </div>
            </div>

        </div>
    );
}

export default Home;
