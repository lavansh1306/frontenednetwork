import React, { useEffect, useState } from "react";
import ChatBox from "../components/chatbot";


const matches = [
  {
    id: 1,
    name: "Aarav Mehta",
    vibeScore: 91,
    sharedInterests: ["Rock Music", "Pizza", "Shared Activities"],
  },
  {
    id: 2,
    name: "Ishita Sharma",
    vibeScore: 86,
    sharedInterests: ["Jazz", "Deep Convos", "Ice Cream"],
  },
  {
    id: 3,
    name: "Karan Patel",
    vibeScore: 78,
    sharedInterests: ["Hip-Hop", "Chaotic Creativity", "Burgers"],
  },
];

const Dashboard = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("connectifyUser"));
    setUserProfile(data);
  }, []);

  const handleConnect = (id, name) => {
    if (!connectedUsers.includes(id)) {
      setConnectedUsers((prev) => [...prev, id]);
      setToast(`Connection request sent to ${name}`);
      setTimeout(() => setToast(""), 3000);
    }
  };

  const connectedPeople = matches.filter((m) => connectedUsers.includes(m.id));
  const unconnectedPeople = matches.filter((m) => !connectedUsers.includes(m.id));

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-blue-700">Your Vibe Matches 💫</h2>

      {/* User Profile Section */}
      {userProfile ? (
        <div className="mb-6 bg-blue-50 border border-blue-200 p-4 rounded-md">
          <h3 className="text-lg font-semibold text-blue-800">👤 Your Profile</h3>
          <ul className="text-sm text-gray-700 list-disc ml-5 mt-2">
            <li><strong>Generation:</strong> {userProfile.generation}</li>
            <li><strong>Style:</strong> {userProfile.style}</li>
            <li><strong>Music:</strong> {userProfile.music}</li>
            <li><strong>Friendship:</strong> {userProfile.friendship}</li>
            <li><strong>Comfort Food:</strong> {userProfile.food}</li>
          </ul>
        </div>
      ) : (
        <p className="text-sm text-gray-500 mb-4">Loading your profile...</p>
      )}

      {/* Toast */}
      {toast && (
        <div className="mb-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded">
          {toast}
        </div>
      )}

      {/* Connected People Section */}
      {connectedPeople.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-green-700 mb-4">✅ Connected People</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {connectedPeople.map((match) => (
              <div key={match.id} className="border rounded-xl p-4 shadow-sm bg-green-50">
                <h4 className="text-lg font-semibold text-gray-800">{match.name}</h4>
                <p className="text-sm text-gray-500 mb-2">Vibe Match: {match.vibeScore}%</p>
                <div>
                  {match.sharedInterests.map((interest, idx) => (
                    <span key={idx} className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full mr-2">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Unconnected Matches Section */}
      <div>
        <h3 className="text-xl font-semibold text-blue-600 mb-4">🔍 People You May Connect With</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {unconnectedPeople.map((match) => (
            <div key={match.id} className="border rounded-xl p-4 shadow-md hover:shadow-lg transition">
              <h4 className="text-lg font-semibold text-gray-800">{match.name}</h4>
              <p className="text-sm text-gray-500 mb-2">Vibe Match: {match.vibeScore}%</p>
              <div className="mb-2">
                {match.sharedInterests.map((interest, idx) => (
                  <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full mr-2">
                    {interest}
                  </span>
                ))}
              </div>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                onClick={() => handleConnect(match.id, match.name)}
              >
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>
      {connectedPeople.length > 0 && (
  <ChatBox connectedPeople={connectedPeople} />
)}

    </div>
  );
};

export default Dashboard;
