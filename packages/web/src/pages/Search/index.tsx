/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable operator-linebreak */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { GiKnifeFork } from 'react-icons/gi';
import SectionHeader from '../../components/SectionHeader';
import IngredientSuggestion from './components/IngredientSuggestion';
import RecipeResult from './components/RecipeResult';

import api from '../../api/api';

import './styles.css';

interface RecipeResultProps {
  id: number;
  picture: string;
  title: string;
  prepTime: number;
  author: string;
  stars: number;
  countRates: number;
}

interface AutocompleteIngredientsProps {
  name: string;
  id: number;
}

const Search: React.FC = () => {
  const [ingredientInput, setIngredientInput] = useState('');
  const [selectedIngredientList, setSelectedIngredientList] = useState<
    string[]
  >([]);
  const [ingredientSuggestionList, setIngredientSuggestionList] = useState<
    string[]
  >(JSON.parse(localStorage.getItem('last-used-ingredients') || '[]') || []);
  const [searchRecipeResults, setSearchRecipeResults] = useState<
    RecipeResultProps[]
  >([]);
  const [autocompleteIngredients, setAutocompleteIngredients] = useState<
    AutocompleteIngredientsProps[]
  >([]);

  const history = useHistory();

  /* Main search useEffect, monitors
  selectedIngredient */
  useEffect(() => {
    if (selectedIngredientList.length > 0) {
      try {
        api
          .get('/recipes', {
            params: {
              ingredients: JSON.stringify(selectedIngredientList),
            },
          })
          .then(response => {
            setSearchRecipeResults(response.data.recipes);
          });
      } catch (error) {
        alert(
          `Eita! Houve algum problema... Por favor, tente novamente. Erroro: ${error}`
        );
      }
    }
  }, [selectedIngredientList]);

  // Updates localStorage last-used-ingredients
  useEffect(() => {
    localStorage.setItem(
      'last-used-ingredients',
      JSON.stringify(ingredientSuggestionList)
    );
  }, [ingredientSuggestionList]);

  // Monitor input change to autocomplete suggestions
  useEffect(() => {
    if (ingredientInput.length > 0) {
      try {
        api
          .get('/ingredient', {
            params: {
              name: ingredientInput,
            },
          })
          .then(response => {
            const { data } = response;
            const parsedAutocompleteIngredients = data.map(
              (ingredient: AutocompleteIngredientsProps) => ({
                name: ingredient.name,
                id: ingredient.id,
              })
            );
            setAutocompleteIngredients(parsedAutocompleteIngredients);
          });
      } catch (err) {
        alert(err);
      }
    } else {
      setAutocompleteIngredients([]);
    }
  }, [ingredientInput]);

  // List's generic auxiliary function
  function findAndRemoveIngredientInList(
    ingredientList: string[],
    ingredient: string
  ): string[] {
    const updatedIngredientList = ingredientList.filter(
      ingredientListItem => ingredientListItem !== ingredient
    );
    return updatedIngredientList;
  }

  // Generic auxiliary function to parse and add Ingredient
  // to selectedIngredientList
  function addInputIngredient(ingredient: string): void {
    // Remove comma and surrounding spaces
    const parsedIngredient = ingredient.trim();

    // Verify if ingredient isn't blank and isn't already added
    if (
      parsedIngredient !== '' &&
      selectedIngredientList
        .map(selectedIngredient => selectedIngredient.toLowerCase())
        .indexOf(parsedIngredient.toLowerCase()) === -1
    ) {
      // Find and remove if ingredient is in Suggestion List
      const updatedIngredientSuggestionList = findAndRemoveIngredientInList(
        ingredientSuggestionList,
        parsedIngredient
      );

      setSelectedIngredientList([...selectedIngredientList, parsedIngredient]);
      setIngredientSuggestionList(updatedIngredientSuggestionList);
    }

    setIngredientInput('');
  }

  // Input parse main function
  function handleIngredientInputParse(input: string): void {
    setIngredientInput(input);

    // Regex test to prevent number input
    if (/\d/.test(input) === true) {
      setIngredientInput(ingredientInput.slice(0, ingredientInput.length));
    }

    // Find index of comma (if the string do not has, it will return -1)
    const commaIndex = input.indexOf(',');

    // Verify if comma was found
    if (commaIndex !== -1) {
      // Remove comma and surrounding spaces
      const parsedIngredient = input.slice(0, commaIndex);
      addInputIngredient(parsedIngredient);
    }
  }

  function handleAddIngredientByEnter(
    event: React.KeyboardEvent<HTMLInputElement>
  ): void {
    if (event.key === 'Enter') {
      addInputIngredient(ingredientInput);
    }
  }

  function handleRemoveSelectedIngredient(ingredientName: string): void {
    const updatedSelectedIngredientList = findAndRemoveIngredientInList(
      selectedIngredientList,
      ingredientName
    );

    setSelectedIngredientList(updatedSelectedIngredientList);
  }

  function handleAddIngredientSuggestion(ingredientName: string): void {
    const updatedSelectedIngredientList = selectedIngredientList.concat(
      ingredientName
    );
    const updatedIngredientSuggestionList = findAndRemoveIngredientInList(
      ingredientSuggestionList,
      ingredientName
    );

    setSelectedIngredientList(updatedSelectedIngredientList);
    setIngredientSuggestionList(updatedIngredientSuggestionList);
  }

  function handleRemoveIngredientSuggestion(ingredientName: string): void {
    const updatedIngredientSuggestionList = findAndRemoveIngredientInList(
      ingredientSuggestionList,
      ingredientName
    );

    setIngredientSuggestionList(updatedIngredientSuggestionList);
  }

  function handleAddAutocompleteIngredient(ingredientName: string): void {
    // Only add if already not added
    if (selectedIngredientList.indexOf(ingredientName) === -1) {
      const updatedSelectedIngredientList = selectedIngredientList.concat(
        ingredientName
      );
      // Reset (make empty) everything
      setSelectedIngredientList(updatedSelectedIngredientList);
    }
    setAutocompleteIngredients([]);
    setIngredientInput('');
  }

  /* Redirect to Recipe Details Page & stores used ingredients
  and last seen recipes to localStorage */
  function handleRedirectToRecipeDetailsPage(recipeId: number): void {
    history.push(`/recipe/${recipeId}`, { recipeId });
    const lastUsedIngredients = selectedIngredientList;
    const lastSeenRecipes = searchRecipeResults.slice(0, 5).map(recipe => ({
      id: recipe.id,
      title: recipe.title,
      picture: recipe.picture,
    }));

    localStorage.setItem(
      'last-used-ingredients',
      JSON.stringify(lastUsedIngredients)
    );
    localStorage.setItem('last-seen-recipes', JSON.stringify(lastSeenRecipes));
  }

  return (
    <div id="page-search">
      <SectionHeader title="Pesquisar" />
      <section id="search">
        <h3>Ingredientes</h3>
        <div id="search-box">
          <input
            type="text"
            placeholder="Escreva-os separados por vírgula"
            autoFocus
            autoComplete="on"
            value={ingredientInput}
            onChange={e => handleIngredientInputParse(e.target.value)}
            onKeyPress={e => handleAddIngredientByEnter(e)}
          />
          <div id="selected-ingredients">
            {selectedIngredientList.map(selectedIngredient => (
              <IngredientSuggestion
                key={selectedIngredient}
                mode="added"
                title={selectedIngredient}
                removeFunction={() =>
                  handleRemoveSelectedIngredient(selectedIngredient)
                }
              />
            ))}
          </div>
        </div>
        {autocompleteIngredients.length > 0 && (
          <div id="autocomplete">
            <ul>
              {autocompleteIngredients.map(ingredient => (
                <li
                  key={ingredient.id}
                  onClick={() =>
                    handleAddAutocompleteIngredient(ingredient.name)
                  }
                  onKeyPress={() =>
                    handleAddAutocompleteIngredient(ingredient.name)
                  }
                  tabIndex={0}
                >
                  <p>{ingredient.name}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div id="suggestions">
          {ingredientSuggestionList.map(ingredient => (
            <IngredientSuggestion
              key={ingredient}
              mode="suggestion"
              title={ingredient}
              addFunction={() => handleAddIngredientSuggestion(ingredient)}
              removeFunction={() =>
                handleRemoveIngredientSuggestion(ingredient)
              }
            />
          ))}
        </div>
      </section>
      <section id="results">
        {searchRecipeResults.length > 0 ? (
          <div id="recipe-results">
            {searchRecipeResults.map(recipe => (
              <RecipeResult
                redirectFunction={(): void =>
                  handleRedirectToRecipeDetailsPage(recipe.id)
                }
                pictureUrl={recipe.picture}
                title={recipe.title}
                prepTime={recipe.prepTime}
                author={recipe.author}
                stars={Math.round(recipe.stars / recipe.countRates)}
                key={recipe.id}
              />
            ))}
          </div>
        ) : (
          <div id="no-recipe-results">
            <GiKnifeFork />
            <h3>Os resultados aparecerão aqui</h3>
          </div>
        )}
      </section>
    </div>
  );
};
export default Search;
