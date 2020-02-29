import React from 'react';
import { Route, HashRouter, BrowserRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap'

import withAuthorization from './withAuthorization';
import MenuContainer from './components/Menu/MenuContainer';
import Homepage from './screens/Main/Homepage';
import Callback from './screens/Main/Callback';
import ActividadForm from './screens/Actividad/Form';



import ListaActividadesContainer from './containers/ListaActividadesContainer';
import ListaMisActividadesContainer from './containers/ListaMisActividadesContainer';
import TareaForm from './screens/Tarea/Form'
import TareasContainer from './containers/TareasContainer';
import PlanifiacionContainer from './containers/PlanifiacionContainer';
import MostrarActividadContainer from './containers/MostrarActividadContainer';
import ListaTareasContainer from './containers/ListaTareasContainer';
import ListaMisTareasContainer from './containers/ListaMisTareasContainer';
import ShowTareaContainer from './containers/ShowTareaContainer';
import Usuario from './loggedIn';

const Autor = withAuthorization(['ROLE_AUTOR']);

function App() {
  return (
    <BrowserRouter basename="/">
      <MenuContainer />
      <Container style={{ marginTop: '1em' }}>
        <Route path="/" exact component={Usuario(Homepage)} />
        <Route path="/callback" component={Callback} />
        <Route path="/nuevaActividad" exact component={Autor(ActividadForm)} />
        <Route path="/actividad/:id" exact component={Autor(TareasContainer)} />
        <Route path="/actividad/:id/nuevaTarea" exact component={Autor(TareaForm)} />
        <Route path="/nuevaTarea" exact component={Autor(TareaForm)} />
        <Route path="/actividad/:id/planificacion" exact component={Autor(PlanifiacionContainer)} />
        <Route path="/actividades" exact component={ListaActividadesContainer} />
        <Route path="/mis-actividades/" exact component={Autor(ListaMisActividadesContainer)} />
        <Route path="/actividad/:id/mostrar" exact component={MostrarActividadContainer} />
        <Route path="/tareas" exact component={ListaTareasContainer} />
        <Route path="/mis-tareas" exact component={Autor(ListaMisTareasContainer)} />
        <Route path="/tarea/:id/mostrar" exact component={ShowTareaContainer} />
      </Container>
    </BrowserRouter>
  );
}

export default App;
