import { nanoid } from "nanoid";
import "./Quiz.css";

const Quiz = (props) => {
  let theAnswers = props.question.answers;
  function handleClick(answer) {
    if (props.question.checked) {
      return;
    }
    props.click(props.id, answer);
  }
  const answers = theAnswers.map((answer) => {
    let id = null;
    if (props.question.checked) {
      if (answer === props.question.correctAnswer) {
        id = "correct";
      } else if (answer === props.question.selected) {
        id = "incorrect";
      } else {
        id = "not-selected";
      }
    }
    return (
      <button
        id={id}
        key={nanoid()}
        className={
          props.question.selected === answer
            ? "answer-button choosed"
            : "answer-button"
        }
        dangerouslySetInnerHTML={{ __html: answer }}
        onClick={() => handleClick(answer)}
      />
    );
  });
  return (
    <div className="quiz-page">
      <div
        className="title"
        dangerouslySetInnerHTML={{ __html: props.question.question }}
      />
      <div className="answers">{answers}</div>
    </div>
  );
};

export default Quiz;
