import React from 'react';
import { InputGroup, Button } from 'react-bootstrap';

import Select from '../../UI/Select';

const FormValidElements = (props) => {
    return (
        <InputGroup>
            <Select
                defaultValue={""}
                placeholder={"Elegí un elemento"}
                options={props.options}
                onChange={props.onChange}
                onPropsChangeLess={props.onPropsChangeLess}
                value={"code"}
                field={"name"}
                controlId={"valids-select"}
            />
            <span>
                <Button variant="info" type="button" data-cy={"buttonAgregarValid"} onClick={props.onClick} disabled={props.disabled} >
                    Agregar
                    </Button>
            </span>
        </InputGroup>
    )
}

export default FormValidElements;