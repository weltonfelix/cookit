import React from 'react';

import './styles.css';

interface LandingIngredientSuggestionProps {
  name: string;
  imgSrc: string;
}

const LandingIngredientSuggestion: React.FC<LandingIngredientSuggestionProps> = props => {
  const { name, imgSrc } = props;
  return (
    <div className="landing-ingredient-suggestion">
      <img src={imgSrc} alt={name} />
      <h3>{name}</h3>
    </div>
  );
};

export default LandingIngredientSuggestion;
