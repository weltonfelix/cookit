/* eslint-disable object-curly-newline */
import React from 'react';

import './styles.css';

interface RecipeResultProps {
  pictureUrl: string;
  title: string;
  prepTime: number;
  author: string;
  stars: number;
}

const RecipeResult: React.FC<RecipeResultProps> = props => {
  const { pictureUrl, title, prepTime, author, stars } = props;

  return (
    <div className="search-recipe-result">
      <img src={pictureUrl} alt={title} />
      <div className="descriptions">
        <h3 className="title">{title}</h3>
        <small className="author">{author}</small>
        <small className="prep-time">{prepTime}</small>
        <div className="stars" />
      </div>
    </div>
  );
};

export default RecipeResult;
