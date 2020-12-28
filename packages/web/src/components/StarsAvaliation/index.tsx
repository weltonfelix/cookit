import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import './styles.css';

import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from 'react-icons/ti';

interface StarsAvaliationProps {
  intStarsQuantity: number;
}

const StarsAvaliation: React.FC<StarsAvaliationProps> = props => {
  const { intStarsQuantity } = props;
  const [starsInstructionsArray, setStarsInstructionsArray] = useState<
    string[]
  >([]);

  // Auxiliary, convert 0-10 (int) to 0-5 (float) and
  // pass return array of "render instructions"
  function parseStarsInstructionsArray(starsQuantity: number): string[] {
    let floatStarsQuantity = starsQuantity / 2;
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
    setStarsInstructionsArray(parseStarsInstructionsArray(intStarsQuantity));
  }, [intStarsQuantity]);

  return (
    <div className="stars">
      {starsInstructionsArray.map(instruction => {
        if (instruction === 'whole') {
          return <TiStarFullOutline key={nanoid(3)} />;
        }
        if (instruction === 'half') {
          return <TiStarHalfOutline key={nanoid(3)} />;
        }
        if (instruction === 'empty') {
          return <TiStarOutline key={nanoid(3)} />;
        }
        return '';
      })}
    </div>
  );
};

export default StarsAvaliation;
