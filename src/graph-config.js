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

export const nodeTypes = [EMPTY_TYPE, END_TYPE, START_TYPE, SELECTED_TYPE, SELECTED_TARGET_TYPE];
export const edgeTypes = [EMPTY_EDGE_TYPE];

const EmptyNodeShape = (
  <symbol viewBox="0 0 154 154" width="154" height="154" id="emptyNode">
    <circle cx="77" cy="77" r="76" />
  </symbol>
);

const StartShape = (
  <symbol viewBox="0 0 160 160" width="160" height="160" id="start">
    <circle cx="77" cy="77" r="76" stroke="green" strokeWidth="3px" />
  </symbol>
);

const SelectedShape = (
  <symbol viewBox="0 0 160 160" width="160" height="160" id="selected">
    <circle cx="77" cy="77" r="76" fill="steelblue" />
  </symbol>
)

const EndShape = (
  <symbol viewBox="0 0 160 160" width="160" height="160" id="end">
    <circle cx="77" cy="77" r="76" stroke="red" strokeWidth="3px" />
  </symbol>
);

const EmptyEdgeShape = (
  <symbol viewBox="0 0 50 50" id="emptyEdge">
    <circle cx="25" cy="25" r="8" fill="currentColor" />
  </symbol>
);

export default {
  EdgeTypes: {
    emptyEdge: {
      shape: EmptyEdgeShape,
      shapeId: '#emptyEdge',
    },
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
