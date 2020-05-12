import React from 'react';
import LoadSpinner from '../../UI/LoadSpinner';
import { Alert, Table } from 'react-bootstrap';

const ResultsTable = ({ data, loading, error }) => {
    return (
        loading ?
            <LoadSpinner /> :
            error ? <Alert variant="danger">{error}</Alert>
                : data && <Table striped responsive>
                    <thead>
                        <tr>
                            {data.columns.map(col =>
                                <th>{col}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {data.rows.map(row =>
                            <tr>
                                {row.map(
                                    cell =>
                                        <td>{cell}</td>
                                )}
                            </tr>)}
                    </tbody>
                </Table>
    )
}

export default ResultsTable;