import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header.jsx';

/**
* @description - This is a pure function that receives properties as props
* parameter and is the parent component in which all other child components
* are displayed as "props.children".
* @param {object} props
* @returns a react element.
*/
const App = props => (
  <div>
    <Header />
    <div className="app-container">
      {props.children}
    </div>
  </div>
);

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
