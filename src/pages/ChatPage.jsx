import { useState, useRef, useEffect } from "react";
import api from "../api/chat.api";

export default function RestaurantChatbot() {

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const chatRef = useRef(null);

    const sendMessage = async () => {

        if (!message.trim()) return;

        const userMsg = { type: "user", text: message };

        // safer state update
        setMessages(prev => [...prev, userMsg]);

        try {

            const data = await api.fetchApi("/api/chat", {
                method: "POST",
                body: JSON.stringify({ message })
            });

            const botMsg = { type: "bot", text: data.reply };

            setMessages(prev => [...prev, botMsg]);

        } catch (error) {

            setMessages(prev => [
                ...prev, { type: "bot", text: "Server error. Please try again." }
            ]);

        }

        setMessage("");
    };

    // auto scroll to bottom
    useEffect(() => {
        chatRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (

        <div className="h-screen flex items-center justify-center bg-gray-100">

            <div className="w-[400px] bg-white shadow-xl rounded-xl flex flex-col h-[600px]">

                <div className="p-4 bg-red-500 text-white rounded-t-xl font-semibold">
                    🍽 Restaurant Assistant
                </div>

                <div className="flex-1 p-4 overflow-y-auto scrollbar-hide">

                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`mb-3 flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`px-4 py-2 rounded-lg max-w-[70%] ${msg.type === "user"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}

                    <div ref={chatRef} />

                </div>

                <div className="p-3 border-t flex gap-2">

                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        placeholder="Ask about menu..."
                        className="flex-1 border rounded-lg px-3 py-2"
                    />

                    <button
                        onClick={sendMessage}
                        className="bg-red-500 text-white px-4 rounded-lg"
                    >
                        Send
                    </button>

                </div>

            </div>

        </div>
    );
}