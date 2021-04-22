import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import api from "../../services/api";

import "./style.css";

export default function Home() {
  const [professores, setProfessores] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProfessores, setTotalProfessores] = useState(0);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  async function getProfessores() {
    // Caso os dados já estejam sendo carregados
    if (loading) {
      return;
    }

    // Caso já tenham sido carregados todos os professores
    if (totalProfessores > 0 && professores.length === totalProfessores) {
      return;
    }

    setLoading(true);

    const response = await api.get("/professores", {
      params: { page: page },
    });

    // Incluindo os novos professores carregados pela api
    setProfessores([...professores, ...response.data]);
    setTotalProfessores(response.headers["x-total-count"]);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    getProfessores();
  }, []);

  // Navegar a página do professor
  function navigateToProfessors(professor) {
    history.push({
      pathname: "/professor",
      state: {
        professor,
      },
    });
  }

  return (
    <div className="home-container">
      <header></header>

      <h1>Professores cadastrados</h1>

      <ul>
        <InfiniteScroll
          dataLength={professores.length}
          next={getProfessores}
          hasMore={true}
          className="list-scroll"
        >
          {professores.map((professor) => {
            return (
              <button
                className="card-button"
                onClick={() => navigateToProfessors(professor)}
              >
                <li key={professor.id}>
                  <strong>{professor.nome}</strong>
                  <p>{professor.qualificacao}</p>
                  <p>
                    {professor.avaliacoesCount
                      ? professor.avaliacoesCount
                      : "Sem avaliações"}
                  </p>
                </li>
              </button>
            );
          })}
        </InfiniteScroll>
      </ul>
    </div>
  );
}