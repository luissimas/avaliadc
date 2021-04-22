import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import StarRatings from "react-star-ratings";
import InfiniteScroll from "react-infinite-scroll-component";

import HomeLink from "../../components/homelink";

import api from "../../services/api";

import "./style.css";

export default function Professor() {
  const [mediaAvaliacoes, setMediaAvaliacoes] = useState(0);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalAvaliacoes, setTotalAvaliacoes] = useState(0);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  // TODO: handle when entering the direct /professor link
  if (!history.location.state) {
    history.push("/");
  }

  const professor = history.location.state.professor;

  async function getAvaliacoes() {
    // Caso os dados já estejam sendo carregados
    if (loading) {
      return;
    }

    // Caso já tenham sido carregados todos os professores
    if (totalAvaliacoes > 0 && avaliacoes.length === totalAvaliacoes) {
      return;
    }

    const response = await api.get(`/avaliacoes/${professor.id}`, {
      params: { page: page },
    });

    // Incluindo as novas avaliações
    setAvaliacoes([...avaliacoes, ...response.data.avaliacoes]);
    setMediaAvaliacoes(response.data.media);
    setTotalAvaliacoes(response.headers["x-total-count"]);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    getAvaliacoes();
  }, [professor.id]);

  // Navegar a página de avaliações
  function navigateToAvaliar(professor) {
    history.push({
      pathname: "/avaliar",
      state: {
        professor,
      },
    });
  }

  return (
    <div className="professor-container">
      <header>
        <h1>{professor.nome}</h1>
        <HomeLink />
      </header>

      <header>
        <p>
          {professor.avaliacoesCount
            ? "Avaliações: " + professor.avaliacoesCount
            : "Esse professor ainda não possui avaliações"}
        </p>

        <p>{professor.avaliacoesCount ? "Média: " + mediaAvaliacoes : " "}</p>

        <StarRatings
          rating={parseFloat(mediaAvaliacoes)}
          starDimension="40px"
          starSpacing="15px"
          starRatedColor="#ffb400"
        />

        <button className="button" onClick={() => navigateToAvaliar(professor)}>
          Avaliar
        </button>
      </header>

      <ul>
        <InfiniteScroll
          dataLength={avaliacoes.length}
          next={getAvaliacoes}
          hasMore={true}
          className="list-scroll"
        >
          {avaliacoes.map((avaliacao) => {
            if (avaliacao.comentario) {
              return (
                <li key={avaliacao.id}>
                  <p className="comment">{avaliacao.id} {avaliacao.comentario}</p>
                  <p className="signature">
                    - {avaliacao.curso}, {avaliacao.ano_ingresso}
                  </p>
                </li>
              );
            }

            return " ";
          })}
        </InfiniteScroll>
      </ul>
    </div>
  );
}
