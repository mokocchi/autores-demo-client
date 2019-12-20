import React from 'react';
import { Row } from 'react-bootstrap'

import TareaSearch from './TareaSearch';
import TareaSearchResult from './TareaSearchResult';

export default function BuscarTarea() {
    return (
        <div>
            <TareaSearch />
            <Row>
                <TareaSearchResult />
            </Row>
        </div>
    )
}