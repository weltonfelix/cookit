/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';

import SectionHeader from '../../components/SectionHeader';
import IngredientSuggestion from './components/IngredientSuggestion';

import './styles.css';

const Search: React.FC = () => {
  const [ingredientInput, setIngredientInput] = useState('');
  const [selectedIngredientsList, setSelectedIngredientsList] = useState<
    string[]
  >([]);
  const [searchRecipeResults, setSearchRecipeResults] = useState<string[]>([]);

  function handleIngredientInput(input: string): void {
    setIngredientInput(input);

    // Find index of comma (if the string do not has, it will return -1)
    const commaIndex = input.indexOf(',');

    if (commaIndex !== -1) {
      const parsedIngredient = input.slice(0, commaIndex).trim();

      if (parsedIngredient !== '') {
        // Verify if ingredient isn't already added
        if (selectedIngredientsList.indexOf(parsedIngredient) === -1) {
          // Selected Ingredients State Update
          setSelectedIngredientsList([
            ...selectedIngredientsList,
            parsedIngredient,
          ]);
        }
      }
      setIngredientInput('');
    }
  }

  function handleRemoveSelectedIngredient(ingredientName: string): void {
    const updatedSelectedIngredientsList = selectedIngredientsList.filter(
      selectedIngredient => selectedIngredient !== ingredientName
    );

    setSelectedIngredientsList(updatedSelectedIngredientsList);
  }

  function handleAddIngredientSuggestion(ingredientName: string): void {
    // Verify if ingredient isn't already added
    if (selectedIngredientsList.indexOf(ingredientName) === -1) {
      const updatedSelectedIngredientsList = selectedIngredientsList.concat(
        ingredientName
      );
      setSelectedIngredientsList(updatedSelectedIngredientsList);
    }
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
          <IngredientSuggestion
            addFunction={() => handleAddIngredientSuggestion('Sal')}
            mode="suggestion"
            title="Sal"
          />
          <IngredientSuggestion
            addFunction={() => handleAddIngredientSuggestion('Queijo')}
            mode="suggestion"
            title="Queijo"
          />
          <IngredientSuggestion
            addFunction={() =>
              handleAddIngredientSuggestion('Pimenta do Reino')
            }
            mode="suggestion"
            title="Pimenta do reino"
          />
          <IngredientSuggestion
            addFunction={() => handleAddIngredientSuggestion('Macarrão Penne')}
            mode="suggestion"
            title="Macarrão Penne"
          />
        </div>
      </section>
      <section id="results">.</section>
    </div>
  );
};
export default Search;
