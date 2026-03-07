import { useState } from "react";

export default function RestaurantChatbot() {

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMessage = async () => {

        if (!message) return;

        const userMsg = { type: "user", text: message };

        setMessages([...messages, userMsg]);

        const res = await fetch("http://localhost:5000/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        });

        const data = await res.json();

        const botMsg = { type: "bot", text: data.reply };

        setMessages(prev => [...prev, botMsg]);

        setMessage("");
    };

    return (

        <div className="h-screen flex items-center justify-center bg-gray-100">

            <div className="w-[400px] bg-white shadow-xl rounded-xl flex flex-col">

                <div className="p-4 bg-red-500 text-white rounded-t-xl">
                    🍽 Restaurant Assistant
                </div>

                <div className="flex-1 p-4 overflow-y-auto">

                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`mb-3 flex ${msg.type === "user" ? "justify-end" : "justify-start"
                                }`}
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

                </div>

                <div className="p-3 border-t flex gap-2">

                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
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