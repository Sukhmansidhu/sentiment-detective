import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import successSound from "../assets/success.mp3";
import { jsPDF } from "jspdf";
import celebrationUnique from "../assets/celebrationUnique.mp3";
import { db } from "../firebase/firebase";
import { ref, get, child, update } from "firebase/database";

const levels = [
  {
    name: "Easy",
    emojis: ["😊", "😐", "😢"],
    hint: "Tip: 😊 is happy, 😐 is neutral, 😢 is sad.",
    sentences: [
      { id: "1", text: "I love ice cream!", sentiment: "happy" },
      { id: "2", text: "It's raining again.", sentiment: "sad" },
      { id: "3", text: "I finished my homework!", sentiment: "happy" },
      { id: "4", text: "I'm feeling okay.", sentiment: "neutral" },
      { id: "5", text: "My balloon popped.", sentiment: "sad" },
      { id: "6", text: "I saw a rainbow!", sentiment: "happy" },
      { id: "7", text: "Nothing much happened today.", sentiment: "neutral" },
      { id: "8", text: "I lost my pencil case.", sentiment: "sad" },
      { id: "9", text: "Yay! No school tomorrow!", sentiment: "happy" },
      { id: "10", text: "I’m feeling normal today.", sentiment: "neutral" },
    ],
  },
  {
    name: "Medium",
    emojis: ["😂", "😮", "😔", "😑"],
    hint: "Detective Sunny says: Look at the emoji carefully before placing!",
    sentences: [
      { id: "11", text: "I got a new phone!", sentiment: "happy" },
      { id: "12", text: "My favorite show ended.", sentiment: "sad" },
      { id: "13", text: "The soup was just okay.", sentiment: "neutral" },
      { id: "14", text: "I slipped and everyone laughed.", sentiment: "sad" },
      { id: "15", text: "We’re going on a vacation!", sentiment: "happy" },
      { id: "16", text: "I saw a shooting star!", sentiment: "happy" },
      { id: "17", text: "I missed my bus.", sentiment: "sad" },
      { id: "18", text: "My friend ignored me.", sentiment: "sad" },
      { id: "19", text: "I ate something new.", sentiment: "neutral" },
      { id: "20", text: "I read a fun comic.", sentiment: "happy" },
      { id: "21", text: "Just sat in silence.", sentiment: "neutral" },
    ],
  },
  {
    name: "Hard",
    emojis: ["🥳", "🤯", "😢", "😡", "😐", "😨", "😤"],
    hint: "Tip: Some sentences are tricky! Think carefully.",
    sentences: [
      { id: "22", text: "My pet ran away.", sentiment: "sad" },
      { id: "23", text: "I won the science fair!", sentiment: "happy" },
      {
        id: "24",
        text: "My internet crashed during a game.",
        sentiment: "angry",
      },
      { id: "25", text: "My sibling broke my toy.", sentiment: "angry" },
      { id: "26", text: "I’m worried about the exam.", sentiment: "scared" },
      { id: "27", text: "I completed a hard puzzle!", sentiment: "happy" },
      { id: "28", text: "Nobody noticed my birthday.", sentiment: "sad" },
      { id: "29", text: "I got stuck in the elevator.", sentiment: "scared" },
      { id: "30", text: "The teacher praised me.", sentiment: "happy" },
      { id: "31", text: "I dropped my lunch tray.", sentiment: "sad" },
      {
        id: "32",
        text: "It was just another boring day.",
        sentiment: "neutral",
      },
      {
        id: "33",
        text: "My drawing was displayed on the board!",
        sentiment: "happy",
      },
    ],
  },

  {
    name: "Expert",
    emojis: ["😃", "😔", "😡", "😱", "😶"],
    hint: "Detective Sunny: Watch out for sentences with hidden feelings!",
    sentences: [
      {
        id: "34",
        text: "I finally learned to ride my bike!",
        sentiment: "happy",
      },
      { id: "35", text: "My friend forgot my birthday.", sentiment: "sad" },
      { id: "36", text: "I spilled water on my test paper.", sentiment: "sad" },
      {
        id: "37",
        text: "I was so angry when my game crashed!",
        sentiment: "angry",
      },
      { id: "38", text: "I got a surprise party!", sentiment: "happy" },
      {
        id: "39",
        text: "I can't believe how loud the thunder was!",
        sentiment: "scared",
      },
      {
        id: "40",
        text: "Nothing really happened today.",
        sentiment: "neutral",
      },
      { id: "41", text: "I aced the spelling bee!", sentiment: "happy" },
      { id: "42", text: "My favorite toy broke.", sentiment: "sad" },
      {
        id: "43",
        text: "I was too shocked to say anything.",
        sentiment: "scared",
      },
    ],
  },

  {
    name: "Master",
    emojis: ["😄", "😭", "😤", "😲", "😑", "😨"],
    hint: "Detective Sunny: Feelings can sometimes mix! Choose the closest match.",
    sentences: [
      {
        id: "44",
        text: "I was so nervous before my performance.",
        sentiment: "scared",
      },
      { id: "45", text: "My best friend moved away.", sentiment: "sad" },
      { id: "46", text: "I got a gold medal!", sentiment: "happy" },
      {
        id: "47",
        text: "The teacher gave me extra homework.",
        sentiment: "angry",
      },
      {
        id: "48",
        text: "I was amazed at the magician's trick.",
        sentiment: "surprised",
      },
      {
        id: "49",
        text: "I felt nothing during the movie.",
        sentiment: "neutral",
      },
      {
        id: "50",
        text: "I couldn't stop crying at the sad ending.",
        sentiment: "sad",
      },
      {
        id: "51",
        text: "I was frustrated with my puzzle.",
        sentiment: "angry",
      },
      {
        id: "52",
        text: "I was so happy to see my cousin!",
        sentiment: "happy",
      },
      { id: "53", text: "The dark room made me uneasy.", sentiment: "scared" },
    ],
  },

  {
    name: "Legendary",
    emojis: ["🤩", "😫", "😐", "😡", "😱", "😂"],
    hint: "Detective Sunny: Sometimes feelings are not obvious. Trust your instincts!",
    sentences: [
      {
        id: "54",
        text: "I couldn't stop laughing at the joke.",
        sentiment: "funny",
      },
      {
        id: "55",
        text: "I felt exhausted after the marathon.",
        sentiment: "sad",
      },
      { id: "56", text: "I was amazed by the fireworks.", sentiment: "happy" },
      {
        id: "57",
        text: "I felt nothing special on my walk.",
        sentiment: "neutral",
      },
      {
        id: "58",
        text: "My brother ate my dessert. I was furious!",
        sentiment: "angry",
      },
      {
        id: "59",
        text: "The haunted house gave me chills.",
        sentiment: "scared",
      },
      { id: "60", text: "I got a standing ovation!", sentiment: "happy" },
      { id: "61", text: "I was too tired to join the game.", sentiment: "sad" },
      { id: "62", text: "The prank was so funny!", sentiment: "funny" },
      {
        id: "63",
        text: "I was frozen with fear during the thunderstorm.",
        sentiment: "scared",
      },
    ],
  },
];

