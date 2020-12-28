import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import RecipeDetails from './pages/RecipeDetails';
import Search from './pages/Search';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Route path="/" exact component={Landing} />
    <Route path="/search" exact component={Search} />
    <Route path="/recipe" exact component={RecipeDetails} />
  </BrowserRouter>
);

export default Routes;
