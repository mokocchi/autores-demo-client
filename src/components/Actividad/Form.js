import React from 'react';
import { Form, Button, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';

import Input from '../UI/Input';
import FormDominioContainer from '../Dominio/FormContainer';
import SelectAPI from '../UI/SelectAPI';
import { getRandomSlug } from '../../utils';
import LoadSpinner from '../UI/LoadSpinner';

const Actividad = (props) => {
    return (
        <Formik
            initialValues={{
                nombre: '',
                objetivo: '',
                idioma: '',
                tipoPlanificacion: '',
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
                    if (!values.objetivo) {
                        errors.objetivo = "Falta objetivo";
                    }
                    if (!values.idioma) {
                        errors.idioma = "Falta idioma";
                    }
                    if (!props.clone && !values.tipoPlanificacion) {
                        errors.tipoPlanificacion = "Falta tipo de planificación";
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
                            <Input controlId={"formObjetivo"}
                                label={"Objetivo"}
                                name={"objetivo"}
                                type={"text"}
                                placeholder={"Objetivo"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.objetivo}
                            />
                            {errors.objetivo && touched.objetivo && errors.objetivo &&
                                <Form.Text className="text-danger" style={{ marginTop: "-1em" }}>
                                    {errors.objetivo}
                                </Form.Text>
                            }
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col>
                            <SelectAPI
                                uri={"/idiomas"}
                                attribute={"idioma"}
                                controlId={"formIdioma"}
                                label={"Idioma"}
                                name={"idioma"}
                                defaultValue={""}
                                placeholder={"Elegí un idioma"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.idioma && touched.idioma && errors.idioma &&
                                <Form.Text className="text-danger" style={{ marginTop: "-1em" }}>
                                    {errors.idioma}
                                </Form.Text>
                            }
                        </Col>
                        <Col>
                            {props.clone ? props.clonedActividad ?
                                <SelectAPI
                                    uri={'/tipos-planificacion'}
                                    attribute={"tipo-planificacion"}
                                    controlId={"formTipoPlanificacion"}
                                    label={"Tipo de planificación"}
                                    name={"tipoPlanificacion"}
                                    defaultValue={props.clonedActividad.tipo_planificacion.id}
                                    placeholder={"Elegí un tipo"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={true}
                                /> :
                                <LoadSpinner />
                                :
                                <SelectAPI
                                    uri={'/tipos-planificacion'}
                                    attribute={"tipo-planificacion"}
                                    controlId={"formTipoPlanificacion"}
                                    label={"Tipo de planificación"}
                                    name={"tipoPlanificacion"}
                                    defaultValue={""}
                                    placeholder={"Elegí un tipo"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            }
                            {
                                errors.tipoPlanificacion && touched.tipoPlanificacion && errors.tipoPlanificacion &&
                                <Form.Text className="text-danger" style={{ marginTop: "-1em" }}>
                                    {errors.tipoPlanificacion}
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
                                defaultValue={props.dominioDefaultValue}
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
                        <FormDominioContainer />
                        <Col></Col>
                    </Form.Row>
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
                            <Link to={"/actividad/" + props.actividadId + "/" + (props.clone ? `?clone=${props.clone}` : "")}>
                                <Button variant="primary" type="button" >Continuar</Button>
                            </Link>
                            :
                            <Button variant="info" onClick={submitForm} disabled={isSubmitting}>
                                Guardar
                        </Button>
                    }
                </Form>)}
        </Formik>
    )
}

export default Actividad;