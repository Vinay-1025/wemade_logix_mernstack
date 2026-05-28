import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DataTypeViz = () => {
  const [selectedType, setSelectedType] = useState('primitive');

  const primitives = [
    { name: 'String', example: '"Hello"', desc: 'Text data' },
    { name: 'Number', example: '42', desc: 'Integers and decimals' },
    { name: 'Boolean', example: 'true', desc: 'Logical values' },
    { name: 'Null', example: 'null', desc: 'Intentional absence' },
    { name: 'Undefined', example: 'undefined', desc: 'Uninitialized value' }
  ];

  const references = [
    { name: 'Array', example: '[1, 2, 3]', desc: 'Ordered lists' },
    { name: 'Object', example: '{ id: 1 }', desc: 'Key-value pairs' },
    { name: 'Function', example: 'ƒ()', desc: 'Executable code' }
  ];

  return (
    <div className="datatype-viz">
      <div className="viz-controls">
        <button className={selectedType === 'primitive' ? 'active' : ''} onClick={() => setSelectedType('primitive')}>Primitive Types</button>
        <button className={selectedType === 'reference' ? 'active' : ''} onClick={() => setSelectedType('reference')}>Reference Types</button>
      </div>

      <div className="memory-model">
        <div className="memory-stack">
          <h4>Stack (Variables)</h4>
          <div className="memory-slot">
            <span className="slot-name">myVar</span>
            <motion.span 
              key={selectedType}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="slot-val"
            >
              {selectedType === 'primitive' ? '42' : 'Pointer [0x01]'}
            </motion.span>
          </div>
        </div>

        {selectedType === 'reference' && (
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="memory-heap"
          >
            <h4>Heap (Objects)</h4>
            <div className="heap-obj">
              <span className="obj-addr">[0x01]</span>
              <span className="obj-content">{'{ name: "JS" }'}</span>
            </div>
          </motion.div>
        )}
      </div>

      <div className="types-grid">
        {(selectedType === 'primitive' ? primitives : references).map((t, i) => (
          <motion.div 
            key={t.name}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="type-card"
          >
            <span className="type-title">{t.name}</span>
            <code className="type-example">{t.example}</code>
            <p className="type-desc">{t.desc}</p>
          </motion.div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .datatype-viz { padding: 20px; color: #333; background: #ffffff; width: 100%; height: 100%; min-height: 400px; box-sizing: border-box; }
        .viz-controls { display: flex; gap: 10px; justify-content: center; margin-bottom: 30px; }
        .viz-controls button { background: transparent; border: 1px solid #cbd5e1; color: #64748b; padding: 6px 15px; border-radius: 20px; cursor: pointer; font-size: 0.75rem; transition: all 0.3s; }
        .viz-controls button.active { background: #00d1d1; color: #fff; border-color: transparent; box-shadow: 0 0 10px rgba(0,209,209,0.4); }
        .memory-model { display: flex; gap: 40px; justify-content: center; margin-bottom: 30px; }
        .memory-stack, .memory-heap {
          background: #f8fafc;
          border: 1px solid rgba(0, 0, 0,0.1);
          padding: 15px;
          border-radius: 12px;
          width: 180px;
        }
        .memory-stack h4, .memory-heap h4 { font-size: 0.7rem; color: var(--primary-cyan); text-transform: uppercase; margin-top: 0; }
        .memory-slot, .heap-obj {
          padding: 10px;
          background: rgba(0, 0, 0,0.05);
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          font-family: monospace;
          font-size: 0.85rem;
        }
        .slot-name { color: #db2777; font-size: 0.7rem; }
        .slot-val { color: #16a34a; }
        .obj-addr { font-size: 0.6rem; color: #64748b; }
        .types-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; }
        .type-card {
          background: rgba(0, 0, 0,0.03);
          border: 1px solid rgba(0, 0, 0,0.05);
          padding: 12px;
          border-radius: 10px;
          text-align: center;
        }
        .type-title { font-weight: bold; color: var(--primary-cyan); display: block; margin-bottom: 4px; }
        .type-example { font-size: 0.8rem; background: #e2e8f0; padding: 2px 6px; border-radius: 4px; display: inline-block; margin-bottom: 8px; }
        .type-desc { font-size: 0.75rem; color: #64748b; margin: 0; }
      `}} />
    </div>
  );
};

export default DataTypeViz;
