import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import qs from "qs";
import { Link, useNavigate } from "react-router-dom";
import Sort from "../components/Sort";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Paginaton";
import { setFilters, selectorFilter } from "../redux/slices/filterSlice";
import { sortList } from "../utils/constants";
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzaSlice";


function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isSearch = useRef(false);
    const isMounted = useRef(false);
    const { categoryId, sort, currentPage, searchValue } = useSelector(selectorFilter);
    const { items, status } = useSelector(selectPizzaData);

    useEffect(() => {
        window.scrollTo(0, 0);
        const getPizzas = () => {
            const orderSort = sort.sortProperty.includes("-") ? "desc" : "asc";
            const sortBy = sort.sortProperty.replace("-", "");
            const category = categoryId > 0 ? `category=${categoryId}&` : "";
            const searching = (!categoryId && searchValue) ? `&search=${searchValue}` : "";
            const queryString = `https://62daf28cd1d97b9e0c497c4d.mockapi.io/items?page=${currentPage}&limit=4&${category}sortBy=${sortBy}&order=${orderSort}${searching}`;
            dispatch(fetchPizzas(queryString));
        };
        if (!isSearch.current) {
            getPizzas();
        }
        isSearch.current = false;
    }, [categoryId, sort, searchValue, currentPage, dispatch]);

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sortOptions = sortList.find(obj => obj.sortProperty === params.sortProperty);
            dispatch(setFilters({ ...params, sort: sortOptions }));
            isSearch.current = true;
        }
    }, []);

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage
            });
            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sort, currentPage, navigate]);

    const sceleton = [...new Array(10)].map(() => <Skeleton key={nanoid()} />);
    const pizzas = (!!items.length && items.map((item) => (<Link key={item.id} to={`/pizza/${item.id}`}><PizzaBlock {...item} /></Link>)));

    return (
        <div className="container">
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__box">

                {status === "error" ? <div className="content__error-info">
                    <h2>К сожалению вышла ошибочка... 😕</h2>
                    <p>Попробуйте перезагрузить страницу немного позже</p>
                </div> : status === "loading" ? sceleton : <div className="content__items"> {pizzas} </div>}
            </div>
            <Pagination />
        </div>
    );
}

export default Home;



