import React from 'react';

import './styles.css';
import logotype from '../../assets/images/logos/logotype.svg';

const Landing: React.FC = () => {
  const inibireslint = '';

  return (
    <div id="page-landing">
      <header>
        <img src={logotype} alt="Cookit!" />
      </header>
      <main>
        <div id="headings">
          <h1>Não sabe o que fazer pro almoço{/* MUDAR */}, né?</h1>
          <h3>
            Sem problemas! Escreve aqui embaixo os ingredientes que você tem na
            cozinha, separados por vírgula:
          </h3>
        </div>
        <div id="search-bar">
          <input type="text" />
        </div>
      </main>
      <section id="popular-ingredients"> </section>
    </div>
  );
};

export default Landing;
