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
import withAuthorization from './withAuthorization';
import ListaMisActividades from './ListaMisActividades';
import ListaMisTareas from './ListaMisTareas';
import MostrarTarea from './MostrarTarea';

const Autor = withAuthorization(['ROLE_AUTOR']);

function App() {
  return (
    <BrowserRouter basename="/">
      <Menu />
      <Container style={{ marginTop: '1em' }}>
        <Route path="/" exact component={HomePage} />
        <Route path="/callback" component={CallbackPage} />
        <Route path="/nuevaActividad" exact component={Autor(Actividad)} />
        <Route path="/actividad/:id" exact component={Autor(Tareas)} />
        <Route path="/actividad/:id/nuevaTarea" exact component={Autor(Tarea)} />
        <Route path="/actividad/:id/flujo" exact component={Autor(FlujoTareas)} />
        <Route path="/actividades" exact component={ListaActividades} />
        <Route path="/mis-actividades/" exact component={Autor(ListaMisActividades)} />
        <Route path="/actividad/:id/mostrar" exact component={ResolverActividad} />
        <Route path="/mis-tareas/" exact component={Autor(ListaMisTareas)} />
        <Route path="/tarea/:id/mostrar" exact component={MostrarTarea} />
      </Container>
    </BrowserRouter>
  );
}

export default App;
