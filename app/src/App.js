import Form from './containers/Form/Form';
import Header from './containers/Header/Header';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter className="App">
        <Header />
        
      </BrowserRouter>
    );
  }
}

export default App;
