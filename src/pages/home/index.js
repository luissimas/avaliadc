import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import api from "../../services/api";

import "./style.css";

export default function Home() {
  const [professores, setProfessores] = useState([]);

  const history = useHistory();

  // useEffect que carrega os dados da api apenas quando o app é carregado pela primeira vez
  useEffect(() => {
    async function getProfessores() {
      const response = await api.get("/professores");
      setProfessores(response.data);
    }

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
      </ul>
    </div>
  );
}
