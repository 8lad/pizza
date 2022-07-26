import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { nanoid } from "nanoid";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { Sort, Categories, PizzaBlock, Skeleton, Pagination } from "../components";
import { sortList } from "../utils/constants";
import { useAppDispatch } from "../redux/store";
import { selectorFilter } from "../redux/filter/selectors";
import { selectPizzaData } from "../redux/pizza/selectors";
import { fetchPizzas } from "../redux/pizza/asyncAction";
import { FilterSliceState } from "../redux/filter/types";
import { setFilters } from "../redux/filter/slice";

function Home() {
  const dispatch = useAppDispatch();
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
      const searching = !categoryId && searchValue ? `&search=${searchValue}` : "";
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
      const sortOptions = sortList.find((obj) => obj.sortProperty === params.sortProperty);
      sortOptions && dispatch(setFilters({ ...params, sort: sortOptions, searchValue: "" } as FilterSliceState));
      isSearch.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, currentPage, navigate]);

  const sceleton = [...new Array(10)].map(() => <Skeleton key={nanoid()} />);
  const pizzas = !!items.length && items.map((item) => <PizzaBlock key={item.id} {...item} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__box">
        {status === "error" ? (
          <div className="content__error-info">
            <h2>К сожалению вышла ошибочка... 😕</h2>
            <p>Попробуйте перезагрузить страницу немного позже</p>
          </div>
        ) : status === "loading" ? (
          sceleton
        ) : (
          <div className="content__items"> {pizzas} </div>
        )}
      </div>
      <Pagination />
    </div>
  );
}

export default Home;
