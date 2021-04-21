import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { Select, MenuItem } from "@material-ui/core";

import api from "../../services/api";

import "./style.css";

export default function Avaliar() {
  const history = useHistory();

  // TODO: handle when entering the direct /professor link
  if (!history.location.state) {
    history.push("/");
  }

  const professor = history.location.state.professor;

  const [curso, setCurso] = useState("");
  const [ano_ingresso, setAno_ingresso] = useState(2021);
  const [comentario, setComentario] = useState("");
  const [avaliacao_conhecimento, setAvaliacao_conhecimento] = useState(0);
  const [avaliacao_didatica, setAvaliacao_didatica] = useState(0);
  const [avaliacao_tirar_duvidas, setAvaliacao_tirarDuvidas] = useState(0);
  const [avaliacao_dialogo, setAvaliacao_dialogo] = useState(0);
  const [
    avaliacao_metodo_avaliativo,
    setAvaliacao_medoto_avaliativo,
  ] = useState(0);
  const [avaliacao_conteudo_cobrado, setAvaliacao_conteudo_cobrado] = useState(
    0
  );
  const [avaliacao_correcao, setAvaliacao_correcao] = useState(0);
  const [avaliacao_materiais, setAvaliacao_materiais] = useState(0);
  const [avaliacao_cuidado_ofensivo, setAvaliacao_cuidado_ofensivo] = useState(
    0
  );
  const [cobra_presenca, setCobra_presenca] = useState(false);
  const [professor_id] = useState(professor.id);

  async function handleAvaliar(event) {
    // Prevent page from reload
    event.preventDefault();

    const data = {
      curso,
      ano_ingresso,
      comentario,
      avaliacao_conhecimento,
      avaliacao_didatica,
      avaliacao_tirar_duvidas,
      avaliacao_dialogo,
      avaliacao_metodo_avaliativo,
      avaliacao_conteudo_cobrado,
      avaliacao_correcao,
      avaliacao_materiais,
      avaliacao_cuidado_ofensivo,
      cobra_presenca,
      professor_id,
    };

    const response = await api.post("/avaliacoes", data);

    // Check if response was sucessful
    if (response.status === 204) {
      // Return to page of the same professor
      history.push({
        pathname: "/professor",
        state: {
          professor,
        },
      });
    }
  }

  return (
    <div className="avaliar-container">
      <header></header>

      <form onSubmit={handleAvaliar}>
        <div className="select-container">
          <span>Seu curso:</span>
          <Select
            style={{ minWidth: 200 }}
            variant="standard"
            value={curso}
            onChange={(event) => setCurso(event.target.value)}
            displayEmpty={true}
            renderValue={(value) => {
              if (!value) {
                return "Selecione um curso";
              } else {
                return value;
              }
            }}
          >
            <MenuItem value="BCC">BCC</MenuItem>
            <MenuItem value="ENC">ENC</MenuItem>
            <MenuItem value="Outro">Outro</MenuItem>
          </Select>
        </div>

        <div className="select-container">
          <span>Seu ano de ingresso:</span>
          <Select
            style={{ minWidth: 200 }}
            variant="standard"
            value={ano_ingresso}
            onChange={(event) => setAno_ingresso(event.target.value)}
            displayEmpty={true}
            renderValue={(value) => {
              if (!value) {
                return "Selecione um ano";
              } else {
                return value;
              }
            }}
          >
            <MenuItem value={2010}>2010</MenuItem>
            <MenuItem value={2011}>2011</MenuItem>
            <MenuItem value={2012}>2012</MenuItem>
            <MenuItem value={2013}>2013</MenuItem>
            <MenuItem value={2014}>2014</MenuItem>
            <MenuItem value={2015}>2015</MenuItem>
            <MenuItem value={2016}>2016</MenuItem>
            <MenuItem value={2017}>2017</MenuItem>
            <MenuItem value={2018}>2018</MenuItem>
            <MenuItem value={2019}>2019</MenuItem>
            <MenuItem value={2020}>2020</MenuItem>
            <MenuItem value={2021}>2021</MenuItem>
          </Select>
        </div>

        <ul>
          <li>
            <span>Conhecimento:</span>
            <StarRatings
              rating={avaliacao_conhecimento}
              starDimension="40px"
              starSpacing="15px"
              starRatedColor="#ffb400"
              changeRating={(rating) => setAvaliacao_conhecimento(rating)}
            />
          </li>
          <li>
            <span>Capacidade de passar o conhecimento:</span>
            <StarRatings
              rating={avaliacao_didatica}
              starDimension="40px"
              starSpacing="15px"
              starRatedColor="#ffb400"
              changeRating={(rating) => setAvaliacao_didatica(rating)}
            />
          </li>
          <li>
            <span>Disponibilidade para tirar dúvidas:</span>
            <StarRatings
              rating={avaliacao_tirar_duvidas}
              starDimension="40px"
              starSpacing="15px"
              starRatedColor="#ffb400"
              changeRating={(rating) => setAvaliacao_tirarDuvidas(rating)}
            />
          </li>
          <li>
            <span>Facilidade de diálogo:</span>
            <StarRatings
              rating={avaliacao_dialogo}
              starDimension="40px"
              starSpacing="15px"
              starRatedColor="#ffb400"
              changeRating={(rating) => setAvaliacao_dialogo(rating)}
            />
          </li>
          <li>
            <span>Método avaliativo:</span>
            <StarRatings
              rating={avaliacao_metodo_avaliativo}
              starDimension="40px"
              starSpacing="15px"
              starRatedColor="#ffb400"
              changeRating={(rating) => setAvaliacao_medoto_avaliativo(rating)}
            />
          </li>
          <li>
            <span>Coerência do conteúdo cobrado:</span>
            <StarRatings
              rating={avaliacao_conteudo_cobrado}
              starDimension="40px"
              starSpacing="15px"
              starRatedColor="#ffb400"
              changeRating={(rating) => setAvaliacao_conteudo_cobrado(rating)}
            />
          </li>
          <li>
            <span>Coerência da correção:</span>
            <StarRatings
              rating={avaliacao_correcao}
              starDimension="40px"
              starSpacing="15px"
              starRatedColor="#ffb400"
              changeRating={(rating) => setAvaliacao_correcao(rating)}
            />
          </li>
          <li>
            <span>Materiais utilizados:</span>
            <StarRatings
              rating={avaliacao_materiais}
              starDimension="40px"
              starSpacing="15px"
              starRatedColor="#ffb400"
              changeRating={(rating) => setAvaliacao_materiais(rating)}
            />
          </li>
          <li>
            <span>Cuidado em não ser ofensivo:</span>
            <StarRatings
              rating={avaliacao_cuidado_ofensivo}
              starDimension="40px"
              starSpacing="15px"
              starRatedColor="#ffb400"
              changeRating={(rating) => setAvaliacao_cuidado_ofensivo(rating)}
            />
          </li>
        </ul>
        <div className="select-container">
          <span>Professor cobra presença?</span>

          <Select
            style={{ minWidth: 200 }}
            variant="standard"
            value={cobra_presenca ? "Sim" : "Não"}
            onChange={(event) =>
              setCobra_presenca(event.target.value === "Sim" ? true : false)
            }
          >
            <MenuItem value="Sim">Sim</MenuItem>
            <MenuItem value="Não">Não</MenuItem>
          </Select>
        </div>

        <textarea
          placeholder="Comentário (opcional)"
          onChange={(event) => setComentario(event.target.value)}
        />

        <button className="button" type="submit">
          Enviar avaliação
        </button>
      </form>
    </div>
  );
}
