import SvgIcon from 'material-ui/SvgIcon';
(global as any).__MUI_SvgIcon__ = SvgIcon;

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import AuthService from './auth/authService';


import App from './app/app';

const rootElement = document.getElementById('react-root');
const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootElement
  );
}

render(App)

if (module.hot) {
  module.hot.accept('./app/app', () => {
    const NextApp = require('./app/app').default;
    render(
      NextApp
    );
  });
}
