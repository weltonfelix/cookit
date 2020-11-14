import React, { useState, useEffect } from 'react';

import './styles.css';
import { MdSearch } from 'react-icons/md';
import logotype from '../../assets/images/logos/logotype.svg';

import PopularIngredient from '../../components/PopularIngredient';

const Landing: React.FC = () => {
  const [currentMeal, setCurrentMeal] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour >= 4 && hour <= 10) {
      setCurrentMeal('café da manhã');
    } else if (hour > 10 && hour <= 17) {
      setCurrentMeal('almoço');
    } else {
      setCurrentMeal('jantar');
    }
  }, []);

  return (
    <div id="page-landing">
      <header>
        <img src={logotype} alt="Cookit!" />
      </header>
      <main>
        <div id="headings">
          <h1>Não sabe o que fazer pro {currentMeal}, né?</h1>
          <h3>
            Sem problemas! Escreve aqui embaixo os ingredientes que você tem na
            cozinha, separados por vírgula:
          </h3>
        </div>
        <div id="search-bar">
          <input type="text" placeholder="Ingredientes" />
          <MdSearch />
        </div>
      </main>
      <section id="popular-ingredients-container">
        <h2>Ingredientes Populares</h2>
        <div id="popular-ingredients">
          <PopularIngredient />
          <PopularIngredient />
          <PopularIngredient />
          <PopularIngredient />
        </div>
      </section>
    </div>
  );
};

export default Landing;
