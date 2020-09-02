import React from "react";

import "./paginacao.css";

interface PaginacaoProps {
  totalMovies: any;
  moviesPerPage: any;
  paginate: any;
  currentPage: any;
}

export default function Paginacao(props: PaginacaoProps) {
  const { totalMovies, moviesPerPage, paginate, currentPage } = props;

  const result: any = [];

  for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    result.push(i);
  }

  return (
    <nav>
      <div className="content">
        {result.map((page: any) => (
          <div
            key={page}
            onClick={() => paginate(page)}
            className={
              currentPage === page ? "numero-pagina" : "numero-pagina2"
            }
          >
            <span>{page}</span>
          </div>
        ))}
      </div>
    </nav>
  );
}
