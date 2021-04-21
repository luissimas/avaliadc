import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

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
  useEffect(async () => {
    const response = await api.get(`/avaliacoes/${professor.id}`);

    setAvaliacoes(response.data.avaliacoes);
    setMediaAvaliacoes(response.data.media);
  }, []);

  return (
    <div className="professor-container">
      <header></header>

      <h1>AVALIACOES DO PROFESSOR PA {professor.id}</h1>

      <p>
        {professor.avaliacoesCount
          ? "Avaliações: " + professor.avaliacoesCount
          : "Esse professor ainda não possui avaliações"}
      </p>

      <p>{professor.avaliacoesCount ? "Média: " + mediaAvaliacoes : " "}</p>

      <ReactStars
        size={30}
        value={mediaAvaliacoes}
        isHalf={true}
        edit={false}
      />

      <ul>
        {avaliacoes.map((avaliacao) => {
          if(avaliacao.comentario){
            return (
              <li key={avaliacao.id}>
                <p>{avaliacao.curso}</p>
                <p>{avaliacao.comentario}</p>
              </li>
            );
          }

          return;
        })}
      </ul>
    </div>
  );
}
