/* eslint-disable object-curly-newline */
import React, { HTMLAttributes } from 'react';

import { BiTimeFive } from 'react-icons/bi';
import StarsAvaliation from '../../../../components/StarsAvaliation';

import './styles.css';

interface RecipeResultProps extends HTMLAttributes<HTMLDivElement> {
  pictureUrl: string;
  title: string;
  prepTime: number;
  author: string;
  stars: number;
  redirectFunction?: () => void;
}

const RecipeResult: React.FC<RecipeResultProps> = (props, ...rest) => {
  const {
    pictureUrl,
    title,
    prepTime,
    author,
    stars,
    redirectFunction,
  } = props;

  function parsePrepTime(time: number): string {
    return time > 240 ? '> 240min' : `${time}min`;
  }

  return (
    <div className="search-recipe-result" onClick={redirectFunction} {...rest}>
      <img src={pictureUrl} alt={title} />
      <div className="descriptions">
        <h3 className="title">{title}</h3>
        <small className="author">por {author}</small>
        <div className="prep-time">
          <small>{parsePrepTime(prepTime)}</small>
          <BiTimeFive />
        </div>
        <div className="stars-container">
          <StarsAvaliation intStarsQuantity={stars} />
        </div>
      </div>
    </div>
  );
};

export default RecipeResult;
