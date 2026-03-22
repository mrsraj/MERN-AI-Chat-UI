import { useState, useRef, useEffect } from "react";
import api from "../api/chat.api";

import BotMessage from "../components/formatter_component";
import ChatLoader from "../components/chat.Loader";
import SpeechInput from "../components/Speech.Input";

export default function RestaurantChatbot() {

    const [isTyping, setIsTyping] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([
        {
            type: "bot",
            text: "👋 Hi! I'm Sachin Raj's personal assistant.\n\nYou can ask me about:\n• Work\n• Skills\n• Projects\n• Or anything related to his professional life!"
        }
    ]);

    const chatRef = useRef(null);

    const sendMessage = async () => {

        if (!message.trim()) return;

        const userMsg = { type: "user", text: message };

        setMessages(prev => [...prev, userMsg]);
        setMessage("");
        setIsTyping(true);
        try {
            const data = await api.fetchApi("/api/chat", {
                method: "POST",
                body: JSON.stringify({ message })
            });

            const botMsg = { type: "bot", text: data.reply };

            setMessages(prev => [...prev, botMsg]);

        } catch (error) {

            setMessages(prev => [
                ...prev,
                { type: "bot", text: "Server error. Please try again." }
            ]);

        }

        setIsTyping(false);
    };

    // Auto scroll
    useEffect(() => {
        chatRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    return (
        <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 p-2 sm:p-4">

            <div className="w-full max-w-md bg-white border border-gray-200 shadow-2xl rounded-xl flex flex-col h-full sm:h-[585px]">

                {/* Header */}
                <div className="p-4 bg-blue-600 text-white rounded-t-xl font-semibold text-center tracking-wide">
                    My AI Assistant
                </div>

                {/* Chat Area */}
                <div className="flex-1 p-3 sm:p-4 overflow-y-auto scrollbar-hide">

                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`mb-3 flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`px-4 py-2 rounded-lg max-w-[80%] sm:max-w-[70%] text-sm sm:text-base shadow ${msg.type === "user"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-100 text-gray-800"
                                    }`}
                            >
                                {msg.type === "bot" ? (
                                    <BotMessage text={msg.text} />
                                ) : (
                                    msg.text
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && <ChatLoader />}

                    <div ref={chatRef} />
                </div>

                {/* Input Area */}
                <div className="p-3 border-t flex gap-2">

                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        placeholder="Ask me about Sachin Raj..."
                        className="flex-1 border rounded-lg px-3 py-2 text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <button
                        onClick={sendMessage}
                        className="bg-blue-500 hover:bg-blue-600 active:scale-95 text-white px-4 py-2 rounded-lg text-sm sm:text-base transition duration-200"
                    >
                        Send
                    </button>

                    <SpeechInput setMessage={setMessage}/>

                </div>

            </div>

        </div>
    );
}