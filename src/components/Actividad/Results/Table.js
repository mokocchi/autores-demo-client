import React from 'react';
import LoadSpinner from '../../UI/LoadSpinner';
import { Alert, Table, Button } from 'react-bootstrap';
import { TIPO_NUMBER_INPUT, TIPO_CAMERA_INPUT, TIPO_MULTIPLE, TIPO_GPS_INPUT, TIPO_AUDIO_INPUT, TIPO_SELECT, TIPO_SIMPLE, TIPO_TEXT_INPUT, TIPO_DEPOSIT, TIPO_COUNTERS, TIPO_COLLECT } from '../../../config';
import { Link } from 'react-router-dom';

const getCellContent = cell => {
    switch (cell.tipo) {
        case TIPO_SIMPLE:
            return <Button variant="outline-success" disabled style={{cursor: "default"}}>Realizada</Button>
        case TIPO_TEXT_INPUT:
        case TIPO_NUMBER_INPUT:
        case TIPO_SELECT:
        case TIPO_MULTIPLE:
        case TIPO_COUNTERS:
        case TIPO_COLLECT:
            return cell.respuesta;
        case TIPO_CAMERA_INPUT:
            return <img
                style={{ width: 150 }}
                src={"https://via.placeholder.com/500x500"}
                alt={cell.respuesta}
            />;
        case TIPO_DEPOSIT:
            return "buscar en las otras tareas";
        case TIPO_GPS_INPUT:
            if (cell.respuesta.type === "coords") {
                return <>
                    ({cell.respuesta.data.longitude}, {cell.respuesta.data.latitude})<br />
                    <Link to={"/mapa"}>
                        Ver en el mapa
                </Link>
                </>
            } else {
                return cell.respuesta.data;
            }
        case TIPO_AUDIO_INPUT:
            return `{componente audio de ${cell.respuesta}}`;
        default:
            return <Button variant="outline-info" disabled style={{cursor: "default"}}>Salteada</Button>
    }
}

const ResultsTable = ({ data, loading, error }) => {
    return (
        loading ?
            <LoadSpinner /> :
            error ? <Alert variant="danger">{error}</Alert>
                : data && <Table striped responsive>
                    <thead>
                        <tr>
                            {data.columns.map((col, index) =>
                                <th key={index} style={{ whiteSpace: "nowrap" }}>{col}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {data.rows.map((row, index) =>
                            <tr key={index}>
                                {row.map(
                                    cell =>
                                        <td>{getCellContent(cell)}</td>
                                )}
                            </tr>)}
                    </tbody>
                </Table>
    )
}

export default ResultsTable;