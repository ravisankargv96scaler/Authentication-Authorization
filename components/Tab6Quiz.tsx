import React, { useState } from 'react';
import { Award, Check, X, RotateCcw } from 'lucide-react';
import { Card } from './ui/Card';

const questions = [
  {
    id: 1,
    question: "Logging in with a password is an example of...",
    options: ["Authorization", "Authentication", "Accounting"],
    answer: 1 // Index
  },
  {
    id: 2,
    question: "An Admin deleting a user from the database is an example of...",
    options: ["Authentication", "Encryption", "Authorization"],
    answer: 2
  },
  {
    id: 3,
    question: "Which strategy allows for more fine-grained, dynamic control based on time or location?",
    options: ["RBAC (Role Based)", "ABAC (Attribute Based)", "MAC (Mandatory Access)"],
    answer: 1
  }
];

const Tab6Quiz: React.FC = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleOptionClick = (idx: number) => {
    if (selectedOption !== null) return; // Prevent double click
    
    setSelectedOption(idx);
    const correct = idx === questions[currentQ].answer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
    }

    // Auto advance
    setTimeout(() => {
      const next = currentQ + 1;
      if (next < questions.length) {
        setCurrentQ(next);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        setShowScore(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card title="Knowledge Check" subtitle="Test your understanding of AuthN vs AuthZ.">
        
        {showScore ? (
          <div className="text-center py-10 space-y-6">
            <div className="w-24 h-24 bg-gradient-to-br from-cyber-accent to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-xl">
              <Award className="w-12 h-12 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h2>
              <p className="text-xl text-slate-300">You scored {score} out of {questions.length}</p>
            </div>
            <div className="pt-4">
              <button 
                onClick={resetQuiz}
                className="flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-full transition-colors font-bold"
              >
                <RotateCcw className="w-4 h-4" /> Try Again
              </button>
            </div>
          </div>
        ) : (
          <div className="py-4">
            {/* Progress Bar */}
            <div className="w-full bg-slate-800 h-2 rounded-full mb-8">
              <div 
                className="bg-cyber-accent h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQ) / questions.length) * 100}%` }}
              ></div>
            </div>

            {/* Question */}
            <div className="mb-8 min-h-[100px]">
               <h3 className="text-xl font-bold text-white mb-2">Question {currentQ + 1}</h3>
               <p className="text-lg text-slate-300">{questions[currentQ].question}</p>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {questions[currentQ].options.map((option, idx) => {
                let btnClass = "bg-slate-800 border-slate-700 hover:bg-slate-750";
                
                if (selectedOption !== null) {
                   if (idx === questions[currentQ].answer) {
                     btnClass = "bg-emerald-900/50 border-emerald-500 text-emerald-300"; // Correct answer always green
                   } else if (idx === selectedOption) {
                     btnClass = "bg-red-900/50 border-red-500 text-red-300"; // Wrong selection
                   } else {
                     btnClass = "bg-slate-800 border-slate-700 opacity-50"; // Others
                   }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(idx)}
                    disabled={selectedOption !== null}
                    className={`w-full text-left p-4 rounded-lg border flex justify-between items-center transition-all ${btnClass}`}
                  >
                    <span>{option}</span>
                    {selectedOption !== null && idx === questions[currentQ].answer && <Check className="w-5 h-5" />}
                    {selectedOption !== null && idx === selectedOption && idx !== questions[currentQ].answer && <X className="w-5 h-5" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Tab6Quiz;