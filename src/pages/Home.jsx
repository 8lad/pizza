import { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { nanoid } from "nanoid";
import axios from "axios";
import Sort from "../components/Sort";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Paginaton";
import SearchContext from "../context/Context";


function Home() {

    const { categoryId, sort, currentPage } = useSelector(state => state.filters);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { searchValue } = useContext(SearchContext);

    useEffect(() => {
        const orderSort = sort.sortProperty.includes("-") ? "desc" : "asc";
        const sortBy = sort.sortProperty.replace("-", "");
        const category = categoryId > 0 ? `category=${categoryId}&` : "";
        const searching = (!categoryId && searchValue) ? `&search=${searchValue}` : "";
        const queryString = `https://62daf28cd1d97b9e0c497c4d.mockapi.io/items?page=${currentPage}&limit=4&${category}sortBy=${sortBy}&order=${orderSort}${searching}`;

        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(queryString);
                if (response.statusText === "OK" && response.status < 400) {
                    const result = response.data;
                    setIsLoading(false);
                    setItems(result);
                }
            } catch (e) {
                setIsLoading(false);
            }
        };
        fetchData();
        window.scrollTo(0, 0);
    }, [categoryId, sort, searchValue, currentPage]);

    const sceleton = [...new Array(10)].map(() => <Skeleton key={nanoid()} />);
    const pizzas = (!!items.length && items.map((item) => (<PizzaBlock key={item.id} {...item} />)));

    return (
        <div className="container">
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__box">
                <div className="content__items">
                    {isLoading ? sceleton : pizzas}
                </div>
            </div>
            <Pagination />
        </div>
    );
}

export default Home;



