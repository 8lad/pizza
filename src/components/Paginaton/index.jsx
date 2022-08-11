import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import style from "./Pagination.module.scss";
import { setCurrentPage } from "../../redux/slices/filterSlice";


export default function Pagination() {
    const dispatch = useDispatch();
    const handlePageClick = (e) => {
        dispatch(setCurrentPage(e.selected + 1));
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
            renderOnZeroPageCount={null}
        />
    );
}
