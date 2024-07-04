import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';
import './pagination.css'; // Assuming you will handle styles here

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageItems = [];

    for (let i = 1; i <= totalPages; i++) {
        pageItems.push(
            <BootstrapPagination.Item key={i} active={i === currentPage} onClick={() => onPageChange(i)}>
                {i}
            </BootstrapPagination.Item>
        );
    }

    return (
        <BootstrapPagination className="justify-content-center my-4 custom-pagination">
            <BootstrapPagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />
            {pageItems}
            <BootstrapPagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        </BootstrapPagination>
    );
};

export default Pagination;
