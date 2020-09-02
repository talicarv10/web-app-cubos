import React, { useState, useEffect } from "react";

import "./lista-filmes.css";
import api from "../services/api";
import Paginacao from "../componentes/paginacao/paginacao";

interface ListaFilmesProps {
  listaFilmes: any;
  busca: any;
}

export default function ListaFilmes(props: ListaFilmesProps) {
  const { listaFilmes, busca } = props;
  const [listaGeneros, setListaGeneros] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(5);

  useEffect(() => {
    carregarGeneros();
  }, [listaFilmes]);

  function formatarData(data: any) {
    if (data) {
      var ano = data.split("-")[0];
      var mes = data.split("-")[1];
      var dia = data.split("-")[2];

      return dia + "/" + mes + "/" + ano;
    }
  }

  async function carregarGeneros() {
    const generos = await api.get(
      "genre/movie/list?api_key=1163d4f9a2b3979656b92a57898217ae&language=pt-BR"
    );
    setListaGeneros(generos.data.genres);
  }

  function compararGeneros(id: any) {
    const filtrados = listaGeneros.find(
      (listaGeneros: any) => listaGeneros.id === id
    );
    return filtrados.name;
  }

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = listaFilmes.slice(indexOfFirstMovie, indexOfLastMovie);

  function paginate(pageNumber: any) {
    document.documentElement.scrollTop = 0;
    return setCurrentPage(pageNumber);
  }

  return (
    <>
      {currentMovies.map((filme: any) => (
        <div key={filme.id} className=" card">
          <img
            src={
              filme.poster_path
                ? `https://image.tmdb.org/t/p/w500/${filme.poster_path}`
                : ""
            }
            alt="imagem"
          />
          <div className="conteudo">
            <div className="titulo-filme">
              <h2>
                {filme.title}
                <div className="pontuacao">
                  <span>{parseInt(filme.popularity)}%</span>
                </div>
              </h2>
            </div>
            <div className="data">{formatarData(filme.release_date)}</div>
            <div className="descricao">
              <h5>{filme.overview}</h5>
              {filme.genre_ids.map((genero: any) => (
                <button key={genero} className="btn">
                  {compararGeneros(genero)}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
      {busca !== "" ? (
        <Paginacao
          moviesPerPage={moviesPerPage}
          totalMovies={listaFilmes.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      ) : null}
    </>
  );
}
