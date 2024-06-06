import React from "react";
import "./App.css";
import QuizCard from "./components/QuizCard";

const App: React.FC = () => {
  return (
    <div className="font-catamaran bg-gradient-to-br from-rose-300 to-fuchsia-700 h-screen flex justify-center items-center">
      <QuizCard />
    </div>
  );
};

export default App;
