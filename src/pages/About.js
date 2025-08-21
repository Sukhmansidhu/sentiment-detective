import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-pink-200 via-blue-100 to-purple-200 text-white overflow-hidden">
      <div className="pointer-events-none absolute top-10 left-5 text-6xl opacity-20 animate-float">
        🕵️‍♂️
      </div>
      <div className="pointer-events-none absolute top-20 right-10 text-7xl opacity-20 animate-float animation-delay-2000">
        🧠
      </div>
      <div className="pointer-events-none absolute bottom-24 left-20 text-6xl opacity-20 animate-float animation-delay-4000">
        📚
      </div>
      <div className="pointer-events-none absolute bottom-10 right-24 text-7xl opacity-15 animate-float animation-delay-6000">
        🎮
      </div>

      <header className="w-full px-8 py-5 bg-gradient-to-r from-purple-700 to-pink-400 bg-opacity-90 backdrop-blur-md shadow-lg flex justify-between items-center z-10 relative">
        <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-200 to-pink-300 drop-shadow-lg select-none">
          🕵️ Sentiment Detective
        </h1>
        <button
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-pink-300 to-purple-400 text-lg text-blue-900 px-5 py-2 rounded-xl shadow-lg hover:scale-105 transform transition duration-300 ease-in-out drop-shadow-md font-semibold"
        >
          Home
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-8 py-14 z-10 relative max-w-5xl mx-auto w-full">
        <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-3xl shadow-xl p-10 max-w-4xl w-full">
          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-blue-800 via-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-xl mb-8 select-none">
            About This Adventure
          </h2>
          <p className="text-lg text-black drop-shadow-md mb-5 leading-relaxed">
            🧠 This website is designed to introduce the concept of{" "}
            <strong>Sentiment Analysis</strong> in a fun and interactive way.
            Children can learn how machines can understand feelings just by
            analyzing words and expressions!
          </p>
          <p className="text-lg text-black drop-shadow-md mb-5 leading-relaxed">
            👧👦 <strong>Recommended for ages 9 to 13</strong>, this adventure
            is perfect for curious minds who love stories, games, and solving
            mysteries.
          </p>
          <p className="text-lg text-black drop-shadow-md mb-8 leading-relaxed">
            🚀 After completing the activities and quiz, kids will start to
            understand how AI can “feel” — and they’ll walk away more confident,
            analytical, and even more expressive!
          </p>
          <p className="text-lg text-black drop-shadow-md mb-8 leading-relaxed">
            📧 Your email is automatically saved and used to track your quiz progress. Please note that only one Gmail account is allowed per session. If you change your email (for example, by using a different Gmail), your previous progress may not appear.
          </p>

          <button
            onClick={() => navigate("/learn")}
            className="mt-6 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:scale-110 transform transition duration-300 ease-in-out drop-shadow-lg"
          >
            Explore Learning Page 📚
          </button>
        </div>
      </main>

      <section className="max-w-3xl mx-auto mb-12 px-6 py-8 bg-white bg-opacity-25 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-500 transform hover:-translate-y-1 cursor-default select-none">
        <h3 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-xl mb-6">
          🛠 How It Works
        </h3>
        <p className="text-lg text-black drop-shadow-md mb-3 leading-relaxed">
          🕵️‍♂️ Our adventure takes you through messages, stories, and games. Each
          activity helps you detect emotions like a real detective!
        </p>
        <p className="text-lg text-black drop-shadow-md leading-relaxed">
          📜 Using simple examples and quizzes, you'll explore how AI can read
          words and predict if someone is happy, sad, excited, or angry.
        </p>
      </section>

      <section className="max-w-3xl mx-auto mb-12 px-6 py-8 bg-white bg-opacity-25 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-500 transform hover:-translate-y-1 cursor-default select-none">
        <h3 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-xl mb-6">
          ✨ Features
        </h3>
        <ul className="list-disc list-inside text-left text-lg text-black drop-shadow-md space-y-3">
          <li>🎮 Interactive quizzes and mini-games</li>
          <li>🧩 Step-by-step AI mystery solving</li>
          <li>📚 Fun storytelling to learn emotions</li>
          <li>📊 Progress tracking to see your growth</li>
          <li>🌈 Colorful, kid-friendly interface</li>
        </ul>
      </section>

      <section className="max-w-3xl mx-auto mb-12 px-6 py-8 bg-white bg-opacity-25 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-500 transform hover:-translate-y-1 cursor-default select-none">
        <h3 className="text-4xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-xl mb-6">
          💡 Why This Adventure?
        </h3>
        <p className="text-lg text-black drop-shadow-md mb-3 leading-relaxed">
          💡 Learning about AI and emotions early helps kids develop analytical
          thinking, empathy, and curiosity about technology.
        </p>
        <p className="text-lg text-black drop-shadow-md leading-relaxed">
          🚀 By the end of this adventure, kids will feel proud of understanding
          something as complex as machine emotions, all while having tons of
          fun!
        </p>
      </section>

      <section className="max-w-3xl mx-auto mb-16 px-6 py-8 bg-white bg-opacity-25 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-500 transform hover:-translate-y-1 cursor-default select-none">
        <h3 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-xl mb-6">
          🌟 What Will You Gain?
        </h3>
        <ul className="list-disc list-inside text-left text-lg text-black drop-shadow-md space-y-3">
          <li>🎯 Learn how technology can understand human emotions</li>
          <li>🧠 Improve your reading and comprehension skills</li>
          <li>🕵️ Become a junior detective by analyzing messages</li>
          <li>🎉 Have fun with games, quizzes, and storytelling!</li>
          <li>🤖 Boost your confidence in understanding how AI works</li>
        </ul>
      </section>

      <footer className="w-full text-center py-6 bg-gradient-to-r from-purple-500 via-pink-700 to-indigo-500 text-white text-lg font-bold shadow-inner select-none z-10 relative">
        Made with 💜 for young learners | &copy; 2025 Sentiment Detective
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-6000 {
          animation-delay: 6s;
        }
      `}</style>
    </div>
  );
};

export default About;
