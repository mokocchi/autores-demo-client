import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap'

import Menu from './Menu'
import Home from './Home'
import Actividad from './Actividad'
import Tareas from './Tareas'

function App() {
  return (
    <Router>
      <Menu />
      <Container style={{ marginTop: '1em' }}>
        <Route path="/" exact component={Home} />
        <Route path="/actividad" component={Actividad} />
        <Route path="/tareas" component={Tareas} />
      </Container>
    </Router>
  );
}

export default App;
