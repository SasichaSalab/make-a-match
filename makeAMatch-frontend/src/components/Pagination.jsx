import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const CustomPagination = ({ totalPost, postPerPage, setCurrentPage, currentPage }) => {
  const pageCount = Math.ceil(totalPost / postPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Stack spacing={2} direction="row" justifyContent="center" alignItems="center">
      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
      />
    </Stack>
  );
};

export default CustomPagination;
