import React, { useState, useEffect } from 'react';

const fetchQuizData = async () => {
  const response = await fetch('https://opentdb.com/api.php?amount=10');
  const data = await response.json();
  return data;
};

const QuizGame = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizOver, setIsQuizOver] = useState(false);

  useEffect(() => {
    const getQuestions = async () => {
      const quizData = await fetchQuizData();
      setQuestions(quizData);
    };
    getQuestions();
  }, []);

  const handleAnswerSubmit = async (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex];

  
    if (selectedAnswer === currentQuestion.correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizOver(true);
    }
  };

  if (!questions.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {!isQuizOver ? (
        <div>
          <h2>Question {currentQuestionIndex + 1}:</h2>
          <p>{questions[currentQuestionIndex].question}</p>

          {questions[currentQuestionIndex].answers.map((answer, index) => (
            <button key={index} onClick={() => handleAnswerSubmit(answer)}>
              {answer}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <h2>Quiz Over! Your score: {score}/{questions.length}</h2>
        </div>
      )}
    </div>
  );
};

export default QuizGame;
