import React, { useEffect, useState, useContext } from "react";
import { nanoid } from "nanoid";
import Sort from "../components/Sort";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Paginaton";
import SearchContext from "../context/Context";


function Home() {

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortType, setSortType] = useState({ name: "популярности: возрастание", sortProperty: "rating" });
    const { searchValue } = useContext(SearchContext);


    useEffect(() => {
        const orderSort = sortType.sortProperty.includes("-") ? "desc" : "asc";
        const sortBy = sortType.sortProperty.replace("-", "");
        const category = categoryId > 0 ? `category=${categoryId}&` : "";
        const searching = (!categoryId && searchValue) ? `&search=${searchValue}` : "";
        const queryString = `https://62daf28cd1d97b9e0c497c4d.mockapi.io/items?page=${currentPage}&limit=4&${category}sortBy=${sortBy}&order=${orderSort}${searching}`;

        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(queryString);
                if (response.ok && response.status < 400) {
                    const result = await response.json();
                    setIsLoading(false);
                    setItems(result);
                }
            } catch (e) {
                setIsLoading(false);
            }
        };
        fetchData();
        window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue, currentPage]);

    const sceleton = [...new Array(10)].map(() => <Skeleton key={nanoid()} />);
    const pizzas = (!!items.length && items.map((item) => (<PizzaBlock key={item.id} {...item} />)));

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={setCategoryId} />
                <Sort value={sortType} onChangeSort={setSortType} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__box">
                <div className="content__items">
                    {isLoading ? sceleton : pizzas}
                </div>
            </div>
            <Pagination onChangePage={(number) => setCurrentPage(number)} />
        </div>
    );
}

export default Home;



