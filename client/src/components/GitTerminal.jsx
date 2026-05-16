import React, { useState } from 'react';
import { Terminal, GitBranch, CheckCircle, Package } from 'lucide-react';

const GitTerminal = () => {
  const [history, setHistory] = useState(['Welcome to Git Simulator. Type "git init" to start.']);
  const [command, setCommand] = useState('');
  const [gitState, setGitState] = useState({
    initialized: false,
    staged: [],
    committed: [],
    branch: 'main'
  });

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = command.trim().toLowerCase();
      let output = '';
      let newState = { ...gitState };

      if (cmd === 'git init') {
        newState.initialized = true;
        output = 'Initialized empty Git repository in /workspace/.git/';
      } else if (!newState.initialized) {
        output = 'Error: Not a git repository (run "git init" first)';
      } else if (cmd === 'git status') {
        if (gitState.staged.length === 0 && gitState.committed.length === 0) {
          output = 'On branch main. Nothing to commit, working tree clean.';
        } else if (gitState.staged.length > 0) {
          output = `On branch main. Changes to be committed: \n - ${gitState.staged.join('\n - ')}`;
        } else {
          output = 'On branch main. Untracked files: \n - index.html';
        }
      } else if (cmd === 'git add .') {
        newState.staged = ['index.html', 'style.css'];
        output = 'Added 2 files to staging area.';
      } else if (cmd.startsWith('git commit')) {
        if (gitState.staged.length === 0) {
          output = 'Nothing to commit (use "git add" first)';
        } else {
          newState.committed = [...gitState.committed, { msg: cmd.split('"')[1] || 'update', files: gitState.staged }];
          newState.staged = [];
          output = `[main (root-commit)] ${cmd.split('"')[1] || 'update'} \n 2 files changed, 42 insertions(+)`;
        }
      } else if (cmd === 'clear') {
        setHistory([]);
        setCommand('');
        return;
      } else {
        output = `Command not found: ${cmd}`;
      }

      setHistory([...history, `> ${command}`, output]);
      setGitState(newState);
      setCommand('');
    }
  };

  return (
    <div className="git-simulator">
      <div className="terminal-header">
        <Terminal size={14} />
        <span>Git Terminal Simulator</span>
        <div className="branch-tag">
          <GitBranch size={12} />
          {gitState.branch}
        </div>
      </div>
      
      <div className="terminal-body" onClick={() => document.getElementById('git-input').focus()}>
        {history.map((line, i) => (
          <div key={i} className="line">{line}</div>
        ))}
        <div className="input-line">
          <span className="prompt">$</span>
          <input 
            id="git-input"
            type="text" 
            value={command} 
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleCommand}
            autoFocus 
          />
        </div>
      </div>

      <div className="git-visualizer">
        <div className="viz-col">
          <div className="viz-label">STAGING AREA</div>
          <div className="viz-box">
            {gitState.staged.map((f, i) => (
              <div key={i} className="viz-file staged"><Package size={12} /> {f}</div>
            ))}
            {gitState.staged.length === 0 && <span className="empty">Empty</span>}
          </div>
        </div>
        <div className="viz-col">
          <div className="viz-label">COMMIT HISTORY</div>
          <div className="viz-box commits">
            {gitState.committed.map((c, i) => (
              <div key={i} className="viz-commit">
                <CheckCircle size={12} color="#4ade80" />
                <span>{c.msg}</span>
              </div>
            ))}
            {gitState.committed.length === 0 && <span className="empty">No commits</span>}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .git-simulator {
          background: #0f172a;
          border-radius: var(--radius-lg);
          border: 1px solid var(--app-border);
          overflow: hidden;
          font-family: 'Fira Code', monospace;
        }
        .terminal-header {
          background: #1e293b;
          padding: 10px 15px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.75rem;
          color: var(--text-neutral);
          border-bottom: 1px solid var(--app-border);
        }
        .branch-tag {
          margin-left: auto;
          background: rgba(0, 209, 209, 0.1);
          color: var(--primary-cyan);
          padding: 2px 8px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .terminal-body {
          height: 200px;
          padding: 15px;
          overflow-y: auto;
          font-size: 0.85rem;
          color: #e2e8f0;
          line-height: 1.5;
        }
        .input-line { display: flex; gap: 8px; }
        .prompt { color: #4ade80; }
        .terminal-body input {
          background: transparent;
          border: none;
          color: white;
          outline: none;
          flex: 1;
          font-family: inherit;
        }
        .git-visualizer {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: var(--app-border);
          border-top: 1px solid var(--app-border);
        }
        .viz-col { background: #1e293b; padding: 15px; }
        .viz-label { font-size: 0.65rem; font-weight: 800; color: var(--text-neutral); margin-bottom: 10px; text-transform: uppercase; }
        .viz-box { display: flex; flex-direction: column; gap: 6px; min-height: 60px; }
        .viz-file { padding: 4px 8px; background: rgba(74, 222, 128, 0.1); color: #4ade80; border-radius: 4px; font-size: 0.75rem; display: flex; align-items: center; gap: 6px; }
        .viz-commit { padding: 4px 8px; background: rgba(0, 209, 209, 0.05); color: #e2e8f0; border-radius: 4px; font-size: 0.75rem; display: flex; align-items: center; gap: 6px; }
        .empty { font-size: 0.75rem; color: #475569; font-style: italic; }
      `}} />
    </div>
  );
};

export default GitTerminal;
