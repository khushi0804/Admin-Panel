import { useState } from 'react';

const usePagination = (data, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return {
    currentData,
    currentPage,
    totalPages,
    setCurrentPage,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1
  };
};

export default usePagination;