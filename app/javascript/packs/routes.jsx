import React from 'react';
import {
  Route,
} from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Discount from './pages/discount';
const App = (props) => (
  <div>
    <Route exact path='/' component={Dashboard} />
    <Route exact path='/discount' component={Discount} />
    <Route exact path='/discount/:id' component={Discount} />
  </div>
);

export default App;