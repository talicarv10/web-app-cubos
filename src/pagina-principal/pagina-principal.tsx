import React, { useState, useEffect, useCallback } from "react";

import "./pagina-principal.css";
import ListaFilmes from "../lista-filmes/lista-filmes";
import api from "../services/api";

export default function PaginaPrincipal() {
  const [busca, setBusca] = useState("");
  const [listaFilmes, setListaFilmes] = useState<any>([]);

  const carregarFilmes = useCallback(() => {
    async function carregar() {
      if (busca !== "") {
        const filmes = await api.get(
          `search/movie?api_key=1163d4f9a2b3979656b92a57898217ae&language=pt-BR&query=${busca}`
        );
        setListaFilmes(filmes.data.results);
      }
    }
    carregar();
  }, [busca]);

  useEffect(() => {
    carregarFilmes();
  }, [busca, carregarFilmes]);

  const pesquisar = (e: any) => {
    e.preventDefault();
    if (e.target.value !== "") {
      setBusca(e.target.value);
      const filtrados = listaFilmes.filter((item: any) => {
        const lc = item.title.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
      setListaFilmes(filtrados);
    } else {
      setListaFilmes([]);
    }
  };

  return (
    <>
      <header className="cabecalho">
        <h1 className="titulo-cabecalho">Movies</h1>
      </header>

      <div className="container">
        <input
          type="text"
          className="textoBusca"
          placeholder="Busque por um filme por nome, ano ou gênero..."
          onChange={(e) => pesquisar(e)}
        />

        <ListaFilmes listaFilmes={listaFilmes} busca={busca} />
      </div>
    </>
  );
}
