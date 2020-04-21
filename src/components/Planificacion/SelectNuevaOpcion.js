import React, { Component } from 'react';
import Select from '../UI/Select';
import { Button } from 'react-bootstrap';

class SelectNuevaOpcion extends Component {
    state = {
        selectedOpcion: "",
        selectedNombre: ""
    }
    onChange = (e) => {
        this.setState({
            selectedOpcion: e.target.value,
            selectedNombre: e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text
        });
    }

    render() {
        return (
            <>
                <Select options={this.props.opciones} field="name" value="code" onChange={this.onChange} placeholder={"Elegí una opción"} />
                <Button variant="primary" onClick={() => this.props.onClick(this.state.selectedOpcion, this.state.selectedNombre)}>Guardar</Button>
            </>
        )
    }
}

export default SelectNuevaOpcion;