import * as React from 'react';
import { Button } from 'react-bootstrap';

import {
  GraphView,
  IEdgeType as IEdge,
  type INodeType as INode,
  type LayoutEngineType,
} from 'react-digraph';

import GraphConfig, {
  EMPTY_EDGE_TYPE,
  EMPTY_TYPE,
  START_TYPE,
  END_TYPE,
  SELECTED_TYPE,
  SELECTED_TARGET_TYPE,
  NODE_KEY,
} from './graph-config'; // Configures node/edge types
type IGraph = {
  nodes: INode[],
  edges: IEdge[],
};

type IGraphProps = {};

type IGraphState = {
  graph: any,
  selected: any,
  copiedNode: any,
  layoutEngineType?: LayoutEngineType,
};

function getGraph(tareas) {
  const nodes = tareas.map((tarea, index) => {
    return {
      id: tarea.id,
      title: tarea.graphId,
      type: START_TYPE
    }
  })
  return {
    edges: [],
    nodes: nodes
  }
}

function getNodesWithTypeUpdated(nodes, edges) {
  const neighbours = edges.map(edge => edge.target);
  const sources = edges.map(edge => edge.source);
  const newNodes = nodes.map(node => {
    if (!neighbours.includes(node.id)) {
      return {
        ...node,
        type: START_TYPE
      };
    }
    else if (!sources.includes(node.id)) {
      return {
        ...node,
        type: END_TYPE
      };
    }
    else {
      return {
        ...node,
        type: EMPTY_TYPE
      }
    }
  });
  return newNodes;
}

class Graph extends React.Component<IGraphProps, IGraphState> {
  GraphView;

  constructor(props: IGraphProps) {
    super(props);

    this.state = {
      layoutEngineType: "HorizontalTree",
      selected: null,
      graph: { nodes: [], edges: [] }
    };

    this.GraphView = React.createRef();
  }

  // Helper to find the index of a given node
  getNodeIndex(searchNode: INode | any) {
    return this.state.graph.nodes.findIndex(node => {
      return node[NODE_KEY] === searchNode[NODE_KEY];
    });
  }

  // Helper to find the index of a given edge
  getEdgeIndex(searchEdge: IEdge) {
    return this.state.graph.edges.findIndex(edge => {
      return (
        edge.source === searchEdge.source && edge.target === searchEdge.target
      );
    });
  }

  // Given a nodeKey, return the corresponding node
  getViewNode(nodeKey: string) {
    const searchNode = {};

    searchNode[NODE_KEY] = nodeKey;
    const i = this.getNodeIndex(searchNode);

    return this.state.graph.nodes[i];
  }

  /*
   * Handlers/Interaction
   */

  // Called by 'drag' handler, etc..
  // to sync updates from D3 with the graph
  onUpdateNode = () => { };

  // Node 'mouseUp' handler
  onSelectNode = (viewNode: INode | null) => {
    // Deselect events will send Null viewNode
    this.setState({
      selected: viewNode,
    });
  };

  // Edge 'mouseUp' handler
  onSelectEdge = (viewEdge: IEdge) => {
    this.setState({ selected: viewEdge });
  };

  // Updates the graph with a new node
  onCreateNode = () => { };

  // Deletes a node from the graph
  onDeleteNode = () => { };

  onConnect = () => { }

  // Creates a new node between two edges
  onCreateEdge = () => { };

  // Called when an edge is reattached to a different target.
  onSwapEdge = () => { };

  // Called when an edge is deleted
  onDeleteEdge = () => { };


  outputJumps = () => {
    const actividadId = this.props.actividadId;
    const { nodes, edges } = this.state.graph;
    const codesById = {};
    this.props.tareas.forEach(tarea => codesById[tarea.id] = tarea.codigo);
    const graphNodes = {};
    nodes.forEach(node => { graphNodes[node.id] = [] });
    edges.forEach(edge => {
      graphNodes[edge.source].push(edge.target);
    })
    this.props.tareas.forEach(tarea => {
      const nextId = graphNodes[tarea.id];
      this.saveJump(tarea.id, nextId, actividadId);
    })
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { tareas } = nextProps;
    const prevNodes = prevState.graph.nodes;
    if (tareas.length !== prevNodes.length) {
      const newGraph = getGraph(tareas);
      let newNodes = newGraph.nodes.map(node => {
        const nodeIndex = prevNodes.findIndex(prevNode => node.id === prevNode.id);
        if (nodeIndex === -1) {
          //check for better positioning
          return {
            ...node,
            x: 300,
            y: 300
          }
        } else {
          return prevNodes[nodeIndex];
        }
      })
      newGraph.nodes = getNodesWithTypeUpdated(newNodes, [])

      return {
        graph: newGraph
      }
    } else {
      return null
    }
  }

  /*
   * Render
   */

  render() {
    const { nodes, edges } = this.state.graph;
    const selected = this.state.selected;
    const { NodeTypes, NodeSubtypes, EdgeTypes } = GraphConfig;

    return (
      <div id="graph" style={{ height: "26em" }}>
        <GraphView
          ref={el => (this.GraphView = el)}
          nodeKey={NODE_KEY}
          nodes={nodes}
          edges={edges}
          selected={selected}
          nodeTypes={NodeTypes}
          nodeSubtypes={NodeSubtypes}
          edgeTypes={EdgeTypes}
          onSelectNode={this.onSelectNode}
          onCreateNode={this.onCreateNode}
          onUpdateNode={this.onUpdateNode}
          onDeleteNode={this.onDeleteNode}
          onSelectEdge={this.onSelectEdge}
          onCreateEdge={this.onCreateEdge}
          onSwapEdge={this.onSwapEdge}
          onDeleteEdge={this.onDeleteEdge} HorizontalTree
          onUndo={this.onUndo}
          onCopySelected={this.onCopySelected}
          onPasteSelected={this.onPasteSelected}
          layoutEngineType={this.state.layoutEngineType}
        />
        <Button type="button" className="float-right" variant="success" onClick={this.outputJumps} >Exportar saltos</Button>

      </div>
    );
  }
}

export default Graph;
