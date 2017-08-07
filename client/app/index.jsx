import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import Home from './components/Home.jsx';
import AllDocuments from './components/documents/AllDocuments.jsx';
import MyDocuments from './components/documents/MyDocuments.jsx';
import ViewOneDocument from './components/documents/ViewOneDocument.jsx';
import Profile from './components/Profile.jsx';
import AllUsers from './components/users/AllUsers.jsx';
import requireAuth from './helpers/requireAuth';
import setAxiosHeader from './helpers/axiosSetup';
import './styles/app.scss';
import '../../node_modules/froala-editor/css/froala_style.min.css';
import '../../node_modules/froala-editor/css/froala_editor.pkgd.min.css';

import configureStore from './store/configureStore';

const store = configureStore();

// allows access to store from browser console
window.clientStore = store;

// solves react-materialize error: '$() is not a function'
window.jQuery = window.$ = jQuery;

if (localStorage.token) {
  setAxiosHeader(localStorage.token);
}

const Root = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} onEnter={requireAuth(store)}>
        <IndexRoute component={Home} />
        <Route path="dashboard/profile" component={Profile} />
        <Route path="dashboard/users(/:page)" component={AllUsers} />
        <Route path="dashboard/mydocuments(/:page)" component={MyDocuments} />
        <Route path="dashboard/documents/:id" component={ViewOneDocument} />
        <Route path="dashboard(/:page)" component={AllDocuments} />
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('app'));
