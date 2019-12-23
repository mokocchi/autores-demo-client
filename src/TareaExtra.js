import React from 'react';

import FormElegirOpcion from './FormElegirOpcion';
import FormMultipleChoice from './FormMultipleChoice';
import FormContadores from './FormContadores';
import FormRecoleccion from './FormRecoleccion';

import { TIPO_SELECCION, TIPO_MULTIPLE_CHOICE, TIPO_CONTADORES, TIPO_RECOLECCION } from './config';

function TareaExtra(props) {
    switch (props.tipoTarea) {
        case TIPO_SELECCION:
            return (
                <FormElegirOpcion />
            );
        case TIPO_MULTIPLE_CHOICE:
            return (
                <FormMultipleChoice />
            );
        case TIPO_CONTADORES:
            return (
                <FormContadores />
            );
        case TIPO_RECOLECCION:
            return (
                <FormRecoleccion />
            )
        default:
            return null;
    }
}

export default TareaExtra;