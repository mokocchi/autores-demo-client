import React from 'react';
import { FormGroup } from 'react-bootstrap'
import FormCheckInput from 'react-bootstrap/FormCheckInput';
import FormCheckLabel from 'react-bootstrap/FormCheckLabel';

function CheckboxGroup(props) {
    return (
        <>
            {props.label && <p><i>{props.label}</i></p>}
            {
                props.items.map(item =>
                    <FormGroup style={{ marginLeft: "1em" }} key={(props.value ? item[props.value] : item) + '-' + props.group}>
                        <FormCheckLabel>
                            <FormCheckInput type={"checkbox"} onChange={props.onChange} name={(props.value ? item[props.value] : item) + '-' + props.group} />
                            {props.field ? item[props.field] : item}
                        </FormCheckLabel>
                    </FormGroup>
                )
            }
        </>
    )
}

export default CheckboxGroup;