/* eslint-disable object-curly-newline */
import React, { useState, useEffect } from 'react';

import { BiTimeFive } from 'react-icons/bi';
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from 'react-icons/ti';

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
  const [starsInstructionsArray, setStarsInstructionsArray] = useState<
    string[]
  >([]);

  // Auxiliary, convert 0-10 (int) to 0-5 (float) and
  // pass return array of "render instructions"
  function parseStarsInstructionsArray(intStarsQuantity: number): string[] {
    let floatStarsQuantity = intStarsQuantity / 2;
    const tempStarsInstructionsArray = [];

    for (let i = 0; i < 5; i += 1) {
      if (floatStarsQuantity >= 1) {
        floatStarsQuantity -= 1;
        tempStarsInstructionsArray.push('whole');
      } else if (floatStarsQuantity > 0 && floatStarsQuantity < 1) {
        floatStarsQuantity -= 0.5;
        tempStarsInstructionsArray.push('half');
      } else if (floatStarsQuantity === 0) {
        tempStarsInstructionsArray.push('empty');
      }
    }
    return tempStarsInstructionsArray;
  }

  useEffect(() => {
    setStarsInstructionsArray(parseStarsInstructionsArray(stars));
  }, [stars]);

  function parsePrepTime(time: number): string {
    return time > 240 ? '> 240min' : `${time}min`;
  }

  return (
    <div className="search-recipe-result">
      <img src={pictureUrl} alt={title} />
      <div className="descriptions">
        <h3 className="title">{title}</h3>
        <small className="author">por {author}</small>
        <div className="prep-time">
          <small>{parsePrepTime(prepTime)}</small>
          <BiTimeFive />
        </div>
        <div className="stars">
          {starsInstructionsArray.map(instruction => {
            if (instruction === 'whole') {
              return <TiStarFullOutline />;
            }
            if (instruction === 'half') {
              return <TiStarHalfOutline />;
            }
            if (instruction === 'empty') {
              return <TiStarOutline />;
            }
            return '';
          })}
        </div>
      </div>
    </div>
  );
};

export default RecipeResult;
