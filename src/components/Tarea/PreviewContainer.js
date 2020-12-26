import React, {Component} from "react";
import PreviewTareaModal from "./PreviewModal";

class PreviewContainer extends Component {
    render() {
        return <PreviewTareaModal onClose={this.props.onCloseModal} show={this.props.modalOpened} tarea={this.props.tarea}/>
    }
}

export default PreviewContainer;