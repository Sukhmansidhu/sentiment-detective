import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { ref, get, child } from "firebase/database";
import { useNavigate } from "react-router-dom";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchLeaderboard = async () => {
    try {
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, "users"));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const leaderboard = Object.entries(data)
          .filter(([_, userData]) => userData.userName && userData.userName.trim() !== "")
          .map(([_, userData]) => ({
            name: userData.userName,
            score: userData.overallScore || 0,
            school: userData.userSchool || "",
            class: userData.userClass || "",
            gender: userData.userGender || "",
          }))
          .sort((a, b) => b.score - a.score); 
        setUsers(leaderboard);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-purple-800 mb-6">
        🏆 Sentiment Detective Leaderboard 🏆
      </h1>
      {users.length === 0 ? (
        <p className="text-lg text-gray-700">No scores yet. Be the first to play!</p>
      ) : (
        <div className="overflow-x-auto w-full max-w-5xl">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-purple-200 text-purple-800">
                <th className="border border-gray-300 px-4 py-2">Rank</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Score</th>
                <th className="border border-gray-300 px-4 py-2">School</th>
                <th className="border border-gray-300 px-4 py-2">Class</th>
                <th className="border border-gray-300 px-4 py-2">Gender</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                let bgColorClass = index % 2 === 0 ? "bg-white" : "bg-purple-50";
                if (index === 0) bgColorClass = "bg-yellow-200";
                else if (index === 1) bgColorClass = "bg-gray-200";
                else if (index === 2) bgColorClass = "bg-orange-200";

                return (
                  <tr
                    key={index}
                    className={`text-center ${bgColorClass}`}
                  >
                    <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.score}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.school}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.class}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.gender}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <button
        onClick={() => navigate("/")}
        className="mt-8 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition shadow-lg"
      >
        ⬅️ Back to Quiz
      </button>
    </div>
  );
};

export default Leaderboard;