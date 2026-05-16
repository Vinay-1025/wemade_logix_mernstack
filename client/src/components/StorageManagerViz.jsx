import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Trash2, Plus } from 'lucide-react';

const StorageManagerViz = () => {
  const [items, setItems] = useState([]);
  const [newKey, setNewKey] = useState('');
  const [newVal, setNewVal] = useState('');

  const refreshStorage = () => {
    const all = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      all.push({ key, value: localStorage.getItem(key) });
    }
    setItems(all);
  };

  useEffect(() => {
    refreshStorage();
  }, []);

  const addItem = () => {
    if (!newKey) return;
    localStorage.setItem(newKey, newVal);
    setNewKey('');
    setNewVal('');
    refreshStorage();
  };

  const removeItem = (key) => {
    localStorage.removeItem(key);
    refreshStorage();
  };

  return (
    <div className="storage-viz">
      <div className="storage-input-grid">
        <input type="text" placeholder="Key" value={newKey} onChange={e => setNewKey(e.target.value)} />
        <input type="text" placeholder="Value" value={newVal} onChange={e => setNewVal(e.target.value)} />
        <button className="btn btn-primary" onClick={addItem}><Plus size={18} /> Set Item</button>
      </div>

      <div className="storage-display">
        <div className="display-header">
          <Database size={18} />
          <span>Browser LocalStorage</span>
          <button className="btn-small" onClick={refreshStorage}>Refresh</button>
        </div>
        <div className="items-list">
          <AnimatePresence>
            {items.length > 0 ? items.map((item) => (
              <motion.div 
                key={item.key} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="storage-item"
              >
                <div className="item-info">
                  <span className="item-key">{item.key}</span>
                  <span className="item-val">{item.value}</span>
                </div>
                <button className="delete-btn" onClick={() => removeItem(item.key)}><Trash2 size={14} /></button>
              </motion.div>
            )) : (
              <div className="empty-state">No items in LocalStorage</div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .storage-viz { padding: 20px; }
        .storage-input-grid { 
          display: grid; 
          grid-template-columns: 1fr 1fr auto; 
          gap: 10px; 
          margin-bottom: 20px; 
        }
        .storage-input-grid input {
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--app-border);
          border-radius: 8px;
          padding: 8px 12px;
          color: white;
          font-size: 0.9rem;
        }
        .storage-display {
          background: #0f172a;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.1);
          overflow: hidden;
        }
        .display-header {
          padding: 12px 15px;
          background: rgba(255,255,255,0.03);
          border-bottom: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--primary-cyan);
          font-size: 0.8rem;
          font-weight: bold;
          text-transform: uppercase;
        }
        .btn-small {
          margin-left: auto;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.7rem;
          cursor: pointer;
        }
        .items-list { padding: 10px; min-height: 100px; display: flex; flex-direction: column; gap: 8px; }
        .storage-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          background: rgba(255,255,255,0.05);
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .item-info { display: flex; gap: 15px; font-family: monospace; font-size: 0.85rem; }
        .item-key { color: #f472b6; font-weight: bold; }
        .item-val { color: #4ade80; }
        .delete-btn { background: transparent; border: none; color: #64748b; cursor: pointer; }
        .delete-btn:hover { color: #f87171; }
        .empty-state { text-align: center; color: #475569; padding: 20px; font-size: 0.85rem; }
      `}} />
    </div>
  );
};

export default StorageManagerViz;
