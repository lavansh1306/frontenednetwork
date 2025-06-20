import React, { useState } from "react";

const ChatBox = ({ connectedPeople }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input || !selectedUser) return;
    const updated = {
      ...messages,
      [selectedUser.id]: [
        ...(messages[selectedUser.id] || []),
        { from: "me", text: input },
      ],
    };
    setMessages(updated);
    setInput("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white border shadow-xl rounded-lg w-72">
        <div className="flex justify-between items-center bg-blue-600 text-white p-3 rounded-t-lg">
          <h4 className="font-semibold text-sm">Chat</h4>
          <button onClick={() => setIsOpen(!isOpen)} className="text-sm">
            {isOpen ? "−" : "+"}
          </button>
        </div>

        {isOpen && (
          <div className="p-2 h-80 flex flex-col">
            {/* Users List */}
            {!selectedUser ? (
              <div className="flex-1 overflow-y-auto">
                {connectedPeople.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className="p-2 cursor-pointer hover:bg-blue-100 text-sm border-b"
                  >
                    💬 {user.name}
                  </div>
                ))}
              </div>
            ) : (
              // Chat UI
              <div className="flex flex-col flex-1">
                <div className="text-sm font-semibold p-1 border-b flex justify-between items-center">
                  {selectedUser.name}
                  <button
                    className="text-xs text-red-500"
                    onClick={() => setSelectedUser(null)}
                  >
                    ⬅ Back
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto text-sm p-2 space-y-2 bg-gray-50">
                  {(messages[selectedUser.id] || []).map((msg, i) => (
                    <div
                      key={i}
                      className={`${
                        msg.from === "me"
                          ? "text-right text-blue-600"
                          : "text-left text-gray-700"
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))}
                </div>
                <div className="flex mt-2">
                  <input
                    className="flex-1 border rounded-l px-2 py-1 text-sm"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message"
                  />
                  <button
                    className="bg-blue-600 text-white px-3 text-sm rounded-r"
                    onClick={handleSend}
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
