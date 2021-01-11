import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Button } from 'react-bootstrap';
import Icon from 'react-web-vector-icons';
import ButtonSpinner from '../UI/ButtonSpinner';
import logo from '../../assets/img/g2512.png';

function Menu(props) {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">
                <img src={logo} width="60" className="d-inline-block align-top"
                    alt="DEHIA logo"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/actividades/">Lista Actividades</Nav.Link>
                        <Nav.Link href="/mis-actividades/">Mis actividades</Nav.Link>
                        <Nav.Link href="/tareas/">Lista tareas</Nav.Link>
                        <Nav.Link href="/mis-tareas/">Mis tareas</Nav.Link>
                        <Nav.Link href="/nuevaActividad/">Crear Actividad</Nav.Link>
                        <Nav.Link href="/nuevaTarea/">Crear Tarea</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    {(props.token.accessToken && props.user) &&
                        <Navbar.Text><Icon name="user" font="FontAwesome" color="black" size={"1rem"} /> {props.user.profile.name}</Navbar.Text>
                    }
                    <NavDropdown title={<span><Icon name="language" font="Entypo" color="black" size={"1rem"} /> ES</span>} id="nav-dropdown">
                        <NavDropdown.Item>Inglés (English)</NavDropdown.Item>
                    </NavDropdown>
                    {(props.token.accessToken) ?
                        <Button onClick={props.onClickCerrarSesion} data-cy={"cerrarSesionButton"}>Cerrar sesión</Button>
                        :
                        props.loading ?
                            <ButtonSpinner />
                            : <Button onClick={props.onClickIniciarSesion} variant={"outline-dark"} data-cy={"iniciarSesionButton"} role="button" style={{ textTransform: "none" }}>
                                <img width="20px" style={{ marginBotton: "3px", marginRight: "5px" }} alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                        Iniciar sesión con Google
                    </Button>
                    }
                </Navbar.Collapse>
        </Navbar>
    )
}

export default Menu;