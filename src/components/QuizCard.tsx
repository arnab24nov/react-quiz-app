import React, { useEffect, useState } from "react";
import QuizQuestion from "./QuizQuestion";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const QuizCard: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizCount, setQuizCount] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [toggle, setToggle] = useState<boolean>(false);
  const [timeUp, setTimeUp] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [key, setKey] = useState<number>(0);

  useEffect(() => {
    setScore(0);
    setQuizCount(0);
    getQuestions();
    setKey((key) => key + 1);
    setIsPlaying(true);
  }, [toggle]);

  const getQuestions = async () => {
    let dt = await fetch(
      "https://opentdb.com/api.php?amount=10&category=21&type=multiple"
    );
    let jsonDt = await dt.json();
    setQuestions(jsonDt.results);
  };

  const handleNextQuestion = () => {
    setQuizCount(quizCount + 1);
    setKey((key) => key + 1);
    setTimeUp(false);
    setIsPlaying(true);
  };
  return (
    <div className="h-[500px] w-[500px] bg-white bg-opacity-20 shadow-custom-black rounded-se-[50px] rounded-ss-3xl rounded-es-[50px] rounded-ee-3xl px-6 py-4">
      {questions.length > 0 && (
        <div className="flex flex-col justify-center h-full">
          <div className="flex justify-between items-center text-[20px] font-semibold mb-4 pb-2 px-2 border-b border-gray-600">
            <div className="">Score: {score}</div>
            <CountdownCircleTimer
              key={key}
              isPlaying={isPlaying}
              duration={30}
              size={50}
              strokeWidth={5}
              colors={["#0cc521", "#F7B801", "#A30000", "#f81616"]}
              colorsTime={[15, 10, 5, 0]}
              onComplete={() => {
                setTimeUp(true);
              }}
            >
              {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
          </div>
          <div className="flex-grow">
            <QuizQuestion
              dt={questions[quizCount]}
              setScore={setScore}
              timeUp={timeUp}
              setIsPlaying={setIsPlaying}
            />
          </div>
          <div className="mt-6 pt-6 border-t border-gray-600 flex justify-between items-center">
            <p className="text-[20px]">
              <span className="inline-block rounded-full bg-slate-300 w-8 h-8 text-center">
                {quizCount + 1}
              </span>{" "}
              out of{" "}
              <span className="inline-block rounded-full bg-slate-300 w-8 h-8 text-center">
                10
              </span>{" "}
              questions
            </p>
            {quizCount < 9 ? (
              <button
                className="px-3 py-1 bg-fuchsia-800 text-white rounded-lg"
                onClick={handleNextQuestion}
              >
                Next Question
              </button>
            ) : (
              <button
                className="px-3 py-1 bg-fuchsia-800 text-white rounded-lg"
                onClick={() => setToggle(!toggle)}
              >
                Start Again
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizCard;
