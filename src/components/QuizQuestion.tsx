import React, { useEffect, useState } from "react";

interface QuizQuestionProps {
  dt: {
    question: String;
    correct_answer: string;
    incorrect_answers: string[];
  };
  setScore: React.Dispatch<React.SetStateAction<number>>;
  timeUp: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}
const QuizQuestion: React.FC<QuizQuestionProps> = ({
  dt,
  setScore,
  timeUp,
  setIsPlaying,
}) => {
  const { question, correct_answer, incorrect_answers } = dt;
  const [options, setOptions] = useState<string[]>([]);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    if (timeUp) {
      setIsSelected(true);
    }
  }, [timeUp]);

  useEffect(() => {
    setIsSelected(false);
    let rndArr = [...incorrect_answers];
    if (rndArr.length < 4) {
      const rnd = Math.round(Math.random() * 3);
      rndArr.splice(rnd, 0, correct_answer);
      setOptions(rndArr);
    }
  }, [correct_answer]);

  const handleClick = (e: React.MouseEvent<HTMLUListElement>) => {
    let currentTarget = e.target as HTMLElement;
    if (!isSelected && currentTarget.tagName === "LI") {
      setIsSelected(true);
      setIsPlaying(false);
      if (currentTarget.textContent === correct_answer) {
        setScore((prev) => prev + 1);
      } else {
        currentTarget.style.backgroundColor = "red";
        currentTarget.style.color = "white";
      }
    }
  };
  return (
    <>
      <p className="text-[20px] font-semibold mb-4">
        {question.replace(/&quot;/g, '"').replace(/&#039;/g, "'")}
      </p>
      <ul className="text-center" onClick={handleClick}>
        {options.map((qs) => (
          <li
            key={qs}
            className={`p-2 mb-4 rounded-lg cursor-pointer ${
              isSelected && qs === correct_answer
                ? "bg-green-600 text-white"
                : "bg-white"
            }`}
          >
            {qs.replace(/&quot;/g, '"').replace(/&#039;/g, "'")}
          </li>
        ))}
      </ul>
    </>
  );
};

export default QuizQuestion;
