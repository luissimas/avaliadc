import React, { useState, useEffect } from 'react'

import api from '../../services/api'

import './style.css'

export default function Home(){
  const [professores, setProfessores] = useState([])

  // useEffect que carrega os dados da api apenas quando o app é carregado pela primeira vez
  useEffect(() => {
  }, [])

  return (
    <div className="home-container">
      <header>
      </header>
    </div>
  );
}
