import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import Search from './pages/Search';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Route path="/" exact component={Landing} />
    <Route path="/search" exact component={Search} />
  </BrowserRouter>
);

export default Routes;
