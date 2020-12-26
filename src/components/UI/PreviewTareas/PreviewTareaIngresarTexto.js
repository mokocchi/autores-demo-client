import React from "react";

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

const ingresaTexto = (code) => {
    switch (code) {
        case "es":
            return "Ingresa texto";
        case "ja":
            return "文を入力してください";
        case "en":
            return "Enter text";
        default:
            return "...";
    }
}

const ingresaNumero = (code) => {
    switch (code) {
        case "es":
            return "Ingresa el número";
        case "ja":
            return "数値を入力してください";
        case "en":
            return "Enter the number";
        default:
            return "...";
    }
}

const PreviewTareaIngresarTexto = (props) => {
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
                <div style={
                    {
                        paddingLeft: "0.2em",
                        color: "gray"
                    }
                }>
                    {
                        props.numero ? ingresaNumero(props.tarea.idioma): ingresaTexto(props.tarea.idioma) 
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

export default PreviewTareaIngresarTexto;