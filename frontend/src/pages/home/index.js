import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import InfiniteScroll from 'react-infinite-scroll-component';

import api from '../../services/api';

import './style.css';

export default function Home() {
  const [professores, setProfessores] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalProfessores, setTotalProfessores] = useState(0);
  const [loading, setLoading] = useState(false);
  const [newSearch, setNewSearch] = useState(false);

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

    let response;

    try {
      if (searchQuery) {
        response = await api.get(`/professores/${searchQuery}`, {
          params: { page: page },
        });
      } else {
        response = await api.get('/professores', {
          params: { page: page },
        });
      }

      // Incluindo os novos professores carregados pela api
      setProfessores([...professores, ...response.data]);
      setTotalProfessores(response.headers['x-total-count']);
      setPage(page + 1);
      setLoading(false);
    } catch (error) {
      // Caso haja algum erro na request (provavelmente causado por scroll)
      setLoading(false);
      console.log(error);
    }
  }

  // Load all data on page load
  useEffect(() => {
    getProfessores();
  }, []);

  // When there's a new search clear the data loaded
  useEffect(() => {
    // If there's a new search we should clear the data
    if (newSearch) {
      setProfessores([]);
      setTotalProfessores(0);
      setPage(1);
    }
  }, [newSearch]);

  // Load the data searched after the data is cleared
  useEffect(() => {
    if (newSearch) {
      setNewSearch(false);
      getProfessores();
    }
  }, [professores]);

  // Navegar a página do professor
  function navigateToProfessors(professor) {
    history.push({
      pathname: '/professor',
      state: {
        professor,
      },
    });
  }

  return (
    <div className="home-container">
      <header></header>

      <h1>Professores cadastrados</h1>

      <form
        className="bar-container"
        onSubmit={(event) => {
          event.preventDefault();
          return setNewSearch(true);
        }}
      >
        <input
          type="text"
          className="search-text"
          placeholder="Nome do professor"
          onChange={(event) => setSearchQuery(event.target.value)}
        />

        <button className="search-button" type="submit">
          <BsSearch size={25} />
        </button>
      </form>

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
                      ? 'Avaliações recebidas: ' + professor.avaliacoesCount
                      : 'Sem avaliações'}
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
