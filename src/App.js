import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap'

import withAuthorization from './components/Main/withAuthorization';
import MenuContainer from './components/Menu/MenuContainer';
import Homepage from './screens/Main/Homepage';
import Callback from './screens/Main/Callback';
import ActividadForm from './screens/Actividad/Form';
import ActividadAddTareas from './screens/Actividad/AddTareas';
import TareaForm from './screens/Tarea/Form'
import ActividadPublicList from './screens/Actividad/PublicList';
import ActividadListUser from './screens/Actividad/ListUser';
import ActividadShow from './screens/Actividad/Show';
import PlanificacionEdit from './screens/Planificacion/Edit';
import TareaPublicList from './screens/Tarea/PublicList';
import TareaListUser from './screens/Tarea/ListUser';
import TareaShow from './screens/Tarea/Show';

import Usuario from './components/Main/loggedIn';
const Autor = withAuthorization(['ROLE_AUTOR']);

function App() {
  return (
    <BrowserRouter basename="/">
      <MenuContainer />
      <Container style={{ marginTop: '1em' }}>
        <Route path="/" exact component={Usuario(Homepage)} />
        <Route path="/callback" component={Callback} />
        <Route path="/nuevaActividad" exact component={Autor(ActividadForm)} />
        <Route path="/actividad/:id" exact component={Autor(ActividadAddTareas)} />
        <Route path="/actividad/:id/nuevaTarea" exact component={Autor(TareaForm)} />
        <Route path="/nuevaTarea" exact component={Autor(TareaForm)} />
        <Route path="/actividad/:id/planificacion" exact component={Autor(PlanificacionEdit)} />
        <Route path="/actividades" exact component={ActividadPublicList} />
        <Route path="/mis-actividades/" exact component={Autor(ActividadListUser)} />
        <Route path="/actividad/:id/mostrar" exact component={ActividadShow} />
        <Route path="/tareas" exact component={TareaPublicList} />
        <Route path="/mis-tareas" exact component={Autor(TareaListUser)} />
        <Route path="/tarea/:id/mostrar" exact component={TareaShow} />
      </Container>
    </BrowserRouter>
  );
}

export default App;
