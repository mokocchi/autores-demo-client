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
  NODE_KEY,
} from './graph-config'; // Configures node/edge types

type IGraph = {
  nodes: INode[],
  edges: IEdge[],
};

// NOTE: Edges must have 'source' & 'target' attributes
// In a more realistic use case, the graph would probably originate
// elsewhere in the App or be generated from some other state upstream of this component.
const sample: IGraph = {
  edges: [
    {
      handleText: '5',
      handleTooltipText: '5',
      source: 'start1',
      target: 'a1',
      type: EMPTY_EDGE_TYPE,
    }
  ],
  nodes: [
    {
      id: 'start1',
      title: 'Tarea 1',
      type: EMPTY_TYPE,
      x: 200,
      y: 300
    },
    {
      id: 'a1',
      title: 'Tarea 2',
      type: EMPTY_TYPE,
      x: 200,
      y: 600,
    }
  ],
};

function getGraph(tareas) {
  const nodes = tareas.map((tarea, index) => {
    return {
      id: tarea.id,
      title: index + 1,
      type: EMPTY_TYPE,
      x: 0 + 300 * index,
      y: 0
    }
  })
  const edges = tareas.map((tarea, index) => {
    if (index + 1 !== tareas.length) {
      const target = tareas[index + 1].id;
      return {
        source: tarea.id,
        target: target,
        type: EMPTY_EDGE_TYPE
      }
    }
  })
  return {
    edges: edges.filter(item => item != null),
    nodes: nodes
  }
}


type IGraphProps = {};

type IGraphState = {
  graph: any,
  selected: any,
  totalNodes: number,
  copiedNode: any,
  layoutEngineType?: LayoutEngineType,
};

class Graph extends React.Component<IGraphProps, IGraphState> {
  GraphView;

  constructor(props: IGraphProps) {
    super(props);

    this.state = {
      copiedNode: null,
      graph: getGraph(props.tareas),
      layoutEngineType: undefined,
      selected: null,
      totalNodes: sample.nodes.length,
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
  onUpdateNode = (viewNode: INode) => {
    const graph = this.state.graph;
    const i = this.getNodeIndex(viewNode);

    graph.nodes[i] = viewNode;
    this.setState({ graph });
  };

  // Node 'mouseUp' handler
  onSelectNode = (viewNode: INode | null) => {
    // Deselect events will send Null viewNode
    this.setState({ selected: viewNode });
  };

  // Edge 'mouseUp' handler
  onSelectEdge = (viewEdge: IEdge) => {
    this.setState({ selected: viewEdge });
  };

  // Updates the graph with a new node
  onCreateNode = (x: number, y: number) => {
    const graph = this.state.graph;

    // This is just an example - any sort of logic
    // could be used here to determine node type
    // There is also support for subtypes. (see 'sample' above)
    // The subtype geometry will underlay the 'type' geometry for a node
    const type = EMPTY_TYPE;

    const viewNode = {
      id: Date.now(),
      title: '',
      type,
      x,
      y,
    };

    graph.nodes = [...graph.nodes, viewNode];
    this.setState({ graph });
  };

  // Deletes a node from the graph
  onDeleteNode = (viewNode: INode, nodeId: string, nodeArr: INode[]) => {
    return;
    const graph = this.state.graph;
    // Delete any connected edges
    const newEdges = graph.edges.filter((edge) => {
      return (
        edge.source !== viewNode[NODE_KEY] && edge.target !== viewNode[NODE_KEY]
      );
    });

    graph.nodes = nodeArr;
    graph.edges = newEdges;

    this.setState({ graph, selected: null });
  };

  // Creates a new node between two edges
  onCreateEdge = (sourceViewNode: INode, targetViewNode: INode) => {
    const graph = this.state.graph;
    // This is just an example - any sort of logic
    // could be used here to determine edge type
    const type = EMPTY_EDGE_TYPE;

    const viewEdge = {
      source: sourceViewNode[NODE_KEY],
      target: targetViewNode[NODE_KEY],
      type,
    };

    // Only add the edge when the source node is not the same as the target
    if (viewEdge.source !== viewEdge.target) {
      graph.edges = [...graph.edges, viewEdge];
      this.setState({
        graph,
        selected: viewEdge,
      });
    }
  };

  // Called when an edge is reattached to a different target.
  onSwapEdge = (
    sourceViewNode: INode,
    targetViewNode: INode,
    viewEdge: IEdge
  ) => {
    const graph = this.state.graph;
    const i = this.getEdgeIndex(viewEdge);
    const edge = JSON.parse(JSON.stringify(graph.edges[i]));

    edge.source = sourceViewNode[NODE_KEY];
    edge.target = targetViewNode[NODE_KEY];
    graph.edges[i] = edge;
    // reassign the array reference if you want the graph to re-render a swapped edge
    graph.edges = [...graph.edges];

    this.setState({
      graph,
      selected: edge,
    });
  };

  // Called when an edge is deleted
  onDeleteEdge = (viewEdge: IEdge, edges: IEdge[]) => {
    const graph = this.state.graph;

    graph.edges = edges;
    this.setState({
      graph,
      selected: null,
    });
  };


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
          onDeleteEdge={this.onDeleteEdge}
          onUndo={this.onUndo}
          onCopySelected={this.onCopySelected}
          onPasteSelected={this.onPasteSelected}
          layoutEngineType={this.state.layoutEngineType}
        />
        <Button type="button" className="float-right" variant="info" onClick={() => console.log(this.state.graph)} >Mostrar grafo</Button>
      </div>
    );
  }
}

export default Graph;
