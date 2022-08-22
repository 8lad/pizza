import { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
// eslint-disable-next-line import/no-extraneous-dependencies
import { setCategoryId } from "../../redux/slices/filterSlice";
import { RootState } from "../../redux/store";

const categories: string[] = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

const Categories: React.FC = memo(() => {
  const { categoryId } = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch();
  const onChangeCategory = useCallback((index: number) => dispatch(setCategoryId(index)), [dispatch]);

  return (
    <div className="categories">
      <ul>
        {categories.length &&
          categories.map((item, index) => (
            <li key={item} onClick={() => onChangeCategory(index)} className={categoryId === index ? "active" : ""}>
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
});

export default Categories;
