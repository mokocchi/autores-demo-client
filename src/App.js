import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap'

import Menu from './Menu'
import Home from './Home'
import Actividad from './Actividad'
import Tareas from './Tareas'
import Tarea from './Tarea'

function App() {
  return (
    <Router>
      <Menu />
      <Container style={{ marginTop: '1em' }}>
        <Route path="/" exact component={Home} />
        <Route path="/nuevaActividad" component={Actividad} />
        <Route path="/actividad/:id" exact component={Tareas} />
        <Route path="/actividad/:id/nuevaTarea" component={Tarea} />
      </Container>
    </Router>
  );
}

export default App;
