import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../../redux/slices/filterSlice";
import { RootState } from "../../redux/store";

function Categories() {
  const { categoryId } = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch();

  const categories: string[] = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

  return (
    <div className="categories">
      <ul>
        {categories.length &&
          categories.map((item, index) => (
            <li
              key={item}
              onClick={() => dispatch(setCategoryId(index))}
              className={categoryId === index ? "active" : ""}>
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Categories;
