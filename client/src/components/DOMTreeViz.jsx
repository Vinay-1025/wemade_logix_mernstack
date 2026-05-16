import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronDown, Plus, Trash2 } from 'lucide-react';

const DOMTreeViz = () => {
  const [tree, setTree] = useState({
    id: 'html',
    tag: 'html',
    children: [
      {
        id: 'body',
        tag: 'body',
        children: [
          { id: 'h1', tag: 'h1', text: 'Hello World', children: [] },
          { id: 'p', tag: 'p', text: 'Click to edit me', children: [] }
        ]
      }
    ]
  });

  const addChild = (parentId) => {
    const newChild = { id: Math.random().toString(36).substr(2, 9), tag: 'div', text: 'New Element', children: [] };
    const update = (node) => {
      if (node.id === parentId) return { ...node, children: [...node.children, newChild] };
      return { ...node, children: node.children.map(update) };
    };
    setTree(update(tree));
  };

  const removeNode = (nodeId) => {
    if (nodeId === 'html') return;
    const update = (node) => {
      return { ...node, children: node.children.filter(c => c.id !== nodeId).map(update) };
    };
    setTree(update(tree));
  };

  const Node = ({ node, depth = 0 }) => (
    <div className="dom-node-wrapper" style={{ marginLeft: depth * 20 }}>
      <div className="dom-node">
        <span className="tag-bracket">&lt;</span>
        <span className="tag-name">{node.tag}</span>
        <span className="tag-bracket">&gt;</span>
        {node.text && <span className="node-text">"{node.text}"</span>}
        
        <div className="node-actions">
          <button onClick={() => addChild(node.id)} title="Add child"><Plus size={14} /></button>
          <button onClick={() => removeNode(node.id)} title="Remove"><Trash2 size={14} /></button>
        </div>
      </div>
      <div className="node-children">
        {node.children.map(child => <Node key={child.id} node={child} depth={depth + 1} />)}
      </div>
      <div className="dom-node-closing">
        <span className="tag-bracket">&lt;/</span>
        <span className="tag-name">{node.tag}</span>
        <span className="tag-bracket">&gt;</span>
      </div>
    </div>
  );

  return (
    <div className="dom-viz">
      <div className="viz-header">
        <h4>Interactive DOM Tree Explorer</h4>
        <p>Add and remove nodes to see how the tree structure changes dynamically.</p>
      </div>
      <div className="tree-container">
        <Node node={tree} />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .dom-viz { padding: 20px; color: #94a3b8; font-family: monospace; }
        .viz-header { margin-bottom: 20px; }
        .viz-header h4 { color: var(--primary-cyan); margin: 0; }
        .tree-container {
          background: #0f172a;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.1);
          max-height: 400px;
          overflow-y: auto;
        }
        .dom-node-wrapper { margin: 4px 0; }
        .dom-node {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 8px;
          border-radius: 4px;
          transition: background 0.2s;
        }
        .dom-node:hover { background: rgba(255,255,255,0.05); }
        .tag-bracket { color: #64748b; }
        .tag-name { color: #f472b6; font-weight: bold; }
        .node-text { color: #4ade80; font-style: italic; }
        .node-actions {
          display: flex;
          gap: 4px;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .dom-node:hover .node-actions { opacity: 1; }
        .node-actions button {
          background: transparent;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 2px;
        }
        .node-actions button:hover { color: white; }
        .dom-node-closing {
          font-size: 0.9em;
          opacity: 0.8;
          padding-left: 4px;
        }
      `}} />
    </div>
  );
};

export default DOMTreeViz;
