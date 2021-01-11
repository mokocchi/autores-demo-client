import React from "react";
import Icon from 'react-web-vector-icons';

const continuar = (code) => {
    switch (code) {
        case "es":
            return "Continuar";
        case "ja":
            return "続く";
        case "en":
            return "Continue";
        default:
            return "->";
    }
}

const borders = (index, size) => {
    if (size == 1) {
        return "none"
    } else if (index == 0) {
        return "none none solid none"
    } else if (index == size - 1) {
        return "none"
    } else {
        return "none none solid none"
    }
}

const PreviewTareaOpcionMultiple = (props) => {
    return (
        <div style={{ width: "20em", backgroundColor: "#eff9f0", margin: "0 auto" }}>
            {/* header */}
            <div style={
                {
                    backgroundColor: "#264653",
                    color: "white",
                    textAlign: "center",
                    padding: "0.2em",
                    fontSize: "1.2em"
                }
            }>DEHIA</div>
            {/* cuerpo */}
            <div style={{ display: "flex", height: "32em", flexDirection: "column", justifyContent: "space-between" }}>
                {/* title */}
                <div style={
                    {
                        textAlign: "center",
                        fontSize: "1.6em",
                        padding: "0.2em"
                    }
                }>{props.tarea.title || "<NOMBRE>"}</div>
                <div style={
                    {
                        textAlign: "center",
                        fontSize: "1em",
                        paddingRight: "0.5em",
                        paddingLeft: "0.5em"
                    }
                }
                >{props.tarea.subtitle || "<CONSIGNA>"}</div>
                <div style={{
                    overflowY: "scroll"
                }}>
                    {props.tarea.elementos.map((elem, index) =>
                        <div key={index} style={
                            {
                                padding: "1em",
                                backgroundColor: "white",
                                borderStyle: borders(index, props.tarea.elementos.length),
                                borderColor: "#d6d6d6",
                                display: "flex",
                                justifyContent: "space-between"
                            }
                        }>
                            <div>
                                {elem.name}
                            </div>
                            <div>
                                <Icon name="square-o" font="FontAwesome" color="red" size={"1rem"} />
                            </div>
                        </div>
                    )
                    }
                </div>
                <div style={
                    {
                        backgroundColor: "#264653",
                        color: "white",
                        textAlign: "center",
                        marginLeft: "2em",
                        marginRight: "2em",
                        fontSize: "1.5em"
                    }
                }> {continuar(props.tarea.idioma)} </div>
                <div></div>
            </div>
        </div>
    )
}

export default PreviewTareaOpcionMultiple;