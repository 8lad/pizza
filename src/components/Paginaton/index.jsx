import ReactPaginate from "react-paginate";
import style from "./Pagination.module.scss";



export default function Pagination({ onChangePage }) {
    const handlePageClick = (e) => {
        onChangePage(e.selected + 1);
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
