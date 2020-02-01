import React from 'react';
import { Route, HashRouter, BrowserRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap'

import Menu from './Menu'
import Actividad from './Actividad'
import Tareas from './Tareas'
import Tarea from './Tarea'
import FlujoTareas from './FlujoTareas';
import ResolverActividad from './ResolverActividad';
import ListaActividades from './ListaActividades';
import HomePage from './HomePage';
import CallbackPage from './CallbackPage';

function App() {
  return (
    <BrowserRouter basename="/">
      <Menu />
      <Container style={{ marginTop: '1em' }}>
        <Route path="/" exact component={HomePage} />
        <Route path="/callback" component={CallbackPage} />
        <Route path="/nuevaActividad" exact component={Actividad} />
        <Route path="/actividad/:id" exact component={Tareas} />
        <Route path="/actividad/:id/nuevaTarea" exact component={Tarea} />
        <Route path="/actividad/:id/flujo" exact component={FlujoTareas} />
        <Route path="/actividades" exact component={ListaActividades} />
        <Route path="/actividad/:id/mostrar" exact component={ResolverActividad} />
      </Container>
    </BrowserRouter>
  );
}

export default App;
