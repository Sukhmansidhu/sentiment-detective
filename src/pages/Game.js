import React, { useState, useEffect, useCallback } from "react";
import Sentiment from "sentiment";
import { useNavigate } from "react-router-dom";

import {
  GiMagnifyingGlass,
  GiOpenBook,
  GiPartyPopper,
} from "react-icons/gi";
import {
  FaUserSecret,
  FaSmileBeam,
  FaMeh,
  FaAngry,
  FaSurprise,
  FaRegSmile,
} from "react-icons/fa";
import { db } from "../firebase/firebase";
import { ref, update, get, child } from "firebase/database";

const floatingEmojis = [
  {
    emoji: "😊",
    style: { top: "10%", left: "5%", fontSize: "2.5rem", animationDelay: "0s" },
  },
  {
    emoji: "😢",
    style: { top: "20%", right: "10%", fontSize: "3rem", animationDelay: "2s" },
  },
  {
    emoji: "😐",
    style: {
      bottom: "15%",
      left: "15%",
      fontSize: "2rem",
      animationDelay: "1.5s",
    },
  },
  {
    emoji: "🎉",
    style: {
      bottom: "10%",
      right: "20%",
      fontSize: "3rem",
      animationDelay: "3s",
    },
  },
  {
    emoji: "🤖",
    style: {
      top: "40%",
      left: "50%",
      fontSize: "2.8rem",
      animationDelay: "2.5s",
    },
  },
  {
    emoji: "🔍",
    style: { top: "70%", right: "40%", fontSize: "2rem", animationDelay: "1s" },
  },
];

