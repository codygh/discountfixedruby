import React from 'react';
import {
  Route,
} from 'react-router-dom';
import Dashboard from './pages/dashboard';
const App = (props) => (
  <div>
    <Route exact path='/' component={Dashboard} />
  </div>
);

export default App;