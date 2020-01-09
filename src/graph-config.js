import * as React from 'react';

export const NODE_KEY = 'id'; // Key used to identify nodes

// These keys are arbitrary (but must match the config)
// However, GraphView renders text differently for empty types
// so this has to be passed in if that behavior is desired.
export const EMPTY_TYPE = 'customEmpty'; // Empty node type
export const END_TYPE = 'end';
export const START_TYPE = 'start';
export const SELECTED_TYPE = 'selectedFirst';
export const SELECTED_TARGET_TYPE = 'selectedSecond';
export const EMPTY_EDGE_TYPE = 'emptyEdge';
export const SQUARE_EDGE_TYPE = 'squareEdge';

export const nodeTypes = [EMPTY_TYPE, END_TYPE, START_TYPE, SELECTED_TYPE, SELECTED_TARGET_TYPE];
export const edgeTypes = [EMPTY_EDGE_TYPE, SQUARE_EDGE_TYPE];

const EmptyNodeShape = (
  <symbol viewBox="0 0 154 154" width="154" height="154" id="emptyNode">
    <circle cx="77" cy="77" r="56" />
  </symbol>
);

const StartShape = (
  <symbol viewBox="0 0 160 160" width="160" height="160" id="start">
    <circle cx="77" cy="77" r="56" stroke="green" strokeWidth="3px" />
  </symbol>
);

//triggerShape
const OptionalTriggerShape = (
  <symbol viewBox="0 0 160 160" width="160" height="160" id="start">
    <circle cx="77" cy="77" r="56" stroke="green" strokeWidth="3px" fill="#ebebe0" />
    <path fill="orange" d="m 105,85 12.23866,0.0477 -10.89815,12.91207 12.63192,0.0395 -34.4828,25.47706 15.35055,-19.99263 -11.04267,-0.0851 z" />
  </symbol>
);

const SelectedShape = (
  <symbol viewBox="0 0 160 160" width="160" height="160" id="selected">
    <circle cx="77" cy="77" r="76" fill="steelblue" />
  </symbol>
)

const EndShape = (
  <symbol viewBox="0 0 160 160" width="160" height="160" id="end">
    <circle cx="77" cy="77" r="56" stroke="red" strokeWidth="3px" />
  </symbol>
);

const EmptyEdgeShape = (
  <symbol viewBox="0 0 50 50" id="emptyEdge">
    <circle cx="25" cy="25" r="8" fill="currentColor" />
  </symbol>
);

const SquareEdgeShape = (
  <symbol viewBox="0 0 50 50" id="squareEdge">
    <rect x="10" y="17" width="15" height="15" fill="currentColor"/>
  </symbol>
)

export default {
  EdgeTypes: {
    emptyEdge: {
      shape: EmptyEdgeShape,
      shapeId: '#emptyEdge',
    },
    squareEdge: {
      shape: SquareEdgeShape,
      shapeId: "#squareEdge"
    }
  },
  NodeSubtypes: {
  },
  NodeTypes: {
    emptyNode: {
      shape: EmptyNodeShape,
      shapeId: '#emptyNode',
      typeText: 'Tarea',
    },
    start: {
      shape: StartShape,
      shapeId: '#start',
      typeText: 'Inicio',
    },
    end: {
      shape: EndShape,
      shapeId: '#end',
      typeText: 'Fin',
    },
    selectedFirst: {
      shape: SelectedShape,
      shapeId: '#selected',
      typeText: 'Seleccionado'
    },
    selectedSecond: {
      shape: SelectedShape,
      shapeId: '#selected',
      typeText: 'Destino'
    }
  },
};
