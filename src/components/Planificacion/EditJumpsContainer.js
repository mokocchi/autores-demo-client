import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentActividad } from '../../redux/actions'

import 'arrive';

import tokenManager from '../../tokenManager';
import md5 from 'md5';
import { CONDITIONS_ARRAY } from '../../config';
import PlanificacionEditJumps from './EditJumps';

class PlanificacionEditJumpsContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            success: false,
            graphTareas: [],
            graphConexiones: [],
            showTarea: false,
            showConexion: false,
            selectedTarea: null,
            selectedConexion: null,
            selectedOpciones: [],
            errors: "",
            saveSuccess: false,
            showReferences: false,
            isLoadingSave: false,

            firstCircle: { x: 0, y: 0, width: 0, offset: 0 },
            rightPanel: { width: 0, height: 0 },
            slider: { x: 0, y: 0, width: 0 },
            step: 1,
            startTour: false,
            tour: true,
            clickedButtonStep4: false,
            selectedStep5: false,
            clickedButtonStep6: false,
            clickedButtonStep9: false,
            selectedStep13: false,
            clickCheckStep14: false,
            selectedStep15a: false,
            selectedStep15b: false,
        }
        this.Graph = React.createRef();
    }

    componentDidMount() {
        if (this.state.tour) {
            this.loadTourDummy()
        } else {
            this.setCurrentActividad(this.props.actividadId);
        }

        //step 1
        const isInTheMiddle = () => {
            const nodeX = document.getElementById("node-1").getBoundingClientRect().x;
            const colRect = document.getElementById("graph-col").getBoundingClientRect();
            return (((nodeX - colRect.x) / colRect.width) > 0.44)
        }

        //step 2
        const didZoomIn = () => {
            const slider = document.getElementsByClassName("slider")[0];
            return slider.getAttribute("value") > 80
        }

        //step 3 - 6
        //nothing

        //step 7
        const node2Visible = () => {
            const node2Rect = document.getElementById("node-2").getBoundingClientRect();
            const rightPanelRect = document.getElementById("right-panel").getBoundingClientRect()
            return node2Rect.right < rightPanelRect.right + (node2Rect.width * 0.6);
        }

        //step 10
        const createdConnection = () => {
            let arrows = document.getElementsByClassName("edge-overlay-path");
            if (arrows.length == 0) {
                return false;
            } else {
                return arrows[0].getAttribute("id") == "1_2";
            }
        }

        const waitFor = (conditionFunction) => {
            const poll = resolve => {
                if (conditionFunction()) resolve();
                else setTimeout(_ => poll(resolve), 400);
            }
            return new Promise(poll);
        }

        const waitForStep1 = () => {
            waitFor(_ => isInTheMiddle()).then(_ => {
                const rightPanelRect = document.getElementById("right-panel").getBoundingClientRect();
                this.setState({
                    rightPanel: {
                        width: rightPanelRect.width,
                        height: rightPanelRect.height
                    }
                });
                waitForStep2();
            })
        }

        const waitForStep2 = () => {
            waitFor(_ => didZoomIn()).then(_ => {
                const firstCircle = document.getElementById("node-1");
                const firstCircleRect = firstCircle.getBoundingClientRect();
                this.setState({
                    step: 2,
                    firstCircle: {
                        x: firstCircleRect.x,
                        y: firstCircleRect.y,
                        width: firstCircleRect.width
                    }
                })
                waitForStep3();
            })
        }

        const onClickButtonStep4 = () => {
            this.setState({
                clickedButtonStep4: true
            })
        }

        const waitForStep3 = () => {
            waitFor(_ => this.state.step == 3).then(_ => {
                document.getElementById("agregar-conexiones-modal").addEventListener("click", onClickButtonStep4);
                waitForStep4();
            })
        }

        const onChangeSelectStep5 = (ev) => {
            if (ev.target.value == "2") {
                this.setState({
                    selectedStep5: true
                })
            }
        }

        const waitForStep4 = () => {
            waitFor(_ => this.state.clickedButtonStep4).then(_ => {
                this.setState({
                    step: 4
                })
                document.getElementById("step-4").scrollIntoView();
                const select = document.getElementById("select-siguiente-tarea");
                select.addEventListener("change", onChangeSelectStep5);
                waitForStep5();
            })
        }

        const onClickButtonStep6 = () => {
            this.setState({
                clickedButtonStep6: true
            })
        }

        const waitForStep5 = () => {
            waitFor(_ => this.state.selectedStep5).then(_ => {
                this.setState({ step: 5 })
                document.getElementById("step-5").scrollIntoView();
                const select = document.getElementById("select-siguiente-tarea");
                select.removeEventListener("change", onChangeSelectStep5);
                const button = document.getElementById("agregar-conexion-button");
                button.addEventListener("click", onClickButtonStep6);
                waitForStep6();
            })
        }

        const waitForStep6 = () => {
            waitFor(_ => this.state.clickedButtonStep6).then(_ => {
                this.setState({
                    step: 6
                })
                document.getElementById("step-6").scrollIntoView();
                waitForStep7();
            })
        }

        const waitForStep7 = () => {
            waitFor(_ => node2Visible()).then(_ => {
                this.setState({
                    step: 7
                })
                document.getElementById("step-7").scrollIntoView();
                waitForStep8();
            })
        }

        const onClickButtonStep9 = () => {
            this.setState({
                clickedButtonStep9: true
            })
        }

        const waitForStep8 = () => {
            waitFor(_ => this.state.step == 8).then(_ => {
                document.getElementById("quitar-conexion-button").addEventListener("click", onClickButtonStep9);
                document.getElementById("step-8").scrollIntoView()
                waitForStep9();
            })
        }

        const waitForStep9 = () => {
            waitFor(_ => this.state.clickedButtonStep9).then(_ => {
                this.setState({
                    step: 9
                })
                document.getElementById("step-9").scrollIntoView();
                waitForStep10();
            })
        }

        const waitForStep10 = () => {
            waitFor(_ => isInTheMiddle()).then(_ => {
                this.setState({
                    step: 10
                })
                document.getElementById("step-10").scrollIntoView();
                waitForStep11();
            })
        }

        const waitForStep11 = () => {
            waitFor(_ => createdConnection()).then(_ => {
                this.setState({
                    step: 11
                })
                document.getElementById("step-11").scrollIntoView();
                waitForStep12();
            })
        }

        const onChangeSelectStep13 = (ev) => {
            if (ev.target.value == "3") {
                this.setState({
                    selectedStep13: true
                })
            }
        }

        const waitForStep12 = () => {
            waitFor(_ => this.state.step == 12).then(_ => {
                document.getElementById("step-12").scrollIntoView();

                waitFor(_ => document.getElementById("select-siguiente-tarea") != null).then(_ =>
                    document.getElementById("select-siguiente-tarea").addEventListener("change", onChangeSelectStep13)
                );
                waitForStep13();
            })
        }

        const onClickCheckStep14 = () => {
            this.setState({
                clickCheckStep14: true
            })
        }

        const waitForStep13 = () => {
            waitFor(_ => this.state.selectedStep13).then(_ => {
                this.setState({
                    step: 13
                })
                document.getElementById("step-13").scrollIntoView();
                document.getElementById("select-siguiente-tarea").removeEventListener("change", onChangeSelectStep13)
                document.getElementById("check-condicion").addEventListener("click", onClickCheckStep14)
                waitForStep14();
            })
        }

        const onChangeSelectStep15a = () => {
            this.setState({
                selectedStep14a: true
            })
        }

        const onChangeSelectStep15b = () => {
            this.setState({
                selectedStep14b: true
            })
        }

        const waitForStep14 = () => {
            waitFor(_ => this.state.clickCheckStep14).then(_ => {
                this.setState({
                    step: 14
                })
                document.getElementById("step-14").scrollIntoView();
                document.getElementById("check-condicion").removeEventListener("click", onClickCheckStep14)


                //!!!!!! revisar !!!!!
                waitFor(_ => document.getElementById("cuando-select") != null)
                    .then(_ => {
                        document.getElementById("cuando-select").addEventListener("change", onChangeSelectStep15a);
                        waitFor(_ => document.getElementById("yes-no-select") != null)
                            .then(
                                document.getElementById("yes-no-select").addEventListener("change", onChangeSelectStep15b)
                            )
                    })
                waitForStep15();
            })
        }

        const waitForStep15 = () => {
            waitFor(_ => this.state.selectedStep14a && this.state.selectedStep14b).then(_ => {
                this.setState({
                    step: 15
                })
                document.getElementById("cuando-select").removeEventListener("change", onChangeSelectStep15a)
                document.getElementById("yes-no-select").removeEventListener("change", onChangeSelectStep15b)
                document.getElementById("step-15").scrollIntoView();
                waitForStep16();
            })
        }

        const waitForStep16 = () => {

        }

        document.arrive(".slider", () => {
            const sliderRect = document.getElementsByClassName("slider")[0].getBoundingClientRect();
            this.setState({
                slider: {
                    x: sliderRect.x,
                    y: sliderRect.y,
                    width: sliderRect.width
                }
            })
            waitForStep1();
        }
        );

    }

    onStartTour = () => {
        this.setState({
            startTour: true
        })
    }

    onUpdateTarea = (tarea) => {
        this.setState({
            graphTareas: [...this.state.graphTareas.map(t => t.id === tarea.id ? tarea : t)]
        })
    }

    onAddConexion = (newConexion) => {
        this.setState({
            graphConexiones: [...this.state.graphConexiones.filter(conexion => conexion.id !== newConexion.id), newConexion]
        })
    }

    onResetSaltos = (tareaId) => {
        const newSaltos = this.state.graphConexiones.filter(
            conexion =>
                conexion.origen !== tareaId &&
                conexion.destino !== tareaId)
        this.setState({
            graphConexiones: [...newSaltos]
        })
    }

    onRemoveConexion = (conexion) => {
        const conexiones = this.state.graphConexiones;
        const newConexiones = conexiones.filter(con => con.id !== conexion.id);
        this.setState({
            graphConexiones: [...newConexiones]
        })
    }

    loadTourDummy() {
        const conexiones = [];
        const dataTareas = [
            {
                nombre: "Tarea simple 1",
                id: 1
            },
            {
                nombre: "Tarea con opciones 1",
                id: 2,
                tipo: {
                    id: "6",
                },
                extra: {
                    elements: [
                        {
                            code: "1",
                            name: "Uno"
                        },
                        {
                            code: "2",
                            name: "Dos"
                        },
                    ]
                }
            },
            {
                nombre: "Tarea simple 2",
                id: 3
            },
            {
                nombre: "Tarea simple 3",
                id: 4
            },
            {
                nombre: "Tarea simple 4",
                id: 5
            }
        ]
        const tareas = dataTareas.map((tarea, index) => {
            return {
                ...tarea,
                nombre: (index + 1) + ". " + tarea.nombre,
                id: tarea.id,
                graphId: index + 1,
                optional: false,
                initial: false
            }
        })
        this.setState({
            graphTareas: tareas,
            graphConexiones: conexiones,
            success: true
        });
    }

    async setCurrentActividad() {
        const id = this.props.actividad.id;
        this.props.dispatch(setCurrentActividad(this.props.actividad));
        const dataTareas = await tokenManager.getTareasForActividad(id);
        if (dataTareas.error_code) {
            this.setState({
                error: true,
                errorMessage: dataTareas.user_message
            });
            return;
        }
        const conexiones = [];
        const planificacion = await tokenManager.getPlanificacionForActividad(id);

        planificacion.saltos.forEach(salto => {
            const origen = salto.origen_id;
            const destinos = salto.destino_ids;
            destinos.forEach(destino => {
                const conexion = {
                    origen,
                    destino,
                    id: md5(origen + "_" + destino + (salto.condicion ? "_" + salto.condicion + "_" + salto.respuesta : ""))
                }
                if (salto.respuesta) {
                    const condicionName = CONDITIONS_ARRAY.find(item => item.code === salto.condicion).name;
                    conexion.condicion = {
                        code: salto.condicion,
                        name: condicionName
                    };
                    if (!["YES", "NO"].includes(salto.condicion)) {
                        switch (salto.condicion) {
                            case "CORRECT":
                                conexion.respuesta = {
                                    id: salto.respuesta,
                                    name: "todos"
                                }
                                break;
                            case "INCORRECT":
                                conexion.respuesta = {
                                    id: salto.respuesta,
                                    name: "no todos"
                                }
                                break;
                            case "YES_TASK":
                            case "NO_TASK":
                                const tareaNombre = dataTareas.results.find(item => item.codigo === salto.respuesta).nombre
                                conexion.respuesta = {
                                    id: salto.respuesta,
                                    name: tareaNombre
                                };
                                break;
                            default:
                                break;
                        }
                    } else {
                        const opcion = dataTareas.results.find(item => item.id === salto.origen_id).extra.elements.find(item => item.code === salto.respuesta);
                        let respuestaNombre = "";
                        if (opcion) {
                            respuestaNombre = opcion.name;
                        } else {
                            respuestaNombre = null;
                            conexion.crossed = true;
                        }
                        conexion.respuesta = {
                            id: salto.respuesta,
                            name: respuestaNombre
                        };
                    }
                }
                conexiones.push(conexion);
            })
        });

        const tareas = dataTareas.results.map((tarea, index) => {
            return {
                ...tarea,
                nombre: (index + 1) + ". " + tarea.nombre,
                id: tarea.id,
                graphId: index + 1,
                optional: planificacion.opcionales_ids.find(o => o === tarea.id) || false,
                initial: planificacion.iniciales_ids.find(i => i === tarea.id) || false
            }
        })
        this.setState({
            graphTareas: tareas,
            graphConexiones: conexiones,
            success: true
        });
    }

    createJumps(tarea, graphNodes) {
        const saltos = [];
        const jumps = graphNodes[tarea.id];
        const conditionalJumps = jumps.filter(jump => jump.condicion);
        console.log(conditionalJumps);
        const jumpsByAnswer = {};
        conditionalJumps.forEach(jump => {
            (jumpsByAnswer[jump.respuesta.id] = jumpsByAnswer[jump.respuesta.id] || []).push(jump)
        })
        Object.keys(jumpsByAnswer).forEach(key => {
            const targetByCondition = {};
            jumpsByAnswer[key].forEach(jump => {
                (targetByCondition[jump.condicion.code] = targetByCondition[jump.condicion.code] || []).push(jump.destino)
            })
            Object.keys(targetByCondition).forEach(k => {
                console.log("salto condicional");
                saltos.push({
                    "origen": tarea.id,
                    "condicion": k,
                    "destinos": targetByCondition[k],
                    "respuesta": key
                });
            })
        })
        const targets = jumps.filter(jump => jump.condicion === undefined).map(jump => jump.destino);
        //conditionalJumps.length === 0 && 

        console.log(targets);
        if (targets.length > 0) {
            console.log("salto forzado");
            saltos.push({
                "origen": tarea.id,
                "condicion": "ALL",
                "destinos": targets
            });
        }
        return saltos;
    }

    onGuardarClick = () => {
        this.setState({ isLoadingSave: true })
        const actividadId = this.props.currentActividad.id;
        const tareas = this.state.graphTareas;
        const conexiones = this.state.graphConexiones;
        if (conexiones.find(c => c.crossed)) {
            this.setState({
                errors: "Falta corregir opciones"
            })
            return
        }
        const graphNodes = {};
        tareas.forEach(tarea => { graphNodes[tarea.id] = [] });
        conexiones.forEach(conexion => {
            graphNodes[conexion.origen].push(conexion);
        })
        let saltos = [];
        tareas.forEach(tarea => saltos = saltos.concat(this.createJumps(tarea, graphNodes)));
        const opcionalIds = this.state.graphTareas.filter(tarea => tarea.optional).map(tarea => tarea.id);
        let inicialIds = this.state.graphTareas.filter(tarea => tarea.initial).map(tarea => tarea.id);
        const destinos = this.state.graphConexiones.map(conexion => conexion.destino);
        this.state.graphTareas.forEach(tarea => {
            if (!destinos.includes(tarea.id)) {
                inicialIds = [...inicialIds.filter(id => id !== tarea.id), tarea.id]
            }
        })
        this.setPlanificacion(opcionalIds, inicialIds, saltos, actividadId);
    }

    async setPlanificacion(opcionales, iniciales, saltos, id) {
        const data = await tokenManager.setPlanificacionInActividad({
            "saltos": saltos,
            "iniciales": iniciales,
            "opcionales": opcionales
        }, id);
        if (data.error_code) {
            this.setState({
                saveSuccess: false,
                isLoadingSave: false,
                errors: data.user_message
            })
        } else {
            this.setState({
                saveSuccess: true,
                isLoadingSave: false
            })
        }
    }


    handleShowTarea = (tareaId) => {
        const tarea = this.state.graphTareas.find(tarea => tarea.id === tareaId);
        this.setState({
            showTarea: true,
            selectedTarea: tarea,
        })
        if (this.state.step == 2) {
            this.setState({
                step: 3
            })
        }
        if (this.state.step == 11) {
            this.setState({
                step: 12
            })
        }
    }

    handleCloseTarea = () => {
        this.setState({
            showTarea: false,
            selectedTarea: null
        })
    }

    handleShowConexion = (conexionId) => {
        const conexion = this.state.graphConexiones.find(conexion => conexion.id === conexionId);
        const tarea = this.state.graphTareas.find(t => t.id === conexion.origen);
        this.setState({
            showConexion: true,
            selectedConexion: conexion,
            selectedOpciones: tarea.extra ? tarea.extra.elements : []
        })
        if ((this.state.step == 7) && (tarea.id == 1)) {
            this.setState({
                step: 8
            })
        }
    }

    handleCloseConexion = () => {
        this.setState({
            showConexion: false,
            selectedConexion: null
        })
    }

    setOpcion = (code, nombre) => {
        const conexiones = this.state.graphConexiones.map(conexion => {
            if (conexion.id !== this.state.selectedConexion.id) {
                return conexion
            } else {
                return {
                    ...conexion,
                    respuesta: {
                        id: code,
                        name: nombre
                    },
                    crossed: false
                }
            }
        })
        this.setState({
            graphConexiones: [...conexiones]
        })
        this.handleCloseConexion();
    }

    onClickReferences = () => this.setState({ showReferences: true })

    onHideReferences = () => this.setState({ showReferences: false })

    render() {
        return (
            <PlanificacionEditJumps graphConexiones={this.state.graphConexiones} tareas={this.state.graphTareas}
                conexiones={this.state.graphConexiones} actividadId={this.state.tour ? 0 : this.props.actividad.id} clone={this.props.clone}

                selectedTarea={this.state.selectedTarea} handleCloseTarea={this.handleCloseTarea}
                showTarea={this.state.showTarea} onShowTarea={this.handleShowTarea}
                onClickNode={this.handleShowTarea} onClickEdge={this.handleShowConexion}
                onUpdateTarea={this.onUpdateTarea} onAddConexion={this.onAddConexion}

                selectedConexion={this.state.selectedConexion} handleCloseConexion={this.handleCloseConexion}
                showConexion={this.state.showConexion} onShowConexion={this.handleShowConexion}
                onRemoveConexion={this.onRemoveConexion} setOpcion={this.setOpcion}
                onGuardarClick={this.onGuardarClick} selectedOpciones={this.state.selectedOpciones} errors={this.state.errors}

                showReferences={this.state.showReferences} onHideReferences={this.onHideReferences} onClickReferences={this.onClickReferences}
                success={this.state.success} saveSuccess={this.state.saveSuccess} isLoadingSave={this.state.isLoadingSave}

                tour={this.state.tour}
                step={this.state.step} firstCircle={this.state.firstCircle} rightPanel={this.state.rightPanel} slider={this.state.slider}
                onStartTour={this.onStartTour} startTour={this.state.startTour}
            />
        )
    }
}

function mapStateToProps(state) {
    const { currentActividad } = state.actividad;
    const { chosenTareas } = state.actividadTareas;
    return {
        currentActividad,
        chosenTareas
    }
}
export default connect(mapStateToProps)(PlanificacionEditJumpsContainer);