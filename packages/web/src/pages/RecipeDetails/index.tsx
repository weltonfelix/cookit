import React, { useState } from 'react';
import SectionHeader from '../../components/SectionHeader';
import StarsAvaliation from '../../components/StarsAvaliation';

import sampleData from '../../api/sample-data'; // (TEMP)

import './styles.css';

interface RecipeDetailsProps {
  title: string;
  pictureUrl: string;
  author: string;
  prepTime: number;
  stars: number;
  ingredients: string[];
  instructions: string[];
}

const RecipeDetails: React.FC = () => {
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetailsProps>(
    // Parse data from ingredientResult (TEMP)
    sampleData.ingredientResult
  );
  return (
    <div id="page-recipe-details">
      <SectionHeader title="Receita" />
      <section id="resume">
        <h2 id="title">{recipeDetails.title}</h2>
        <img
          src={recipeDetails.pictureUrl}
          alt={recipeDetails.title}
          id="recipe-picture"
        />
        <div id="details">
          <small id="author">por {recipeDetails.author}</small>
          <small id="prep-time">
            Tempo total de preparo: {recipeDetails.prepTime}min
          </small>
          <div id="stars-container">
            <StarsAvaliation intStarsQuantity={recipeDetails.stars} />
          </div>
        </div>
      </section>
      <section id="descriptions">
        <div id="ingredients-container">
          <h3>Ingredientes</h3>
          <div id="ingredients">
            {recipeDetails.ingredients.map(ingredient => (
              <div className="ingredient">
                <input type="checkbox" name={ingredient} value={ingredient} />
                <label htmlFor={ingredient} data-content={ingredient}>
                  {ingredient}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div id="instructions-container">
          <h3>Modo de preparo</h3>
          <div id="instructions">
            {recipeDetails.instructions.map((instruction, index) => (
              <div className="instruction">
                <input type="checkbox" name={instruction} value={instruction} />
                <label
                  htmlFor={instruction}
                  data-content={`${index + 1}. ${instruction}`}
                >
                  {index + 1}. {instruction}
                </label>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecipeDetails;
