import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import style from "./Pagination.module.scss";
import { setCurrentPage } from "../../redux/slices/filterSlice";

const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const handlePageClick = (eventObject: { selected: number }) => {
    dispatch(setCurrentPage(eventObject.selected + 1));
  };
  return (
    <ReactPaginate
      className={style.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
    />
  );
};

export default Pagination;
