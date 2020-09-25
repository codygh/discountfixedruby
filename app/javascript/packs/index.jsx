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
  Toast
} from '@shopify/app-bridge-react';
import Routes from './routes';

class App extends React.Component {

  state = {
    showToast: false,
    toastContent: '',
    toastError: false,
  };

  componentDidMount() {
    this.props.setGlobalState({ showToast: this.showToast });
  }

  dismissToast = () => {
    this.setState({showToast: false});
  };

  showToast = (content, error) => {
    this.setState({showToast: true, toastContent: content, toastError: error});
  }

  render() {
    const {
      showToast,
      toastContent,
      toastError,
    } = this.state;

    var data = document.getElementById('shopify-app-init').dataset;
    const config = {apiKey: data.apiKey, shopOrigin: data.shopOrigin};

    const layoutMarkup = (
      <Router>
        <Routes />
      </Router>
    );

    const toastMarkup = showToast ? (
          <Toast content={toastContent} onDismiss={this.dismissToast} error={toastError} />
        ) : null;

    return (
      <AppProvider>
        <Provider config={config}>
          {toastMarkup}
          {layoutMarkup}
        </Provider>
      </AppProvider>
    );
  }
}

const G_App = withGlobalState(App);

const initialState = {
  showToast: false,
};


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <GProvider globalState={initialState}>
      <G_App />
    </GProvider>,
    document.body.appendChild(document.createElement('div')),
  )
})