const sentimentEmojis = {
  happy: "😊",
  sad: "😢",
  neutral: "😐",
  angry: "😡",
  scared: "😨",
  excited: "🥳",
  confused: "🤯",
  frustrated: "😤",
  surprised: "😮",
  funny: "😂",
};

const zoneColors = {
  happy: "bg-blue-200",
  sad: "bg-red-200",
  neutral: "bg-yellow-200",
  angry: "bg-green-200",
  scared: "bg-gray-300",
  excited: "bg-purple-200",
  confused: "bg-pink-200",
  frustrated: "bg-orange-200",
  surprised: "bg-teal-200",
  funny: "bg-lime-200"
};

const Quiz = () => {
  // All hooks are called at the top level, not inside conditionals or loops.
  // Helper for initializing zones
  const initializeZones = (levelIndex) => {
    if (!levels[levelIndex]) return {};
    const sentiments = [
      ...new Set(levels[levelIndex].sentences.map((s) => s.sentiment)),
    ];
    return sentiments.reduce((acc, s) => {
      acc[s] = [];
      return acc;
    }, {});
  };

  // State hooks
  const [currentLevel, setCurrentLevel] = useState(0);
  const [sentences, setSentences] = useState(levels[0]?.sentences || []);
  const [zones, setZones] = useState(initializeZones(0));
  const [draggedItem, setDraggedItem] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [overallScore, setOverallScore] = useState(0);
  const [narrative, setNarrative] = useState("");
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userSchool, setUserSchool] = useState("");
  const [userClass, setUserClass] = useState("");
  const [userGender, setUserGender] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showLevelNarrative, setShowLevelNarrative] = useState(false);
  const [showCharModal, setShowCharModal] = useState(false);
  const [showHelpTooltip, setShowHelpTooltip] = useState(false);
  const helpTimeoutRef = useRef(null);
  const [pendingNextLevel, setPendingNextLevel] = useState(null);
  const [showFinalCelebration, setShowFinalCelebration] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);
  const celebrationAudioRef = useRef(null);
  const audioRef = useRef(null);
  const [userEmail] = useState(() => localStorage.getItem("userEmail") || "");
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);
  const [leaderboardError, setLeaderboardError] = useState(null);

  const currentSentiments = levels[currentLevel]
    ? [...new Set(levels[currentLevel].sentences.map((s) => s.sentiment))]
    : [];
  const safeEmail = userEmail.replace(/\./g, ",");
  const score = Object.entries(zones).reduce((total, [zone, items]) => {
    return total + items.filter((item) => item.sentiment === zone).length;
  }, 0);
  const total = levels[currentLevel]?.sentences?.length || 0;

  const fetchLeaderboard = async () => {
    setLoadingLeaderboard(true);
    setLeaderboardError(null);
    try {
      const usersSnapshot = await get(child(ref(db), "users"));
      if (usersSnapshot.exists()) {
        const usersData = usersSnapshot.val();
        const usersList = Object.values(usersData)
          .map((user) => ({
            userName: user.userName || "Anonymous",
            overallScore: typeof user.overallScore === "number" ? user.overallScore : 0,
            userSchool: user.userSchool || "",
            userClass: user.userClass || "",
            userGender: user.userGender || "",
          }))
          .sort((a, b) => b.overallScore - a.overallScore);
        setLeaderboard(usersList);
      } else {
        setLeaderboard([]);
      }
    } catch (e) {
      setLeaderboardError("Failed to fetch leaderboard.");
      setLeaderboard([]);
    }
    setLoadingLeaderboard(false);
  };

  const saveProgress = async () => {
    try {
      await update(
        ref(db, `users/${safeEmail}`),
        {
          currentLevel: currentLevel + 1,
          zones,
          sentences,
          overallScore,
        }
      );
    } catch (e) {
      console.error("Error saving progress:", e);
    }
  };

  const loadProgress = async () => {
    try {
      const snapshot = await get(child(ref(db), `users/${safeEmail}`));
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (typeof data.currentLevel === "number") setCurrentLevel(data.currentLevel);
        if (data.zones) setZones(data.zones);
        if (Array.isArray(data.sentences)) setSentences(data.sentences);
        if (typeof data.overallScore === "number") setOverallScore(data.overallScore);
      }
    } catch (e) {
      console.error("Error loading progress:", e);
    }
  };

  useEffect(() => {
    loadProgress();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (showResult) {
      if (!levels[currentLevel]) return;
      const correct = Object.entries(zones).reduce((total, [zone, items]) => {
        return total + items.filter((item) => item.sentiment === zone).length;
      }, 0);
      if (correct === levels[currentLevel].sentences.length) {
        audioRef.current?.play();
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        if (currentLevel === levels.length - 1) {
          setTimeout(() => {
            setShowFinalCelebration(true);
            setShowResult(false);
          }, 4000);
        }
      }
    }
  }, [showResult, zones, currentLevel]);

  useEffect(() => {
    if (
      currentLevel > 0 &&
      !quizCompleted &&
      levels[currentLevel] &&
      levels[currentLevel - 1]
    ) {
      setShowLevelNarrative(true);
      setNarrative(
        `🎉 Detective Sunny solved the ${levels[currentLevel - 1].name} cases! Get ready for ${levels[currentLevel].name} cases!`
      );
      const timeout = setTimeout(() => {
        setShowLevelNarrative(false);
        setNarrative("");
      }, 2500);
      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [currentLevel, quizCompleted]);

  useEffect(() => {
    if (showFinalCelebration) {
      confetti({
        particleCount: 300,
        spread: 130,
        origin: { y: 0.5 },
      });
      celebrationAudioRef.current?.play();
    }
  }, [showFinalCelebration]);

  useEffect(() => {
    if (showLeaderboard) {
      fetchLeaderboard();
    }
  }, [showLeaderboard]);

  const handleDragStart = (item) => setDraggedItem(item);
  const handleDrop = (zone) => {
    if (!draggedItem) return;
    setZones((prev) => ({ ...prev, [zone]: [...prev[zone], draggedItem] }));
    setSentences((prev) => prev.filter((s) => s.id !== draggedItem.id));
    setDraggedItem(null);
  };
  const allowDrop = (e) => e.preventDefault();
  const getFeedback = (item, zone) =>
    item.sentiment === zone ? "✅ Correct!" : "❌ Try Again!";

  const handleFinish = async () => {
    if (!levels[currentLevel]) return;
    const score = Object.entries(zones).reduce((total, [zone, items]) => {
      return total + items.filter((item) => item.sentiment === zone).length;
    }, 0);
    setOverallScore((prev) => prev + score);
    setShowResult(true);

    await update(ref(db, `users/${safeEmail}`), {
      userName,
      userAge,
      userSchool,
      userClass,
      userGender,
    });
    await saveProgress();
  };

  const resetQuiz = async () => {
    if (!levels[currentLevel]) return;
    setSentences(levels[currentLevel].sentences);
    setZones(initializeZones(currentLevel));
    setDraggedItem(null);
    setShowResult(false);
    await saveProgress();
  };


  const generatePDF = () => {
    const doc = new jsPDF();
    let y = 10;
    doc.setFontSize(18);
    doc.text("Sentiment Detective Quiz Results", 105, y, null, null, "center");
    y += 10;
    doc.setFontSize(12);
    doc.text(`Name: ${userName}`, 10, y);
    y += 7;
    doc.text(`Age: ${userAge}`, 10, y);
    y += 7;
    doc.text(`School: ${userSchool}`, 10, y);
    y += 7;
    doc.text(`Class: ${userClass}`, 10, y);
    y += 7;
    doc.text(`Gender: ${userGender}`, 10, y);
    y += 10;
    doc.setFontSize(14);
    doc.text(
      `Total Score: ${overallScore} out of ${levels.flatMap((l) => l.sentences).length}`,
      10,
      y
    );
    y += 10;
    doc.setFontSize(12);
    levels.forEach((level) => {
      if (y > 270) {
        doc.addPage();
        y = 10;
      }
      doc.text(`Level: ${level.name}`, 10, y);
      y += 7;
      level.sentences.forEach((sentence) => {
        if (y > 280) {
          doc.addPage();
          y = 10;
        }
        doc.text(`- ${sentence.text} (${sentence.sentiment})`, 15, y);
        y += 6;
      });
      y += 5;
    });
    doc.save("Sentiment_Detective_Quiz_Results.pdf");
  };

  if (showFinalCelebration) {
    return (
      <div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #f3e8ff 0%, #fef9c3 100%)",
          minHeight: "100vh",
        }}
      >
        <audio ref={celebrationAudioRef} src={celebrationUnique} />
        <div className="flex flex-col items-center justify-center">
          <h1
            className="text-5xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-400 to-yellow-400 drop-shadow-xl animate-fadein-smooth"
            style={{ animation: "fadein-smooth 1.1s" }}
          >
            🎉 Congratulations! 🎉
          </h1>
          <p
            className="text-2xl md:text-3xl font-semibold mb-8 text-purple-700 shadow-lg animate-fadein-smooth"
            style={{ animation: "fadein-smooth 1.7s" }}
          >
            You completed{" "}
            <span className="font-bold text-pink-500">all levels</span> of
            Sentiment Detective!
          </p>
          <div className="mb-10 flex flex-col items-center">
            <button
              onClick={() => setGiftOpened(true)}
              disabled={giftOpened}
              className={`focus:outline-none transition-transform duration-300
                ${!giftOpened ? "animate-bounce" : "animate-none"}
                bg-gradient-to-br from-yellow-300 via-pink-200 to-purple-200 rounded-2xl shadow-xl p-6 border-4 border-white
                hover:scale-105`}
              style={{
                fontSize: "5rem",
                boxShadow: "0 8px 48px 0 rgba(236,72,153,0.16)",
                cursor: giftOpened ? "default" : "pointer",
              }}
              aria-label="Open your gift"
            >
              {!giftOpened ? (
                <span
                  role="img"
                  aria-label="Gift Box"
                  className="transition-transform duration-300"
                >
                  🎁
                </span>
              ) : (
                <span
                  className="inline-block animate-pulse"
                  style={{ transition: "transform 0.5s" }}
                >
                  😊🎉😊
                </span>
              )}
            </button>
            <div
              className={`mt-6 text-center transition-opacity duration-700 ${
                giftOpened ? "opacity-100" : "opacity-0"
              }`}
            >
              <p
                className={`text-2xl md:text-3xl font-bold text-pink-600 animate-fadein-smooth`}
                style={{
                  animation: giftOpened ? "fadein-smooth 1.2s" : "none",
                }}
              >
                {giftOpened ? "You unlocked a happiness surprise! 😊🎉" : ""}
              </p>
              {giftOpened && (
                <p className="mt-2 text-lg text-purple-700 font-semibold animate-pulse">
                  Always remember:{" "}
                  <span className="font-bold text-yellow-500">
                    Detective Sunny
                  </span>{" "}
                  is proud of you!
                </p>
              )}
            </div>
          </div>
          <button
            className="mt-8 px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 via-pink-400 to-yellow-400 text-white font-bold text-xl shadow-lg hover:scale-105 transition-transform animate-fadein-smooth"
            style={{ animation: "fadein-smooth 2.2s" }}
            onClick={() => {
              celebrationAudioRef.current?.play();
              setShowFinalCelebration(false);
              setQuizCompleted(true);
            }}
          >
            Continue
          </button>
        </div>
        <style>
          {`
          @keyframes bounce {
            0%, 100% { transform: translateY(0);}
            20% { transform: translateY(-16px);}
            40% { transform: translateY(0);}
            60% { transform: translateY(-8px);}
            80% { transform: translateY(0);}
          }
          .animate-bounce { animation: bounce 1.2s infinite; }
          @keyframes fadein-smooth {
            0% { opacity: 0; transform: translateY(32px);}
            100% { opacity: 1; transform: translateY(0);}
          }
          .animate-fadein-smooth { animation: fadein-smooth 1s; }
          .animate-pulse {
            animation: pulse 1.1s cubic-bezier(0.4,0,0.6,1) infinite;
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1);}
            50% { opacity: 0.7; transform: scale(1.08);}
          }
          `}
        </style>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-yellow-100 text-center p-6">
        <h1 className="text-4xl font-bold text-green-700 mb-4">
          🎉 Quiz Completed!
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            generatePDF();
          }}
          className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full"
        >
          <div className="mb-3 text-left">
            <label
              className="block mb-1 font-medium text-gray-700"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              id="name"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Detective Name"
            />
          </div>
          <div className="mb-3 text-left">
            <label
              className="block mb-1 font-medium text-gray-700"
              htmlFor="age"
            >
              Age:
            </label>
            <input
              id="age"
              type="number"
              value={userAge}
              onChange={(e) => setUserAge(e.target.value)}
              required
              min="1"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Your Age"
            />
          </div>
          <div className="mb-3 text-left">
            <label
              className="block mb-1 font-medium text-gray-700"
              htmlFor="school"
            >
              School:
            </label>
            <input
              id="school"
              type="text"
              value={userSchool}
              onChange={(e) => setUserSchool(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Your School"
            />
          </div>
          <div className="mb-3 text-left">
            <label
              className="block mb-1 font-medium text-gray-700"
              htmlFor="class"
            >
              Class:
            </label>
            <input
              id="class"
              type="text"
              value={userClass}
              onChange={(e) => setUserClass(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Your Class"
            />
          </div>
          <div className="mb-3 text-left">
            <label
              className="block mb-1 font-medium text-gray-700"
              htmlFor="gender"
            >
              Gender:
            </label>
            <select
              id="gender"
              value={userGender}
              onChange={(e) => setUserGender(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 mt-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Download PDF Results 📄
          </button>
        </form>
        <div className="fixed bottom-4 right-4 animate-bounce text-3xl">🕵️‍♂️</div>
      </div>
    );
  }

  if (showLeaderboard) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 text-center p-8">
        <h1 className="text-4xl font-bold text-purple-800 mb-6">🏆 Leaderboard</h1>
        <div className="mb-6">
          <button
            onClick={() => setShowLeaderboard(false)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg"
          >
            Back to Quiz
          </button>
        </div>
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 overflow-x-auto">
          {loadingLeaderboard ? (
            <div className="text-lg text-gray-600">Loading leaderboard...</div>
          ) : leaderboardError ? (
            <div className="text-lg text-red-600">{leaderboardError}</div>
          ) : leaderboard.length === 0 ? (
            <div className="text-lg text-gray-600">No users found.</div>
          ) : (
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-purple-100">
                  <th className="px-4 py-2 text-left font-semibold text-purple-700">Rank</th>
                  <th className="px-4 py-2 text-left font-semibold text-purple-700">Name</th>
                  <th className="px-4 py-2 text-left font-semibold text-purple-700">Score</th>
                  <th className="px-4 py-2 text-left font-semibold text-purple-700">School</th>
                  <th className="px-4 py-2 text-left font-semibold text-purple-700">Class</th>
                  <th className="px-4 py-2 text-left font-semibold text-purple-700">Gender</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((user, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-yellow-50" : "bg-white"}>
                    <td className="px-4 py-2 font-bold text-lg text-center">{idx + 1}</td>
                    <td className="px-4 py-2">{user.userName}</td>
                    <td className="px-4 py-2 text-center">{user.overallScore}</td>
                    <td className="px-4 py-2">{user.userSchool}</td>
                    <td className="px-4 py-2">{user.userClass}</td>
                    <td className="px-4 py-2">{user.userGender}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }


  return (
    <>
      <audio ref={audioRef} src={successSound} />
      <div
        className={`min-h-screen p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 text-center transition-opacity duration-700 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="w-full bg-gray-200 rounded-full h-4 mb-6 shadow-inner">
          <div
            className="bg-purple-600 h-4 rounded-full transition-all duration-300"
            style={{ width: `${(currentLevel / levels.length) * 100}%` }}
          />
        </div>
        <h1 className="text-4xl font-bold text-purple-800 mb-6 animate-bounce">
          🎯 Sentiment Detective Game 🎯
        </h1>
        <h2 className="text-2xl font-semibold mb-2">
          Level: {levels[currentLevel]?.name || ""}
        </h2>
        <p className="mb-4 text-lg">
          Emojis in this level: {levels[currentLevel]?.emojis?.join(" ") || ""}
        </p>

        {(showLevelNarrative || narrative) && (
          <div className="bg-purple-100 p-4 mb-4 rounded shadow-md text-purple-800 font-semibold animate-pulse">
            {narrative}ƒ
          </div>
        )}

        {levels[currentLevel]?.hint && (
          <div
            className="bg-yellow-100 p-3 mb-4 rounded-lg shadow-inner text-yellow-800 font-medium animate-fadein-smooth transition-all duration-500"
            style={{ animation: "fadein-smooth 1s" }}
          >
            {levels[currentLevel].hint}
          </div>
        )}

        {showResult ? (
          <>
            <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto animate-pulse relative z-10">
              <p className="text-xl mb-4">
                You sorted <strong>{score}</strong> out of{" "}
                <strong>{total}</strong> sentences correctly!
              </p>
              <p
                className={`text-lg font-semibold ${
                  score === total ? "text-green-600" : "text-red-600"
                }`}
              >
                {score === total
                  ? "🎉 Amazing! Detective Sunny is proud!"
                  : "Keep trying! You can do it! 🕵️‍♂️"}
              </p>

              <div className="mt-4 flex justify-center gap-4">
                {score === total && currentLevel < levels.length - 1 && (
                  <button
                    onClick={async () => {
                      // Defensive: only proceed if next level exists
                      if (!levels[currentLevel + 1]) return;
                      setIsTransitioning(true);
                      setNarrative(
                        `🎉 Detective Sunny solved the ${
                          levels[currentLevel]?.name || ""
                        } cases! Get ready for ${
                          levels[currentLevel + 1]?.name || ""
                        } cases!`
                      );
                 
                      await saveProgress();
                     
                      setTimeout(async () => {
                        if (currentLevel + 1 < levels.length) {
                          setCurrentLevel(currentLevel + 1);
                          setSentences(levels[currentLevel + 1].sentences);
                          setZones(initializeZones(currentLevel + 1));
                          setDraggedItem(null);
                          setShowResult(false);
                          setIsTransitioning(false);
                          setNarrative("");
                          setShowCharModal(false);
                          setPendingNextLevel(null);
                          await saveProgress();
                        }
                      }, 100);
                    }}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg"
                  >
                    Next Level ➡️
                  </button>
                )}
                <button
                  onClick={resetQuiz}
                  className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition shadow-lg"
                >
                  Retry Level 🔄
                </button>
                {score === total && currentLevel === levels.length - 1 && (
                  <button
                    onClick={async () => {
                      setQuizCompleted(true);
                      setShowResult(false);
                      await saveProgress();
                    }}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-lg"
                  >
                    Submit Quiz ✅
                  </button>
                )}
              </div>
            </div>

            {isTransitioning && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-40">
                <div className="text-2xl md:text-3xl font-bold text-purple-700 text-center px-8">
                  {narrative}
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <p className="mb-6 text-lg text-gray-700">
              Drag and drop the sentences into the right feeling box! 🧩
            </p>

            <div className="bg-white p-4 rounded-lg shadow-md min-h-[200px] mb-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-slide-up">
              {sentences.map((sentence) => (
                <div
                  key={sentence.id}
                  draggable
                  onDragStart={() => handleDragStart(sentence)}
                  className="bg-pink-100 p-3 rounded-md cursor-move shadow-lg hover:scale-105 transition-transform text-center font-semibold"
                >
                  {sentence.text}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {currentSentiments.map((zone) => (
                <div
                  key={zone}
                  onDrop={() => handleDrop(zone)}
                  onDragOver={allowDrop}
                  className={`min-h-[200px] p-4 rounded-lg shadow-md transition-shadow hover:shadow-xl ${
                    zoneColors[zone] || "bg-gray-100"
                  } animate-fade-in`}
                >
                  <h2 className="text-xl font-semibold mb-2 capitalize">
                    {`${sentimentEmojis[zone] || ""} ${
                      zone.charAt(0).toUpperCase() + zone.slice(1)
                    }`}
                  </h2>
                  {zones[zone]?.map((item) => (
                    <div
                      key={item.id}
                      className="bg-green-100 p-2 rounded-md my-2 transition-transform hover:scale-105 text-sm"
                    >
                      {item.text} <div>{getFeedback(item, zone)}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 justify-center mt-4">
              <button
                onClick={handleFinish}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition shadow-lg"
              >
                Finish Quiz ✅
              </button>
              <button
                onClick={resetQuiz}
                className="px-9 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition shadow-lg"
              >
                Retry Level 🔄
              </button>
              <button
                onClick={() => setShowLeaderboard(true)}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow-lg"
              >
                View Leaderboard 🏆
              </button>
              <SubmitQuizButton
                score={score}
                total={total}
                levelName={levels[currentLevel]?.name || ""}
                knowledgeLevel={levels[currentLevel]?.name || ""}
                sentences={levels[currentLevel]?.sentences || []}
                userName={userName}
                setUserName={setUserName}
                userAge={userAge}
                setUserAge={setUserAge}
                userSchool={userSchool}
                setUserSchool={setUserSchool}
                userClass={userClass}
                setUserClass={setUserClass}
                userGender={userGender}
                setUserGender={setUserGender}
              />
            </div>
          </>
        )}

        <div className="fixed bottom-8 left-6 z-50 flex flex-col items-center pointer-events-auto">
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-purple-200/50 animate-bounce shadow-lg blur-xl"></div>

          {showHelpTooltip && (
            <div
              className="relative mb-4 flex flex-col items-center animate-tooltip-pop"
              style={{
                maxWidth: 280,
                width: "fit-content",
                position: "absolute",
                bottom: 60,
                left: "50%",
                transform: "translateX(-50%)",
                backdropFilter: "blur(8px)",
                background: "rgba(255, 255, 255, 0.55)",
                borderRadius: "16px",
                padding: "0.8rem 1rem",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                textAlign: "center",
                fontWeight: 500,
                color: "#1f2937",
              }}
            >
              <span className="font-bold text-yellow-700 text-lg flex items-center justify-center mb-1">
                🕵️‍♂️ <span className="ml-2">Need Help?</span>
              </span>
              <p className="text-sm">
                {levels[currentLevel]?.hint ||
                  "Detective Sunny is always here to help!"}
              </p>

              <span
                style={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  bottom: "-10px",
                  width: 0,
                  height: 0,
                  borderLeft: "10px solid transparent",
                  borderRight: "10px solid transparent",
                  borderTop: "10px solid rgba(255,255,255,0.55)",
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                }}
              />
            </div>
          )}

          <div
            className="relative z-50 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-200 shadow-xl cursor-pointer animate-bounce transition-transform duration-300 hover:scale-110"
            onClick={() => {
              setShowHelpTooltip(true);
              if (helpTimeoutRef.current) clearTimeout(helpTimeoutRef.current);
              helpTimeoutRef.current = setTimeout(() => {
                setShowHelpTooltip(false);
              }, 3500);
            }}
            onDoubleClick={() => setShowCharModal(true)}
            title="Detective Sunny: Click me for a quick hint! Double-click for a story."
            tabIndex={0}
            aria-label="Detective Sunny help"
          >
            <span className="text-3xl">🕵️‍♂️</span>
          </div>
        </div>

        {showCharModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-lg">
            <div
              className="relative w-full max-w-lg mx-auto rounded-3xl shadow-2xl border-0 animate-fadein-smooth"
              style={{
                background:
                  "linear-gradient(135deg, rgba(168,85,247,0.65) 0%, rgba(236,72,153,0.60) 54%, rgba(253,224,71,0.65) 100%)",
                border: "2.5px solid rgba(255,255,255,0.55)",
                boxShadow: "0 24px 64px 0 rgba(64,0,128,0.18)",
                backdropFilter: "blur(22px)",
                WebkitBackdropFilter: "blur(22px)",
                padding: "2.5rem 2rem 2rem 2rem",
                overflow: "visible",
              }}
            >
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-20">
                <div className="relative flex flex-col items-center">
                  <div
                    className="w-24 h-24 rounded-full bg-white/70 shadow-xl flex items-center justify-center animate-bounce"
                    style={{
                      boxShadow: "0 8px 32px 0 rgba(168,85,247,0.18)",
                      border: "3px solid #a855f7",
                    }}
                  >
                    <span className="text-6xl">🕵️‍♂️</span>
                  </div>
                  <div className="w-16 h-4 rounded-full bg-purple-200/60 blur-xl mt-1"></div>
                </div>
              </div>

              <button
                type="button"
                className="absolute top-5 right-6 text-gray-500 hover:text-gray-800 text-3xl font-extrabold focus:outline-none transition-transform hover:scale-110"
                onClick={() => {
                  setShowCharModal(false);
                  setPendingNextLevel(null);
                }}
                aria-label="Close"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  borderRadius: "50%",
                  width: 44,
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px 0 rgba(168,85,247,0.14)",
                }}
              >
                &times;
              </button>

              <h2
                className="mt-16 mb-3 text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-300 text-center drop-shadow-lg tracking-tight"
                style={{
                  fontFamily:
                    "'Nunito', 'Montserrat', 'Segoe UI', Arial, sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                Detective Sunny's Story
              </h2>

              <div
                className="text-center text-gray-800/90 text-lg md:text-xl font-medium space-y-4 px-2"
                style={{
                  fontFamily: "'Montserrat', 'Nunito', Arial, sans-serif",
                  lineHeight: "1.6",
                }}
              >
                {pendingNextLevel !== null ? (
                  <>
                    <p className="font-semibold text-xl text-purple-300 drop-shadow-sm">
                      {levels[pendingNextLevel]?.name
                        ? `Ready for the ${levels[pendingNextLevel].name} Level?`
                        : "Ready for the next challenge?"}
                    </p>
                    <p className="italic text-yellow-200 font-semibold text-lg">
                      {levels[pendingNextLevel]?.hint}
                    </p>
                    <p className="text-white-400 font-medium">
                      Detective Sunny believes in you! Are you ready to
                      continue?
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-purple-400 font-bold">
                      Hi Detective! Whenever you feel stuck, remember:
                      <span className="font-bold text-pink-300">
                        {" "}
                        every feeling is important and clues are everywhere!{" "}
                      </span>
                    </p>
                    <p className="italic text-yellow-200 font-bold">
                      {levels[currentLevel]?.hint}
                    </p>
                    <p className="text-gray-700">
                      Keep your eyes open and your heart curious!{" "}
                      <span role="img" aria-label="Detective">
                        🕵️‍♂️
                      </span>
                    </p>
                  </>
                )}
              </div>

              <div className="mt-8 flex justify-center gap-4">
                {pendingNextLevel !== null ? (
                  <button
                    className="px-7 py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 text-white font-bold rounded-xl shadow-lg transition-transform hover:scale-105 hover:from-purple-700 hover:via-pink-600 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
                    style={{
                      fontFamily: "'Montserrat', 'Nunito', Arial, sans-serif",
                      fontSize: "1.2rem",
                    }}
                    onClick={() => {
                      setIsTransitioning(true);
                      setShowLevelNarrative(true);
                      setNarrative(
                        `🎉 Detective Sunny solved the ${levels[currentLevel].name} cases! Get ready for ${levels[pendingNextLevel].name} cases!`
                      );
                      setTimeout(() => {
                        setCurrentLevel(pendingNextLevel);
                        setSentences(levels[pendingNextLevel].sentences);
                        setZones(initializeZones(pendingNextLevel));
                        setDraggedItem(null);
                        setShowResult(false);
                        setIsTransitioning(false);
                        setShowLevelNarrative(false);
                        setNarrative("");
                        setShowCharModal(false);
                        setPendingNextLevel(null);
                      }, 2000);
                    }}
                  >
                    <span className="inline-block animate-bounce">🚀</span>{" "}
                    Start Next Level
                  </button>
                ) : (
                  <button
                    className="px-7 py-3 bg-gradient-to-r from-pink-300 to-purple-100 text-white font-bold rounded-xl shadow-lg transition-transform hover:scale-105 hover:from-pink-300 hover:to-purple-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
                    style={{
                      fontFamily: "'Montserrat', 'Nunito', Arial, sans-serif",
                      fontSize: "1.1rem",
                    }}
                    onClick={() => setShowCharModal(false)}
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Quiz;

const SubmitQuizButton = ({
  score,
  total,
  levelName,
  knowledgeLevel,
  sentences,
  userName,
  setUserName,
  userAge,
  setUserAge,
  userSchool,
  setUserSchool,
  userClass,
  setUserClass,
  userGender,
  setUserGender,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);


  const userEmail = localStorage.getItem("userEmail") || "guest@example.com";
  const safeEmail = userEmail.replace(/\./g, ",");

  const handleSaveDownload = async (e) => {
    e.preventDefault();
    try {
   
      await update(
        ref(db, `users/${safeEmail}`),
        {
          userName,
          userAge,
          userSchool,
          userClass,
          userGender,
        }
      );
    } catch (e) {
     
      console.error("Error saving user details:", e);
    }
    const doc = new jsPDF();
    let y = 10;
    doc.setFontSize(18);
    doc.text(
      "Sentiment Detective Quiz Submission",
      105,
      y,
      null,
      null,
      "center"
    );
    y += 10;
    doc.setFontSize(12);
    doc.text(`Name: ${userName}`, 10, y);
    y += 7;
    doc.text(`Age: ${userAge}`, 10, y);
    y += 7;
    doc.text(`School: ${userSchool}`, 10, y);
    y += 7;
    doc.text(`Class: ${userClass}`, 10, y);
    y += 7;
    doc.text(`Gender: ${userGender}`, 10, y);
    y += 10;
    doc.text(`Level: ${levelName}`, 10, y);
    y += 7;
    doc.text(`Knowledge Level: ${knowledgeLevel}`, 10, y);
    y += 7;
    doc.text(`Score: ${score} out of ${total}`, 10, y);
    y += 10;
    doc.setFontSize(13);
    doc.text("Quiz Sentences:", 10, y);
    y += 7;
    doc.setFontSize(11);
    sentences.forEach((sentence) => {
      if (y > 280) {
        doc.addPage();
        y = 10;
      }
      doc.text(`- ${sentence.text} (${sentence.sentiment})`, 15, y);
      y += 6;
    });
    doc.save(`Sentiment_Detective_Quiz_Level_${levelName}_Results.pdf`);
    setFormSubmitted(true);
  };

  if (showForm) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <form
          onSubmit={handleSaveDownload}
          className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full relative"
        >
          <button
            type="button"
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
            onClick={() => setShowForm(false)}
            aria-label="Close"
          >
            &times;
          </button>
          <h2 className="text-2xl font-bold mb-4 text-purple-700 text-center">
            Submit Quiz
          </h2>
          <div className="mb-3 text-left">
            <label
              className="block mb-1 font-medium text-gray-700"
              htmlFor="name2"
            >
              Name:
            </label>
            <input
              id="name2"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Detective Name"
            />
          </div>
          <div className="mb-3 text-left">
            <label
              className="block mb-1 font-medium text-gray-700"
              htmlFor="age2"
            >
              Age:
            </label>
            <input
              id="age2"
              type="number"
              value={userAge}
              onChange={(e) => setUserAge(e.target.value)}
              required
              min="1"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Your Age"
            />
          </div>
          <div className="mb-3 text-left">
            <label
              className="block mb-1 font-medium text-gray-700"
              htmlFor="school2"
            >
              School:
            </label>
            <input
              id="school2"
              type="text"
              value={userSchool}
              onChange={(e) => setUserSchool(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Your School"
            />
          </div>
          <div className="mb-3 text-left">
            <label
              className="block mb-1 font-medium text-gray-700"
              htmlFor="class2"
            >
              Class:
            </label>
            <input
              id="class2"
              type="text"
              value={userClass}
              onChange={(e) => setUserClass(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Your Class"
            />
          </div>
          <div className="mb-3 text-left">
            <label
              className="block mb-1 font-medium text-gray-700"
              htmlFor="gender2"
            >
              Gender:
            </label>
            <select
              id="gender2"
              value={userGender}
              onChange={(e) => setUserGender(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
          <div className="mb-3 text-left">
            <label className="block mb-1 font-medium text-gray-700">
              Score:
            </label>
            <div className="bg-gray-100 p-2 rounded">
              {score} out of {total}
            </div>
          </div>
          <div className="mb-3 text-left">
            <label className="block mb-1 font-medium text-gray-700">
              Level:
            </label>
            <div className="bg-gray-100 p-2 rounded">{levelName}</div>
          </div>
          <div className="mb-3 text-left">
            <label className="block mb-1 font-medium text-gray-700">
              Knowledge Level:
            </label>
            <div className="bg-gray-100 p-2 rounded">{knowledgeLevel}</div>
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 mt-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Save and Download PDF 📄
          </button>
          {formSubmitted && (
            <div className="mt-3 text-green-600 text-center">
              PDF generated and downloaded!
            </div>
          )}
        </form>
      </div>
    );
  }
  return (
    <button
      onClick={() => setShowForm(true)}
      className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition shadow-lg"
      type="button"
    >
      Submit Quiz 📝
    </button>
  );
};

if (typeof window !== "undefined" && typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
  @keyframes popUpTooltip {
    0% {
      opacity: 0;
      transform: translateY(36px) scale(0.92);
      filter: blur(1px);
    }
    70% {
      opacity: 1;
      transform: translateY(-10px) scale(1.06);
      filter: blur(0px);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0px);
    }
  }
  .animate-tooltip-pop {
    animation: popUpTooltip 0.46s cubic-bezier(0.23, 1, 0.32, 1);
    will-change: transform, opacity;
  }
  `;
  if (!document.getElementById("quiz-help-tooltip-style")) {
    style.id = "quiz-help-tooltip-style";
    document.head.appendChild(style);
  }
}