const Game = () => {
  const [input, setInput] = useState("");
  const [sentimentResult, setSentimentResult] = useState(null);

  const sentiment = new Sentiment();
  const navigate = useNavigate();


  const userEmail = localStorage.getItem("userEmail") || "guest@example.com";
  const safeEmail = userEmail.replace(/\./g, ",");

  const saveProgress = async (text, mood) => {
    try {
      await update(ref(db, `users/${safeEmail}`), { text, mood });
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  const loadProgress = useCallback(async () => {
    try {
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, `users/${safeEmail}`));
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (data.text) setInput(data.text);
        if (data.mood) {
          const mood = data.mood;
          let icon = null;
          let color = "";
          switch (mood) {
            case "Angry":
              icon = <FaAngry className="inline ml-2" />;
              color = "from-red-400 to-red-600";
              break;
            case "Happy":
              icon = <FaSmileBeam className="inline ml-2" />;
              color = "from-green-400 to-green-600";
              break;
            case "Sad":
              icon = <FaUserSecret className="inline ml-2" />;
              color = "from-blue-400 to-blue-600";
              break;
            case "Excited":
              icon = <GiPartyPopper className="inline ml-2" />;
              color = "from-pink-400 to-pink-600";
              break;
            case "Surprised":
              icon = <FaSurprise className="inline ml-2" />;
              color = "from-purple-400 to-purple-600";
              break;
            case "Calm":
              icon = <FaRegSmile className="inline ml-2" />;
              color = "from-blue-400 to-blue-600";
              break;
            case "Neutral":
              icon = <FaMeh className="inline ml-2" />;
              color = "from-yellow-400 to-yellow-600";
              break;
            default:
              icon = null;
              color = "";
          }
          setSentimentResult({ mood, icon, color });
        }
      }
    } catch (error) {
      console.error("Error loading progress:", error);
    }
  }, [safeEmail]);

  useEffect(() => {
    loadProgress();

  }, [loadProgress]);

  const analyzeSentiment = () => {
    if (input.trim() === "") return alert("Please type something to analyze!");

    const lowerInput = input.toLowerCase();

    if (/\bangry\b/.test(lowerInput)) {
      const result = {
        mood: "Angry",
        icon: <FaAngry className="inline ml-2" />,
        color: "from-red-400 to-red-600",
      };
      setSentimentResult(result);
      saveProgress(input, result.mood);
      return;
    }
    if (/\bhappy\b/.test(lowerInput)) {
      const result = {
        mood: "Happy",
        icon: <FaSmileBeam className="inline ml-2" />,
        color: "from-green-400 to-green-600",
      };
      setSentimentResult(result);
      saveProgress(input, result.mood);
      return;
    }
    if (/\bsad\b/.test(lowerInput)) {
      const result = {
        mood: "Sad",
        icon: <FaUserSecret className="inline ml-2" />,
        color: "from-blue-400 to-blue-600",
      };
      setSentimentResult(result);
      saveProgress(input, result.mood);
      return;
    }
    if (/\bexcited\b/.test(lowerInput)) {
      const result = {
        mood: "Excited",
        icon: <GiPartyPopper className="inline ml-2" />,
        color: "from-pink-400 to-pink-600",
      };
      setSentimentResult(result);
      saveProgress(input, result.mood);
      return;
    }
    if (/\bsurprised\b/.test(lowerInput)) {
      const result = {
        mood: "Surprised",
        icon: <FaSurprise className="inline ml-2" />,
        color: "from-purple-400 to-purple-600",
      };
      setSentimentResult(result);
      saveProgress(input, result.mood);
      return;
    }
    if (/\bcalm\b/.test(lowerInput)) {
      const result = {
        mood: "Calm",
        icon: <FaRegSmile className="inline ml-2" />,
        color: "from-blue-400 to-blue-600",
      };
      setSentimentResult(result);
      saveProgress(input, result.mood);
      return;
    }

    const resultAnalysis = sentiment.analyze(input);
    const score = resultAnalysis.score;

    let result = null;

    if (score >= 5) {
      result = {
        mood: "Excited",
        icon: <GiPartyPopper className="inline ml-2" />,
        color: "from-pink-400 to-pink-600",
      };
    } else if (score > 0) {
      result = {
        mood: "Happy",
        icon: <FaSmileBeam className="inline ml-2" />,
        color: "from-green-400 to-green-600",
      };
    } else if (score === 0) {
      result = {
        mood: "Calm",
        icon: <FaRegSmile className="inline ml-2" />,
        color: "from-blue-400 to-blue-600",
      };
    } else if (score > -3) {
      result = {
        mood: "Neutral",
        icon: <FaMeh className="inline ml-2" />,
        color: "from-yellow-400 to-yellow-600",
      };
    } else if (score > -6) {
      result = {
        mood: "Surprised",
        icon: <FaSurprise className="inline ml-2" />,
        color: "from-purple-400 to-purple-600",
      };
    } else {
      result = {
        mood: "Angry",
        icon: <FaAngry className="inline ml-2" />,
        color: "from-red-400 to-red-600",
      };
    }
    setSentimentResult(result);
    saveProgress(input, result.mood);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-300 via-pink-200 to-yellow-200 px-6 py-12 overflow-hidden">
      {floatingEmojis.map(({ emoji, style }, idx) => (
        <span
          key={idx}
          className="absolute animate-float opacity-70 select-none pointer-events-none"
          style={{
            ...style,
            animationDuration: "6s",
            animationIterationCount: "infinite",
            animationTimingFunction: "ease-in-out",
          }}
          aria-hidden="true"
        >
          {emoji}
        </span>
      ))}

      <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-purple-700 via-pink-600 to-yellow-500 bg-clip-text text-transparent drop-shadow-xl mb-10 text-center leading-tight">
        Welcome to Sentiment Adventure!{" "}
        <GiMagnifyingGlass className="inline ml-3 text-yellow-500" />{" "}
        <GiOpenBook className="inline ml-2 text-pink-500" />
      </h1>
      <p className="max-w-3xl text-center text-purple-900 text-lg sm:text-xl font-semibold mb-12 drop-shadow-md px-4">
        Type your message below and see if your words are happy, sad, or
        neutral! This is a fun way for kids aged 10–14 to explore feelings in
        text.
      </p>

      <textarea
        className="w-full max-w-3xl p-6 rounded-3xl border-2 border-purple-400 bg-white bg-opacity-80 shadow-xl resize-none text-lg font-medium placeholder-purple-400 focus:outline-none focus:ring-4 focus:ring-pink-400 focus:border-pink-500 hover:shadow-2xl transition duration-300"
        rows={6}
        placeholder="Type a message here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        spellCheck={false}
      />

      <button
        className="mt-8 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700 text-white px-10 py-4 rounded-3xl shadow-2xl font-bold text-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-3xl focus:outline-none focus:ring-4 focus:ring-purple-400"
        onClick={analyzeSentiment}
        aria-label="Detect Sentiment"
      >
        Detect Sentiment 🔍
      </button>

      {sentimentResult && (
        <div
          className={`mt-10 max-w-xl w-full bg-white bg-opacity-30 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center transform transition-transform duration-500 hover:scale-105`}
          role="region"
          aria-live="polite"
        >
          <p
            className={`text-3xl font-extrabold mb-4 bg-gradient-to-r ${sentimentResult.color} bg-clip-text text-transparent flex justify-center items-center gap-2`}
          >
            Mood: {sentimentResult.mood} {sentimentResult.icon}
          </p>
          <p className="text-lg text-purple-900 font-semibold select-text px-4">
            {sentimentResult.mood === "Happy" &&
              "Yay! Your words are joyful and uplifting! 🎉 Keep shining bright and spreading happiness wherever you go. Remember, a positive attitude can light up the world around you. Keep up the great vibes and enjoy every moment! 🌟😊"}
            {sentimentResult.mood === "Sad" &&
              "Oh no! It seems like your words show some sadness. 💔 It's okay to feel down sometimes—remember, every cloud has a silver lining. You're stronger than you think, and brighter days are ahead. Keep your head up and know that you are not alone. 🌈✨"}
            {sentimentResult.mood === "Neutral" &&
              "Hmm, your message seems pretty balanced. 🤖 Sometimes, it's good to have a calm and steady mood. Try to explore your feelings a bit more and see what stories your words tell. Keep experimenting and have fun discovering your feelings! 🎲🧩"}
            {sentimentResult.mood === "Excited" &&
              "Woohoo! Your words are bursting with excitement! 🎉 Let that energy fuel your adventures and inspire others around you. Keep dreaming big and enjoying every thrilling moment! 🚀✨"}
            {sentimentResult.mood === "Angry" &&
              "Uh oh! Your words show some anger. 😠 It's okay to feel upset sometimes—try to take a deep breath and think about what makes you feel better. Remember, expressing feelings calmly can help you find peace and solutions. 🌿💪"}
            {sentimentResult.mood === "Surprised" &&
              "Wow! Your words are full of surprise and wonder! 😲 Keep that curious spirit alive and keep exploring new ideas and stories. Life is full of amazing surprises waiting just for you! 🎇🔍"}
            {sentimentResult.mood === "Calm" &&
              "Ah, your message feels calm and peaceful. 🌸 Sometimes, a quiet and steady mood helps us think clearly and feel balanced. Keep enjoying these moments of calm and use them to recharge your spirit. 🧘‍♂️🌿"}
          </p>
        </div>
      )}

      {sentimentResult && (
        <button
          className="mt-8 px-10 py-4 bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-500 text-white rounded-3xl shadow-2xl font-bold text-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-3xl focus:outline-none focus:ring-4 focus:ring-pink-400"
          onClick={() => navigate("/quiz")}
          aria-label="Take the Quiz"
        >
          Take the Quiz 🎓
        </button>
      )}

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
          animation-name: float;
        }
      `}</style>
    </div>
  );
};

export default Game;
