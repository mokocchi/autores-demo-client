import React from 'react';
import FormCheckLabel from 'react-bootstrap/FormCheckLabel';
import FormCheckInput from 'react-bootstrap/FormCheckInput';

function CheckBox(props) {
    return (
        <FormCheckLabel style={{ marginLeft: "1.25rem" }}>
            <FormCheckInput data-cy={props.dataCy} type={"checkbox"} checked={props.checked}
                onChange={props.onChange} />
            <span>{props.label}</span>
        </FormCheckLabel>
    )
}
export default CheckBox;