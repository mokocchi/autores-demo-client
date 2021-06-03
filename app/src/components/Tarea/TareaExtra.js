import React from 'react';

import FormElegirOpcionContainer from './Extra/FormElegirOpcionContainer';
import { TIPO_SELECCION, TIPO_MULTIPLE_CHOICE, TIPO_CONTADORES, TIPO_RECOLECCION, TIPO_DEPOSITO } from '../../config';
import FormMultipleChoiceContainer from './Extra/FormMultipleChoiceContainer';
import FormContadoresContainer from './Extra/FormContadoresContainer';
import FormDepositoContainer from './Extra/FormDepositoContainer';

function TareaExtra(props) {
    switch (props.tipoTarea) {
        case TIPO_SELECCION:
            return (
                <FormElegirOpcionContainer />
            );
        case TIPO_MULTIPLE_CHOICE:
            return (
                <FormMultipleChoiceContainer title={"Opción múltiple"}/>
            );
        case TIPO_CONTADORES:
            return (
                <FormContadoresContainer />
            );
        case TIPO_RECOLECCION:
            return (
                <FormMultipleChoiceContainer title={"Recolección"} recoleccion/>
            );
        case TIPO_DEPOSITO:
            return (
                <FormDepositoContainer />
            )
        default:
            return null;
    }
}

export default TareaExtra;