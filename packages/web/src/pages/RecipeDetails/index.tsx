import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import SectionHeader from '../../components/SectionHeader';
import StarsAvaliation from '../../components/StarsAvaliation';

import api from '../../api/api';

import './styles.css';

interface RecipeDetailsProps {
  title: string;
  picture: string;
  author: string;
  prepTime: number;
  stars: number;
  countRates: number;
  ingredients: {
    ingredient: {
      id: number;
      name: string;
    };
    quantity: string;
    unity: {
      id: 1;
      name: string;
      quantity: string;
    };
  }[];
  directions: string[];
}

const RecipeDetails: React.FC = () => {
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetailsProps>({
    title: '',
    picture: '',
    author: '',
    prepTime: 0,
    stars: 0,
    countRates: 0,
    ingredients: [
      {
        ingredient: {
          id: 0,
          name: '',
        },
        quantity: '',
        unity: {
          id: 1,
          name: '',
          quantity: '',
        },
      },
    ],
    directions: [],
  });
  const { recipeId }: any = useHistory().location.state;

  useEffect(() => {
    try {
      api.get(`/recipe/${recipeId}`).then(response => {
        const { data } = response;
        setRecipeDetails(data);
      });
    } catch (err) {
      alert(err);
    }
  }, [recipeId]);

  return (
    <div id="page-recipe-details">
      <SectionHeader title="Receita" />
      <section id="resume">
        <h2 id="title">{recipeDetails.title}</h2>
        <img
          src={recipeDetails.picture}
          alt={recipeDetails.title}
          id="recipe-picture"
        />
        <div id="details">
          <small id="author">por {recipeDetails.author}</small>
          <small id="prep-time">
            Tempo total de preparo: {recipeDetails.prepTime}min
          </small>
          <div id="stars-container">
            <StarsAvaliation
              intStarsQuantity={Math.round(
                recipeDetails.stars / recipeDetails.countRates
              )}
            />
          </div>
        </div>
      </section>
      <section id="descriptions">
        <div id="ingredients-container">
          <h3>Ingredientes</h3>
          <div id="ingredients">
            {recipeDetails.ingredients.map(ingredientObject => (
              <div className="ingredient">
                <input
                  type="checkbox"
                  name={ingredientObject.ingredient.name}
                  value={ingredientObject.ingredient.name}
                />
                <label
                  htmlFor={ingredientObject.ingredient.name}
                  data-content={ingredientObject.ingredient.name}
                >
                  {ingredientObject.ingredient.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div id="directions-container">
          <h3>Modo de preparo</h3>
          <div id="directions">
            {recipeDetails.directions.map((direction, index) => (
              <div className="direction">
                <input type="checkbox" name={direction} value={direction} />
                <label
                  htmlFor={direction}
                  data-content={`${index + 1}. ${direction}`}
                >
                  {index + 1}. {direction}
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
