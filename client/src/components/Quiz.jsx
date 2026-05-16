import React, { useState } from 'react';
import { CheckCircle2, XCircle, ChevronRight, Award, HelpCircle } from 'lucide-react';

const Quiz = ({ questions }) => {
  const [currentAnswers, setCurrentAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  if (!questions || questions.length === 0) return null;

  const handleOptionSelect = (qIdx, oIdx) => {
    if (showResults) return;
    setCurrentAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (currentAnswers[idx] === q.correctAnswer) score++;
    });
    return score;
  };

  return (
    <div className="quiz-section">
      <div className="section-header">
        <HelpCircle size={20} color="var(--primary)" />
        <h3>Knowledge Check</h3>
      </div>
      
      <div className="quiz-container">
        {questions.map((q, qIdx) => (
          <div key={qIdx} className="question-item">
            <p className="question-text">{qIdx + 1}. {q.question}</p>
            <div className="options-grid">
              {q.options.map((option, oIdx) => {
                const isSelected = currentAnswers[qIdx] === oIdx;
                const isCorrect = q.correctAnswer === oIdx;
                let statusClass = '';
                if (showResults) {
                  if (isCorrect) statusClass = 'correct';
                  else if (isSelected) statusClass = 'incorrect';
                } else if (isSelected) {
                  statusClass = 'selected';
                }

                return (
                  <button
                    key={oIdx}
                    className={`option-btn ${statusClass}`}
                    onClick={() => handleOptionSelect(qIdx, oIdx)}
                  >
                    <span>{option}</span>
                    {showResults && isCorrect && <CheckCircle2 size={16} />}
                    {showResults && isSelected && !isCorrect && <XCircle size={16} />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {!showResults ? (
          <button 
            className="btn btn-primary" 
            style={{ marginTop: 'var(--space-2)' }}
            onClick={() => setShowResults(true)}
            disabled={Object.keys(currentAnswers).length < questions.length}
          >
            Submit Quiz
          </button>
        ) : (
          <div className="quiz-results">
            <div className="score-card">
              <Award size={32} color="var(--primary-cyan)" />
              <div>
                <h4>Your Score: {calculateScore()} / {questions.length}</h4>
                <p>{calculateScore() === questions.length ? 'Perfect! You are ready to move on.' : 'Almost there! Review the concepts and try again.'}</p>
              </div>
            </div>
            <button className="btn" onClick={() => { setShowResults(false); setCurrentAnswers({}); }}>
              Retry Quiz
            </button>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .quiz-section {
          margin: var(--space-8) 0;
          padding: var(--space-4);
          background: var(--app-card-bg);
          border-radius: var(--radius-lg);
          border: 1px solid var(--app-border);
        }
        .section-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: var(--space-4);
        }
        .question-item {
          margin-bottom: var(--space-4);
          padding-bottom: var(--space-4);
          border-bottom: 1px solid var(--app-border);
        }
        .question-text {
          font-weight: 500;
          margin-bottom: var(--space-2);
          color: var(--app-text);
        }
        .options-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-2);
        }
        .option-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-2);
          background: var(--app-bg);
          border: 1px solid var(--app-border);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: var(--transition);
          text-align: left;
          color: var(--app-text);
          font-size: 0.9rem;
        }
        .option-btn:hover {
          border-color: var(--primary);
        }
        .option-btn.selected {
          border-color: var(--primary);
          background: rgba(0, 71, 171, 0.05);
        }
        .option-btn.correct {
          background: rgba(34, 197, 94, 0.1);
          border-color: #22c55e;
          color: #166534;
        }
        .option-btn.incorrect {
          background: rgba(239, 68, 68, 0.1);
          border-color: #ef4444;
          color: #991b1b;
        }
        .quiz-results {
          margin-top: var(--space-4);
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .score-card {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3);
          background: var(--brand-gradient);
          color: white;
          border-radius: var(--radius-lg);
        }
        .score-card p { color: rgba(255, 255, 255, 0.8); margin: 0; }
        @media (max-width: 640px) {
          .options-grid { grid-template-columns: 1fr; }
        }
      `}} />
    </div>
  );
};

export default Quiz;
