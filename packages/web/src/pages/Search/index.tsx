/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';
import { GiKnifeFork } from 'react-icons/gi';
// Check Gi best other icons later

import sampleData from '../../api/sample-data'; // (TEMP)

import SectionHeader from '../../components/SectionHeader';
import IngredientSuggestion from './components/IngredientSuggestion';
import RecipeResult from './components/RecipeResult';

import './styles.css';

interface RecipeResultProps {
  pictureUrl: string;
  title: string;
  prepTime: number;
  author: string;
  stars: number;
}

const Search: React.FC = () => {
  const [ingredientInput, setIngredientInput] = useState('');
  const [selectedIngredientList, setSelectedIngredientList] = useState<
    string[]
  >([]);
  const [ingredientSuggestionList, setIngredientSuggestionList] = useState(
    // Parse data from recentIngredients (TEMP)
    sampleData.recentIngredients.map(ingredient => ingredient.name)
  );
  const [searchRecipeResults, setSearchRecipeResults] = useState<
    RecipeResultProps[]
  >(
    // Parse data from recentIngredients (TEMP)
    sampleData.ingredientsResult.map(ingredient => ingredient)
  );

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
      selectedIngredientList.indexOf(parsedIngredient) === -1
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
            {searchRecipeResults.map(ingredient => (
              <RecipeResult
                pictureUrl={ingredient.pictureUrl}
                title={ingredient.title}
                prepTime={ingredient.prepTime}
                author={ingredient.author}
                stars={ingredient.stars}
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
