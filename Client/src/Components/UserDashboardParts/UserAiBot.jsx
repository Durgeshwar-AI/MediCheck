import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, History, MessageSquare, Loader2 } from "lucide-react";
import { useHealth } from "../../hooks/useHealth";

const UserAiBot = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { heartRate, oxygen, bp, steps, sleep, deviceConnected } = useHealth();

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I'm your medical assistant. Please describe your symptoms and any additional information to help me understand your condition better.",
    },
  ]);
  const [symptomsInput, setSymptomsInput] = useState("");
  const [additionalInfoInput, setAdditionalInfoInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (symptomsInput.trim() === "") return;

    const userMessage = `${
      symptomsInput.trim() ? `Symptoms: ${symptomsInput}` : ""
    }${
      additionalInfoInput.trim()
        ? (symptomsInput.trim() ? "\n" : "") +
          `Additional Info: ${additionalInfoInput}`
        : ""
    }`;

    if (deviceConnected) {
      const newReq = {
        heartRate,
        oxygen,
        bp,
        steps,
        sleep,
        symptoms: symptomsInput?.trim() ? symptomsInput : "N/A",
        additionalData: additionalInfoInput?.trim()
          ? additionalInfoInput
          : "N/A",
      };

      try {
        const res = await fetch(`${API_URL}/ble/report`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newReq),
        });

        const updatedMessages = [
          ...messages,
          { sender: "user", text: userMessage },
        ];
        setMessages(updatedMessages);
        setSymptomsInput("");
        setAdditionalInfoInput("");
        setIsLoading(true);

        if (res.ok) {
          const message = await res.json();
          // Simulate bot response after a short delay
          setTimeout(() => {
            setMessages([
              ...updatedMessages,
              {
                sender: "bot",
                text: message.report,
              },
            ]);
            setIsLoading(false);
          }, 2000);
        }
      } catch (err) {
        console.log(err);
      }
    }else{
      const newReq = {
        symptoms: symptomsInput.trim(),
        additionalData: additionalInfoInput?.trim()
          ? additionalInfoInput
          : "N/A",
      };

      try {
        const res = await fetch(`${API_URL}/ble/symptoms`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newReq),
        });

        const updatedMessages = [
          ...messages,
          { sender: "user", text: userMessage },
        ];
        setMessages(updatedMessages);
        setSymptomsInput("");
        setAdditionalInfoInput("");
        setIsLoading(true);

        if (res.ok) {
          const message = await res.json();
          // Simulate bot response after a short delay
          setTimeout(() => {
            setMessages([
              ...updatedMessages,
              {
                sender: "bot",
                text: message.report,
              },
            ]);
            setIsLoading(false);
          }, 2000);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        sender: "bot",
        text: "Chat history cleared. How can I help you today?",
      },
    ]);
  };

  return (
    <motion.div
      className="w-full h-full"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <MessageSquare size={20} className="text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-white">Medical Assistant</h2>
          </div>
          <button
            onClick={clearChat}
            className="text-white hover:bg-red-400 hover:bg-opacity-20 rounded-full p-2 transition-all"
          >
            <History size={20} />
          </button>
        </div>

        {/* Chat Content */}
        <div className="bg-gradient-to-b from-blue-50 to-indigo-50 w-full p-6">
          <div className="flex flex-col max-h-120">
            {/* Messages Area with Custom Scrollbar */}
            <div className="flex-1 overflow-y-auto mb-6 pr-0.5 custom-scrollbar">
              <div className="flex flex-col space-y-4 h-[240px] md:h-[400px] lg:h-[500px]">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className={`max-w-md p-4 rounded-2xl shadow-md ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-blue-400 via-indigo-500 to-indigo-600 text-white rounded-br-none mr-2"
                          : "bg-white text-gray-800 rounded-bl-none"
                      }`}
                    >
                      <div className="whitespace-pre-line">{message.text}</div>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white p-4 rounded-2xl shadow-md rounded-bl-none max-w-md">
                      <div className="flex items-center gap-2">
                        <Loader2
                          size={18}
                          className="animate-spin text-blue-500"
                        />
                        <span className="text-gray-600">
                          Analyzing your symptoms...
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>
        </div>
        {/* Input Area */}
        <div className="border-t border-gray-200 mt-6 ">
          <div className="bg-white rounded-xl shadow-md p-2">
            <div className="flex flex-col gap-2">
              <div className="relative">
                <textarea
                  placeholder="Describe your symptoms...*"
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none h-14 overflow-y-scroll md:overflow-hidden"
                  value={symptomsInput}
                  onChange={(e) => setSymptomsInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  required
                />
                <label
                  htmlFor="symptoms"
                  className="absolute left-3 -top-3 text-xs bg-white rounded-full px-1 text-red-400 font-bold"
                >
                  Symptoms*
                </label>
              </div>
              <div className="relative">
                <textarea
                  placeholder="Additional information (Ex: allergies, medical history, health metrics(If not all are connected) etc.)"
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none h-14 overflow-y-scroll md:overflow-hidden"
                  value={additionalInfoInput}
                  onChange={(e) => setAdditionalInfoInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <label
                  htmlFor="additional-info"
                  className="absolute left-3 -top-3 text-xs bg-white rounded-full px-1 text-green-400 font-bold"
                >
                  Additional/Missing Data
                </label>
              </div>
              <div className="flex justify-end">
                <motion.button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-md flex items-center gap-2 hover:shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-3 text-center text-xs text-gray-500 border-t border-gray-100">
          This is not a substitute for professional medical advice. Seek
          immediate medical attention for serious conditions.
        </div>
      </div>
      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(226, 232, 240, 0.6);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #4f46e5);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #4338ca);
        }
      `}</style>
    </motion.div>
  );
};

export default UserAiBot;
