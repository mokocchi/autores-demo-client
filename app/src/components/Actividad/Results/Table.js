import React from 'react';
import LoadSpinner from '../../UI/LoadSpinner';
import { Alert, Table, Button } from 'react-bootstrap';
import { TIPO_NUMBER_INPUT, TIPO_CAMERA_INPUT, TIPO_MULTIPLE, TIPO_GPS_INPUT, TIPO_AUDIO_INPUT, TIPO_SELECT, TIPO_SIMPLE, TIPO_TEXT_INPUT, TIPO_DEPOSIT, TIPO_COUNTERS, TIPO_COLLECT } from '../../../config';
import { Link } from 'react-router-dom';

const getCellContent = (cell, task) => {
    switch (task.tipo.codigo) {
        case TIPO_SIMPLE:
            return <Button variant="outline-success" disabled style={{ cursor: "default" }}>Realizada</Button>
        case TIPO_TEXT_INPUT:
        case TIPO_NUMBER_INPUT:
            return cell; //sanitizar
        case TIPO_SELECT:
            const element = task.extra.elements.find(el => el.code === cell);
            if (element) {
                return element.name
            } else {
                return "(Sin respuesta)"
            }
        case TIPO_MULTIPLE:
            const found_elements = task.extra.elements.filter(el => cell.includes(el.code));
            if (found_elements.length > 0) {
                return found_elements.map(el => el.name).join(", ")
            } else {
                return "(Sin respuesta)"
                // return JSON.stringify(cell); //`[[${cell.join(",")}]]`
            }
        case TIPO_COUNTERS:
            const blocks = task.extra.elements.map(el => { console.log(cell); return `${el.name}: ${parseFloat(cell[el.code]) * parseFloat(task.extra.byScore[0].scores[el.code])}` })
            return <p><b>{task.extra.byScore[0].name}</b><br /><ul>{blocks.map((it, idx) => <li key={idx}>{it}</li>)}</ul></p>
        case TIPO_COLLECT:
            return JSON.stringify(cell);
        case TIPO_CAMERA_INPUT:
            return <img
                style={{ width: 150 }}
                src={"https://via.placeholder.com/500x500"}
                alt={cell}
            />;
        case TIPO_DEPOSIT:
            return "buscar en las otras tareas";
        case TIPO_GPS_INPUT:
            if (cell.type === "coords") {
                return <>
                    ({cell.data.longitude}, {cell.data.latitude})<br />
                    <Link to={"/mapa"}>
                        Ver en el mapa
                </Link>
                </>
            } else {
                if (cell.data) {
                    return cell.data
                } else {
                    return "(Sin respuesta)"
                }
            }
        case TIPO_AUDIO_INPUT:
            if(cell === "<Sin respuesta>") {
                return "(Sin respuesta)"
            } else {
                return `{componente audio de ${cell}}`; //sanitizar
            }
        default:
            return <Button variant="outline-info" disabled style={{ cursor: "default" }}>Salteada</Button>
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
                                <th key={index} style={{ whiteSpace: "nowrap" }}>{col.nombre}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {data.rows.map((row, index) =>
                            <tr key={index}>
                                {row.map(
                                    (cell, index) =>
                                        <td key={index}>{getCellContent(cell, data.columns[index])}</td>
                                )}
                            </tr>)}
                    </tbody>
                </Table>
    )
}

export default ResultsTable;