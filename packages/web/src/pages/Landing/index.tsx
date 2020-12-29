import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';
import { MdSearch } from 'react-icons/md';
import logotype from '../../assets/images/logos/logotype.svg';

import LandingRecipeSuggestion from './components/LandingRecipeSuggestion';

interface LastSeenRecipes {
  title: string;
  picture: string;
  id: number;
}

const Landing: React.FC = () => {
  const [currentMeal, setCurrentMeal] = useState('');
  const [lastSeenRecipes, setLastSeenRecipes] = useState<LastSeenRecipes[]>(
    JSON.parse(localStorage.getItem('last-seen-recipes') || '[]') || []
  );
  const history = useHistory();
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

  function handleRedirectToSearchPage(): void {
    history.push('/search');
  }

  function handleRedirectToRecipeDetailsPage(recipeId: number): void {
    history.push(`/recipe/${recipeId}`, { recipeId });
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
          onKeyPress={handleRedirectToSearchPage}
          tabIndex={0}
          role="button"
          onClick={handleRedirectToSearchPage}
        >
          <input type="text" placeholder="Ingredientes" />
          <MdSearch />
        </div>
      </main>
      <section id="last-seen-recipes-container">
        <h2>Receitas Recentes</h2>
        <div id="last-seen-recipes">
          {lastSeenRecipes.length > 0 ? (
            lastSeenRecipes.map(recipe => (
              <LandingRecipeSuggestion
                title={recipe.title}
                picture={recipe.picture}
                recipeId={recipe.id}
                redirectFunction={() =>
                  handleRedirectToRecipeDetailsPage(recipe.id)
                }
                key={recipe.id}
              />
            ))
          ) : (
            <h3>TODO: Implementar o Receitas Populares</h3>
          )}
        </div>
      </section>
    </div>
  );
};

export default Landing;
