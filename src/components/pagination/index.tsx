import React from "react";
import { Button, Typography } from "@mui/material";

type PaginationProps = {
  page: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
};

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onNextPage,
  onPrevPage,
}) => {
  return (
    <>
      <Button onClick={onPrevPage} disabled={page === 1}>
        Página Anterior
      </Button>
      <Typography variant="h6" style={{ margin: "0 10px" }}>
        Página {page} de {totalPages}
      </Typography>
      <Button onClick={onNextPage} disabled={page === totalPages}>
        Próxima Página
      </Button>
    </>
  );
};

export default Pagination;
