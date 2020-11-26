import React, { HTMLAttributes } from 'react';

import { IoIosCheckmark, IoIosClose } from 'react-icons/io';

import './styles.css';

interface IngredientSuggestionProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  mode: 'suggestion' | 'added';
  removeFunction?: any; // TODO: Find the type
  addFunction?: any; // TODO: Find the type
}

const IngredientSuggestion: React.FC<IngredientSuggestionProps> = ({
  title,
  mode,
  removeFunction,
  addFunction,
  ...rest
}) => (
  <div className="suggestion" {...rest}>
    <small>{title}</small>
    <span
      className="remove-button"
      onKeyPress={removeFunction}
      tabIndex={0}
      role="button"
      onClick={removeFunction}
    >
      <IoIosClose className="remove" id={mode === 'added' ? 'added' : ''} />
    </span>

    {mode === 'suggestion' && (
      <span
        className="add-button"
        onKeyPress={addFunction}
        tabIndex={0}
        role="button"
        onClick={addFunction}
      >
        <IoIosCheckmark className="add" />
      </span>
    )}
  </div>
);

export default IngredientSuggestion;
