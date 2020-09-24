import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as GProvider } from "react-globally";
import { withGlobalState } from 'react-globally';
import {BrowserRouter as Router} from 'react-router-dom';
import{
  AppProvider,
} from '@shopify/polaris';
import {
  Provider,
} from '@shopify/app-bridge-react';
import Routes from './routes';

class App extends React.Component {
  render() {
    var data = document.getElementById('shopify-app-init').dataset;
    const config = {apiKey: data.apiKey, shopOrigin: data.shopOrigin};

    const layoutMarkup = (
      <Router>
        <Routes />
      </Router>
    );

    return (
      <AppProvider>
        <Provider config={config}>
          {layoutMarkup}
        </Provider>
      </AppProvider>
    );
  }
}

const G_App = withGlobalState(App);

const initialState = {
  shop: false,
};


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <GProvider globalState={initialState}>
      <G_App />
    </GProvider>,
    document.body.appendChild(document.createElement('div')),
  )
})
