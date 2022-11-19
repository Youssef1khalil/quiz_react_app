import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import "./App.css";
import Quiz from "./Quiz";

function App() {
  const [questions, setQuestions] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [repeat, setRepeat] = useState(0);
  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);
  useEffect(() => {
    const linkAPi =
      "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple";
    fetch(linkAPi)
      .then((resolve) => resolve.json())
      .then((data) => {
        const questionData = data.results.map((element) => {
          return {
            id: nanoid(),
            question: element.question,
            answers: shuffleArray([
              ...element.incorrect_answers,
              element.correct_answer,
            ]),
            correctAnswer: element.correct_answer,
            checked: false,
            selected: null,
          };
        });
        setQuestions(questionData);
      });
  }, [repeat]);
  function handleClicked(id, answer) {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        return question.id === id
          ? { ...question, selected: answer }
          : question;
      })
    );
  }

  function handleCheck() {
    const check = questions.every((e) => !(e.selected === null));
    if (check) {
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) => {
          return { ...question, checked: true };
        })
      );
      let correct = 0;
      questions.forEach((question) => {
        if (question.correctAnswer === question.selected) {
          correct++;
        }
        setScore(correct);
      });
      setChecked(true);
    } else {
      alert("You Must Answer All Questions Before getting the score");
    }
  }
  function handleNewQuiz() {
    setRepeat((repeat) => repeat + 1);
    setChecked(false);
  }
  const createQuestion = questions
    ? questions.map((element) => {
        return (
          <Quiz
            question={element}
            key={element.id}
            id={element.id}
            click={handleClicked}
          />
        );
      })
    : [];
  return (
    <div className="quiz-description">
      {showQuiz ? (
        <>
          {createQuestion}
          <div className="check">
            {checked && (
              <span className="score">
                You Scored {score}/{questions.length}
              </span>
            )}
            <button
              className="check-button"
              onClick={checked ? handleNewQuiz : handleCheck}
            >
              {checked ? "New Quiz" : "Check Answers"}
            </button>
          </div>
        </>
      ) : (
        <div className="before-quiz">
          <h1>Quizzcal</h1>
          <p>Quiz description</p>
          <button className="start-quiz" onClick={() => setShowQuiz(true)}>
            Start Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
