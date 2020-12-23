import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';
import { MdSearch } from 'react-icons/md';
import logotype from '../../assets/images/logos/logotype.svg';
import sampleData from '../../api/sample-data'; // Temp

import LandingIngredientSuggestion from './components/LandingIngredientSuggestion';

const Landing: React.FC = () => {
  const history = useHistory();

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

  function handleSearchPageRedirect(): void {
    return history.push('/search');
  }

  return (
    <div id="page-landing">
      <header id="landing-header">
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
        <div
          id="search-bar"
          onClick={handleSearchPageRedirect}
          onKeyPress={handleSearchPageRedirect}
          tabIndex={0}
          role="button"
        >
          <input type="text" placeholder="Ingredientes" />
          <MdSearch />
        </div>
      </main>
      <section id="popular-ingredients-container">
        <h2>Ingredientes Recentes</h2>
        <div id="popular-ingredients">
          {sampleData.recentIngredients.map(ingredient => (
            <LandingIngredientSuggestion
              name={ingredient.name}
              imgSrc="https://images.unsplash.com/photo-1582515073490-39981397c445?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Landing;
