import React from "react";
import { useNavigate } from "react-router-dom";

const Learn = () => {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-pink-200 via-purple-300 to-blue-200 px-6 overflow-hidden">
      <span className="absolute top-10 left-5 text-4xl animate-float opacity-30 select-none">
        😃
      </span>
      <span className="absolute top-20 right-10 text-5xl animate-floatSlow opacity-25 select-none">
        😢
      </span>
      <span className="absolute bottom-24 left-16 text-3xl animate-float opacity-20 select-none">
        😐
      </span>
      <span className="absolute bottom-10 right-20 text-6xl animate-floatSlow opacity-15 select-none">
        🧠
      </span>

      <div className="relative bg-white bg-opacity-30 backdrop-blur-lg rounded-3xl shadow-2xl max-w-4xl w-full p-10 transform transition-transform duration-700 hover:scale-[1.03] animate-floatUp">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-600 to-blue-700 bg-clip-text text-transparent drop-shadow-lg mb-8 text-center">
          What is Sentiment Analysis? 🧠
        </h1>
        <p className="text-xl text-black drop-shadow-md mb-6 max-w-3xl mx-auto text-center leading-relaxed font-semibold">
          Imagine reading a message and guessing if it's happy, sad, or just
          okay. That’s what sentiment analysis does! It’s like a mood detector
          that reads words and tells how the person might be feeling.
        </p>
        <p className="text-lg text-black drop-shadow-sm mb-10 max-w-3xl mx-auto text-center font-medium">
          In this mission, you'll help Detective Sunny figure out if someone is
          feeling 😃 happy, 😐 okay, or 😢 sad using their words!
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            className="px-8 py-4 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-400 text-black rounded-xl shadow-lg hover:scale-110 transform transition duration-300 font-bold drop-shadow-md"
            onClick={() => navigate("/game")}
          >
            Try it Yourself 🧪
          </button>
          <button
            className="px-8 py-4 bg-gradient-to-r from-purple-400 via-pink-300 to-red-400 text-black rounded-xl shadow-lg hover:scale-110 transform transition duration-300 font-boldbold drop-shadow-md"
            onClick={() => navigate("/quiz")}
          >
            Take the Quiz 🎓
          </button>
        </div>
      </div>
    </div>
  );
};

export default Learn;
