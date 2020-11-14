import React from 'react';

import './styles.css';

const PopularIngredient: React.FC = () => {
  // Temp (prevent TS warnings)
  let x = 0;
  x = 2 ? (x = 3) : (x = 5);

  return (
    <div className="popular-ingredient">
      <img
        src="https://images.unsplash.com/photo-1582515073490-39981397c445?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"
        alt="ingredient name"
      />
      <h3>Cenoura</h3>
    </div>
  );
};

export default PopularIngredient;
