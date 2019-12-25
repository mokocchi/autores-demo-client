/*
  Example config for GraphView component
*/
import * as React from 'react';

export const NODE_KEY = 'id'; // Key used to identify nodes

// These keys are arbitrary (but must match the config)
// However, GraphView renders text differently for empty types
// so this has to be passed in if that behavior is desired.
export const EMPTY_TYPE = 'empty'; // Empty node type
export const EMPTY_EDGE_TYPE = 'emptyEdge';

export const nodeTypes = [EMPTY_TYPE];
export const edgeTypes = [EMPTY_EDGE_TYPE];

const EmptyNodeShape = (
  <symbol viewBox="0 0 154 154" width="259" height="154" id="node">
    <circle cx="77" cy="77" r="76" />
  </symbol>
);

const EmptyEdgeShape = (
  <symbol viewBox="0 0 50 50" id="edge">
  </symbol>
);

export default {
  EdgeTypes: {
    emptyEdge: {
      shape: EmptyEdgeShape,
      shapeId: '#edge',
    },
  },
  NodeSubtypes: {
  },
  NodeTypes: {
    emptyNode: {
      shape: EmptyNodeShape,
      shapeId: '#node',
      typeText: 'Tarea',
    },
  },
};
