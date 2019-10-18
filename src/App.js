import React from 'react';
import './App.css';

import Home from './components/Home';
import Header from './components/Header';

function App() {
  return (
    <React.Fragment>
      <Header />
      <Home />
    </React.Fragment>  
  );
}

export default App;
