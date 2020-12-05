/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';

import sampleData from '../../api/sample-data'; // Temp

import SectionHeader from '../../components/SectionHeader';
import IngredientSuggestion from './components/IngredientSuggestion';

import './styles.css';

const Search: React.FC = () => {
  const [ingredientInput, setIngredientInput] = useState('');
  const [selectedIngredientsList, setSelectedIngredientsList] = useState<
    string[]
  >([]);
  const [ingredientSuggestionList, setIngredientSuggestionList] = useState(
    // Parse data from
    sampleData.recentIngredients.map(ingredient => ingredient.name)
  );
  const [searchRecipeResults, setSearchRecipeResults] = useState<string[]>([]);

  // Auxiliary generic function
  function findAndRemoveIngredientInList(
    ingredientList: string[],
    ingredient: string
  ): string[] {
    const updatedIngredientList = ingredientList.filter(
      ingredientListItem => ingredientListItem !== ingredient
    );
    return updatedIngredientList;
  }

  // Input parse main function
  function handleIngredientInput(input: string): void {
    setIngredientInput(input);

    // Find index of comma (if the string do not has, it will return -1)
    const commaIndex = input.indexOf(',');

    // Verify if comma was found
    if (commaIndex !== -1) {
      // Remove comma and surrounding spaces
      const parsedIngredient = input.slice(0, commaIndex).trim();

      // Verify if ingredient isn't blank and isn't already added
      if (
        parsedIngredient !== ''
        && selectedIngredientsList.indexOf(parsedIngredient) === -1
      ) {
        // Find and remove if ingredient is in Suggestion List
        const updatedIngredientSuggestionList = findAndRemoveIngredientInList(
          ingredientSuggestionList,
          parsedIngredient
        );

        setSelectedIngredientsList([
          ...selectedIngredientsList,
          parsedIngredient,
        ]);
        setIngredientSuggestionList(updatedIngredientSuggestionList);
      }

      setIngredientInput('');
    }
  }

  function handleRemoveSelectedIngredient(ingredientName: string): void {
    const updatedSelectedIngredientsList = findAndRemoveIngredientInList(
      selectedIngredientsList,
      ingredientName
    );

    setSelectedIngredientsList(updatedSelectedIngredientsList);
  }

  function handleAddIngredientSuggestion(ingredientName: string): void {
    const updatedSelectedIngredientsList = selectedIngredientsList.concat(
      ingredientName
    );
    const updatedIngredientSuggestionList = findAndRemoveIngredientInList(
      ingredientSuggestionList,
      ingredientName
    );
    setSelectedIngredientsList(updatedSelectedIngredientsList);
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
            onChange={e => handleIngredientInput(e.target.value)}
          />
          <div id="selected-ingredients">
            {selectedIngredientsList.map(selectedIngredient => (
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
      <section id="results">.</section>
    </div>
  );
};
export default Search;
