import { Pagination } from "@nextui-org/react";

export const ProductsPagination = ({ total, onChange, currentPage }) => (
    <Pagination
        role="pagination"
        className="mt-4"
        total={total}
        page={currentPage}
        onChange={onChange}
    />
);
