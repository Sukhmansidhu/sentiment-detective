import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, update } from "firebase/database";
import { db } from "../firebase/firebase";

const Home = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleStartNow = () => {
    if (email) {
      localStorage.setItem("userEmail", email);
      const safeEmail = email.replace(/\./g, ",");
      const userRef = ref(db, `users/${safeEmail}`);
      update(userRef, { email }).catch((error) =>
        console.error("Error updating email in Firebase:", error)
      );
    }
    navigate("/quiz");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-300 relative overflow-hidden flex flex-col items-center animate-fade-in">
      <div className="absolute top-10 left-10 text-yellow-400 text-5xl animate-float-slow">
        🌞
      </div>
      <div className="absolute top-20 right-20 text-white text-6xl opacity-70 animate-float-reverse">
        ☁️
      </div>
      <div className="absolute bottom-20 left-1/3 text-pink-400 text-5xl opacity-80 animate-float-slow delay-500">
        😊
      </div>
      <div className="absolute bottom-32 right-1/4 text-purple-400 text-5xl opacity-80 animate-float-reverse delay-700">
        😢
      </div>
      <div className="absolute top-1/2 left-1/4 text-yellow-400 text-5xl opacity-70 animate-float-slow delay-300">
        😐
      </div>

      <div className="w-full flex justify-center z-10">
        <div className="w-full max-w-5xl">
          <header className="flex justify-between items-center py-6 px-6">
            <h1 className="text-3xl font-extrabold text-purple-900 drop-shadow-lg select-none">
              🕵️‍♂️ Sentiment Detective
            </h1>
            <button
              onClick={() => navigate("/about")}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2 rounded-full shadow-lg hover:scale-110 hover:from-pink-600 hover:to-purple-600 transition-transform duration-300"
            >
              Learn More
            </button>
          </header>

          <div
            className="h-2 w-full rounded-b-xl shadow-md"
            style={{
              background:
                "linear-gradient(90deg, #a78bfa 0%, #f472b6 50%, #c084fc 100%)",
              boxShadow:
                "0 4px 12px 0 rgba(168,139,250,0.15), 0 1.5px 0 #c084fc inset",
            }}
          ></div>
        </div>
      </div>

      <section className="flex flex-col mt-16 py-16 justify-center items-center text-center max-w-4xl px-6 flex-grow z-10">
        <h2 className="text-6xl font-extrabold text-blue-900 mb-8 animate-bounce-slow select-none drop-shadow-lg bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
          Meet Detective Sunny! 🔍
        </h2>
        <p className="text-xl text-gray-800 mb-10 max-w-xl leading-relaxed drop-shadow-md">
          Sunny is not just any detective... he's on a top-secret mission to
          uncover hidden emotions in messages! 💬
          <br />
          With your help, we’ll decode whether someone feels happy 😊, sad 😢,
          or just okay 😐 — using the magic of Sentiment Analysis!
        </p>
        <button
          className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white text-xl rounded-xl shadow-xl hover:scale-110 hover:from-purple-700 hover:to-blue-600 transition-transform duration-300 transform"
          onClick={() => navigate("/learn")}
        >
          Start the Adventure 🚀
        </button>
      </section>

      <section className="mt-20 max-w-6xl grid grid-cols-1 sm:grid-cols-3 gap-8 px-6 z-10">
        {[
          {
            title: "📚 Learn",
            description:
              "Understand how machines read feelings from words in fun and simple ways!",
            gradient: "from-purple-400 to-pink-400",
            textColor: "text-purple-900",
          },
          {
            title: "🎮 Try Game",
            description:
              "Type something and see if Sunny can guess your mood correctly!",
            gradient: "from-green-400 to-teal-400",
            textColor: "text-green-900",
          },
          {
            title: "🧠 Take Quiz",
            description:
              "Help Sunny sort out feelings by dragging and dropping messages into boxes.",
            gradient: "from-blue-400 to-indigo-400",
            textColor: "text-blue-900",
          },
        ].map(({ title, description, gradient, textColor }, idx) => (
          <div
            key={idx}
            className={`rounded-2xl p-8 shadow-2xl bg-gradient-to-br ${gradient} transform transition-transform duration-500 hover:scale-105 hover:shadow-3xl relative animate-float-slow`}
          >
            <h3
              className={`text-3xl font-bold mb-3 ${textColor} select-none drop-shadow-md`}
            >
              {title}
            </h3>
            <p className="text-white text-lg">{description}</p>
          </div>
        ))}
      </section>

      <section className="mt-24 max-w-4xl text-center px-8 rounded-3xl shadow-2xl bg-gradient-to-tr from-purple-300 via-pink-300 to-yellow-300 p-10 z-10 transform transition-transform hover:scale-[1.03] animate-float-slow">
        <h3 className="text-4xl font-extrabold text-purple-900 mb-6 select-none drop-shadow-lg animate-fade-in-up">
          🤔 Why Learn Sentiment Analysis?
        </h3>
        <ul className="text-purple-900 text-xl space-y-3 list-disc list-inside max-w-xl mx-auto">
          <li>💬 Helps you understand feelings in messages</li>
          <li>🤖 Learn how smart robots (AI) think</li>
          <li>🕵️ Be a junior detective like Sunny!</li>
          <li>🎉 It's fun, simple, and exciting to learn!</li>
        </ul>
      </section>

      <section className="mt-20 max-w-4xl text-center px-6 z-10">
        <h3 className="text-4xl font-extrabold text-blue-900 mb-8 select-none drop-shadow-md animate-fade-in-up">
          What Kids Are Saying 🗣️
        </h3>
        <div className="text-xl text-blue-900 bg-gradient-to-r from-blue-100 to-blue-200 rounded-3xl p-6 mb-6 shadow-lg animate-float-slow">
          “This website made learning feel like playing!” – Maya, age 11
        </div>
        <div className="text-xl text-blue-900 bg-gradient-to-r from-blue-100 to-blue-200 rounded-3xl p-6 shadow-lg animate-float-slow delay-300">
          “I loved helping Detective Sunny solve emotion mysteries!” – Aarav,
          age 10
        </div>
      </section>

      <section className="mt-24 mb-16 text-center max-w-3xl px-8 rounded-3xl shadow-inner bg-gradient-to-r from-yellow-200 via-green-300 to-green-300 p-10 z-10 transform transition-transform hover:scale-[1.05] animate-float-slow">
        <h3 className="text-4xl font-bold text-green-900 mb-6 select-none drop-shadow-md animate-fade-in-up">
          Ready to Join Sunny’s Squad? 🌟
        </h3>
        <p className="text-green-900 mb-8 text-2xl font-semibold">
          Click below and let your adventure begin!
        </p>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-6 px-4 py-3 rounded-lg border border-green-700 text-green-900 text-xl w-full max-w-md mx-auto"
        />
        <button
          onClick={handleStartNow}
          className="px-8 py-4 bg-gradient-to-r from-green-700 to-green-700 text-white rounded-2xl shadow-xl hover:scale-110 hover:from-green-800 hover:to-green-600 transition-transform duration-300 transform font-bold"
        >
          Start Now 🎯
        </button>
      </section>

      <div className="absolute bottom-4 left-4 text-yellow-400 text-4xl animate-float-slow select-none pointer-events-none">
        🌞
      </div>
      <div className="absolute top-4 right-4 text-blue-300 text-4xl animate-spin-slow select-none pointer-events-none">
        🌈
      </div>

      <footer className="w-full bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 shadow-lg py-6 mt-12 flex justify-center items-center text-center px-4">
        <p className="text-white text-lg lg:text-xl select-none">
          &copy; {new Date().getFullYear()} Sentiment Detective. Made with{" "}
          <span role="img" aria-label="love">
            ❤️
          </span>{" "}
          for kids to learn about emotions.
        </p>
      </footer>
    </div>
  );
};

export default Home;
