import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../../redux/slices/filterSlice";

function Categories() {

    const { categoryId } = useSelector(state => state.filters);
    const dispatch = useDispatch();

    const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

    return (<div className="categories">
        <ul>
            {categories.length && categories.map((item, index) => (<li key={item} onClick={() => dispatch(setCategoryId(index))} className={categoryId === index ? "active" : ""}>{item}</li>))}
        </ul>
    </div>);
}

export default Categories;