import React from 'react';

import FormElegirOpcion from './FormElegirOpcion';
import FormMultipleChoice from './FormMultipleChoice';
import FormContadores from './FormContadores';
import FormRecoleccion from './FormRecoleccion'

function TareaExtra() {
    return (
        <div>
            <FormMultipleChoice />
            <hr />
            <FormElegirOpcion />
            <hr />
            <FormContadores />
            <hr />
            <FormRecoleccion />
            <hr />
        </div>
    )
}

export default TareaExtra;