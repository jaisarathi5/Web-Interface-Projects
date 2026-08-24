export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  showResult = false,
}) {
  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="question-card">
      <div className="question-header">
        <span className="question-number">
          Question {questionNumber} of {totalQuestions}
        </span>
        <span className="question-marks">{question.marks} {question.marks === 1 ? 'mark' : 'marks'}</span>
      </div>

      <div className="question-text">{question.text}</div>

      <div className="options-list">
        {question.options.map((option, index) => {
          let optionClass = 'option-item';
          if (selectedAnswer === index) optionClass += ' selected';
          if (showResult) {
            if (index === question.correctAnswer) optionClass += ' correct';
            else if (selectedAnswer === index && index !== question.correctAnswer) optionClass += ' incorrect';
          }

          return (
            <button
              key={index}
              className={optionClass}
              onClick={() => !showResult && onAnswerSelect(index)}
              disabled={showResult}
            >
              <span className="option-label">{optionLabels[index]}</span>
              <span className="option-text">{option}</span>
              {showResult && index === question.correctAnswer && (
                <svg className="option-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
              {showResult && selectedAnswer === index && index !== question.correctAnswer && (
                <svg className="option-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="3">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              )}
            </button>
          );
        })}
      </div>

      {showResult && question.explanation && (
        <div className="explanation">
          <strong>Explanation:</strong> {question.explanation}
        </div>
      )}
    </div>
  );
}
