import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap'

import Menu from './Menu'
import Home from './Home'
import Actividad from './Actividad'

function App() {
  return (
    <Router>
      <Menu />
      <Container text style={{ marginTop: '1em' }}>
        <Route path="/" exact component={Home} />
        <Route path="/actividad" component={Actividad} />
      </Container>
    </Router>
  );
}

export default App;
