import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";

import "./style.css";

export default function Home() {
  const [professores, setProfessores] = useState([]);

  // useEffect que carrega os dados da api apenas quando o app é carregado pela primeira vez
  useEffect(() => {
    api.get("/professores").then((response) => {
      setProfessores(response.data);
    });
  }, []);

  return (
    <div className="home-container">
      <header></header>

      <h1>Professores cadastrados</h1>

      <ul>
        {professores.map((professor) => {
          return (
            <Link className="card-button" to="/professor">
              <li key={professor.id}>
                <strong>{professor.nome}</strong>
                <p>{professor.qualificacao}</p>
                <p>{professor.avaliacoes ? 'Média: ' + professor.media:''}</p>
                <p>{professor.avaliacoes ? professor.avaliacoes:'Sem avaliações' }</p>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
