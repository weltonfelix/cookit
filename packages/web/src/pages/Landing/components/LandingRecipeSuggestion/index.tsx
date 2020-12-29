import React, { useEffect, useState } from 'react';
import api from '../../../../api/api';

import './styles.css';

interface LandingRecipeSuggestionProps {
  title: string;
  picture: string;
  recipeId: number;
  redirectFunction?: () => void;
}

const LandingRecipeSuggestion: React.FC<LandingRecipeSuggestionProps> = props => {
  const { title, picture, recipeId, redirectFunction } = props;
  const [firstIngredient, setFirstIngredient] = useState('');

  useEffect(() => {
    api.get(`/recipe/${recipeId}`).then(response => {
      setFirstIngredient(response.data.ingredients[0].ingredient.name);
    });
  }, []);

  return (
    <div
      className="landing-recipe-suggestion"
      onClick={redirectFunction}
      onKeyPress={redirectFunction}
      tabIndex={recipeId}
      role="button"
    >
      <img src={picture} alt={title} />
      <h3>{title}</h3>
      {firstIngredient && (
        <small>
          usa <strong>{firstIngredient}</strong>
        </small>
      )}
    </div>
  );
};

export default LandingRecipeSuggestion;
