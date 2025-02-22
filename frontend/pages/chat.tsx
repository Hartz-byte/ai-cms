import { useState, useEffect, useRef } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const Chatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newUserMessage = { role: "User", text: userInput };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setLoading(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userInput,
          history: messages.map((msg) => ({
            role: msg.role === "User" ? "User" : "Chatbot",
            message: msg.text,
          })),
        }),
      });

      const data = await response.json();

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "Chatbot", text: data.reply || "No response received." },
      ]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
    } finally {
      setLoading(false);
    }

    setUserInput("");
  };

  return (
    <DashboardLayout title="AI Chatbot">
      <div className="w-full h-[87%] bg-card dark:bg-darkCard p-6 rounded-lg shadow-lg shadow-2xl">
        {/* Chat Messages */}
        <div
          ref={chatContainerRef}
          className="h-[84%] overflow-y-auto border rounded-lg p-4 bg-gray-50"
        >
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center font-semibold">
              Start the conversation...
            </p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 flex ${
                  msg.role === "User" ? "justify-end" : "justify-start"
                }`}
              >
                <span
                  className={`inline-block px-4 py-2 rounded-lg max-w-[50%] ${
                    msg.role === "User"
                      ? "bg-blue-200 text-blue-900 self-end"
                      : "bg-gray-200 text-gray-800 self-start"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))
          )}
          {loading && (
            <p className="text-gray-500 text-center mt-2">Thinking...</p>
          )}
        </div>

        {/* Chat Input */}
        <div className="flex mt-8">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-3 border rounded-lg focus:outline-none text-black"
          />
          <button
            onClick={sendMessage}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Chatbot;
