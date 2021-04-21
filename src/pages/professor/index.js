import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import StarRatings from "react-star-ratings";

import HomeLink from "../../components/homelink";

import api from "../../services/api";

import "./style.css";

export default function Professor() {
  const [mediaAvaliacoes, setMediaAvaliacoes] = useState(0);
  const [avaliacoes, setAvaliacoes] = useState([]);

  const history = useHistory();

  // TODO: handle when entering the direct /professor link
  if (!history.location.state) {
    history.push("/");
  }

  const professor = history.location.state.professor;

  // Carrega as avaliações do professor ao carregar a página
  useEffect(() => {
    async function getAvaliacoes() {
      const response = await api.get(`/avaliacoes/${professor.id}`);

      setAvaliacoes(response.data.avaliacoes);
      setMediaAvaliacoes(response.data.media);
    }

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
        {avaliacoes.map((avaliacao) => {
          if (avaliacao.comentario) {
            return (
              <li key={avaliacao.id}>
                <p className="comment">{avaliacao.comentario}</p>
                <p className="signature">
                  - {avaliacao.curso}, {avaliacao.ano_ingresso}
                </p>
              </li>
            );
          }

          return " ";
        })}
      </ul>
    </div>
  );
}
