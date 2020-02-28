import React from 'react';
import { Route, HashRouter, BrowserRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap'

import Menu from './Menu'
import FlujoTareas from './FlujoTareas';
import ResolverActividad from './ResolverActividad';
import CallbackPage from './CallbackPage';
import withAuthorization from './withAuthorization';
import ListaMisTareas from './ListaMisTareas';
import MostrarTarea from './MostrarTarea';
import ListaTareas from './ListaTareas';
import ListaActividadesContainer from './containers/ListaActividadesContainer';
import ListaMisActividadesContainer from './containers/ListaMisActividadesContainer';
import TareaContainer from './containers/TareaContainer';
import TareasContainer from './containers/TareasContainer';
import ActividadContainer from './containers/ActividadContainer';
import MainContainer from './containers/MainContainer';

const Autor = withAuthorization(['ROLE_AUTOR']);

function App() {
  return (
    <BrowserRouter basename="/">
      <Menu />
      <Container style={{ marginTop: '1em' }}>
        <Route path="/" exact component={MainContainer} />
        <Route path="/callback" component={CallbackPage} />
        <Route path="/nuevaActividad" exact component={Autor(ActividadContainer)} />
        <Route path="/actividad/:id" exact component={Autor(TareasContainer)} />
        <Route path="/actividad/:id/nuevaTarea" exact component={Autor(TareaContainer)} />
        <Route path="/nuevaTarea" exact component={Autor(TareaContainer)} />
        <Route path="/actividad/:id/flujo" exact component={Autor(FlujoTareas)} />
        <Route path="/actividades" exact component={ListaActividadesContainer} />
        <Route path="/mis-actividades/" exact component={Autor(ListaMisActividadesContainer)} />
        <Route path="/actividad/:id/mostrar" exact component={ResolverActividad} />
        <Route path="/tareas" exact component={ListaTareas} />
        <Route path="/mis-tareas" exact component={Autor(ListaMisTareas)} />
        <Route path="/tarea/:id/mostrar" exact component={MostrarTarea} />
      </Container>
    </BrowserRouter>
  );
}

export default App;
