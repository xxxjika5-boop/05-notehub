import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
console.log("ReactPaginate type:", typeof ReactPaginate);

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={page - 1}
      onPageChange={(selected) => onPageChange(selected.selected + 1)}
      previousLabel="←"
      nextLabel="→"
      breakLabel="..."
      containerClassName={css.pagination}
      activeClassName={css.active}
      disabledClassName={css.disabled}
    />
  );
};

export default Pagination;
