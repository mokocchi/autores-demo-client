import React from 'react';

const Arrow = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" height="100" width="132" transform={"rotate(" + props.rotation + ")"}
        style={{ position: "absolute", left: props.x, top: props.y - 100, zIndex: 3 }}>
        <g fill={props.fill || "none"} stroke="gray" strokeWidth="4">
            <path transform="translate(-213 -210)" d="M280.54 301.91L342.74 261.61L280.54 221.31L280.54 246.86L214.59 246.86L214.59 276.43L280.54 276.43L280.54 301.91Z"></path>
        </g>
    </svg >
)

export default Arrow