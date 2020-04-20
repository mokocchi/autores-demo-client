import React from 'react';
import { Form, Button, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Input from '../UI/Input';
import SelectAPI from '../UI/SelectAPI';
import FormDominioContainer from '../Dominio/FormContainer';
import TareaExtra from './TareaExtra';
import { Formik } from 'formik';
import { getRandomSlug } from '../../utils';

const FormTarea = (props) => {
    return (
        <Formik
            initialValues={{
                nombre: '',
                consigna: '',
                tipo: '',
                dominio: '',
                estado: '',
                codigo: getRandomSlug()
            }}
            validator={() => ({})}
            validate={
                values => {
                    const errors = {};
                    if (!values.nombre) {
                        errors.nombre = "Falta nombre";
                    }
                    if (!values.consigna) {
                        errors.consigna = "Falta consigna";
                    }
                    if (!values.tipo) {
                        errors.tipo = "Falta tipo de tarea";
                    }
                    if (!values.dominio) {
                        errors.dominio = "Falta dominio";
                    }
                    if (!values.estado) {
                        errors.estado = "Falta estado";
                    }
                    return errors;
                }
            }
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                props.onSubmit(values);
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                submitForm,
                isSubmitting,
            }) =>
                (<Form>
                    <Form.Row>
                        <Col>
                            <Input controlId={"formNombre"}
                                label={"Nombre"}
                                name={"nombre"}
                                type={"text"}
                                placeholder={"Nombre"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.nombre}
                            />
                            {errors.nombre && touched.nombre && errors.nombre &&
                                <Form.Text className="text-danger" style={{ marginTop: "-1em" }}>
                                    {errors.nombre}
                                </Form.Text>
                            }
                        </Col>
                        <Col>
                            <Input controlId={"formConsigna"}
                                label={"Consigna"}
                                name={"consigna"}
                                type={"text"}
                                placeholder={"Consigna"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.consigna}
                            />
                            {errors.consigna && touched.consigna && errors.consigna &&
                                <Form.Text className="text-danger" style={{ marginTop: "-1em" }}>
                                    {errors.consigna}
                                </Form.Text>
                            }
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col>
                            <SelectAPI
                                uri={"/tipos-tarea"}
                                attribute={"tipo"}
                                controlId={"formTipo"}
                                label={"Tipo"}
                                name={"tipo"}
                                defaultValue={""}
                                placeholder={"Elegí un tipo"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.tipo && touched.tipo && errors.tipo &&
                                <Form.Text className="text-danger" style={{ marginTop: "-1em" }}>
                                    {errors.tipo}
                                </Form.Text>
                            }
                        </Col>
                        <Col>
                            <SelectAPI
                                uri={'/estados'}
                                attribute={"estado"}
                                controlId={"formEstado"}
                                label={"Estado"}
                                name={"estado"}
                                defaultValue={""}
                                placeholder={"Elegí un estado"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.estado && touched.estado && errors.estado &&
                                <Form.Text className="text-danger" style={{ marginTop: "-1em" }}>
                                    {errors.estado}
                                </Form.Text>
                            }
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <SelectAPI
                                uri={'/dominios'}
                                attribute={"dominio"}
                                controlId={"formDominio"}
                                label={"Dominio"}
                                name={"dominio"}
                                defaultValue={""}
                                placeholder={"Elegí un dominio"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.dominio && touched.dominio && errors.dominio &&
                                <Form.Text className="text-danger" style={{ marginTop: "-1em" }}>
                                    {errors.dominio}
                                </Form.Text>
                            }
                        </Col>
                        <Col></Col>
                    </Form.Row>
                    <Form.Row>
                        <FormDominioContainer />
                        <Col></Col>
                    </Form.Row>

                    <hr />

                    <TareaExtra tipoTarea={values.tipo} />

                    {props.error &&
                        <Form.Text className="text-danger" style={{ marginTop: "-1em" }}>
                            {props.errorMessage}
                        </Form.Text>
                    }
                    {props.isLoading ?
                        <Button variant="info" disabled>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            Cargando...
                    </Button>
                        :
                        props.success ?
                            <Link to={"/actividad/" + props.actividadId + (props.clone ? "?clone=" + props.clone : "")}>
                                <Button variant="primary" type="button" >Continuar</Button>
                            </Link>
                            :
                            <Button variant="info" type="button" disabled={props.success} onClick={submitForm}>
                                Guardar
                        </Button>
                    }
                </Form>)}
        </Formik>
    )
}

export default FormTarea;