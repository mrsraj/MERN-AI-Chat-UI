import React, { useState, useRef, useEffect, memo } from "react";

const SpeechInput = memo(({ setMessage }) => {

    const [listening, setListening] = useState(false);

    const recognitionRef = useRef(null);
    const silenceTimeout = useRef(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Speech recognition not supported in this browser");
            return;
        }

        const recognition = new SpeechRecognition();

        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = () => {
            setListening(true);
        };

        recognition.onresult = (event) => {
            clearTimeout(silenceTimeout.current);

            const lastResultIndex = event.results.length - 1;
            const transcript = event.results[lastResultIndex][0].transcript;

            setMessage(transcript);

            silenceTimeout.current = setTimeout(() => {
                recognition.stop();
            }, 2000);
        };

        recognition.onend = () => {
            setListening(false);
        };

        recognition.onerror = (event) => {
            console.error("Error:", event.error);

            if (event.error === "not-allowed") {
                alert("Microphone permission denied");
            }

            setListening(false);
        };

        recognitionRef.current = recognition;

        return () => {
            recognition.stop();
        };
    }, []);

    const handleMic = () => {
        if (!recognitionRef.current) return;

        if (listening) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current.start();
        }
    };

    return (
        <div className="flex justify-center text-center">
            
            {/* Mic Buttons */}
            <div className="flex items-center gap-3 ">
                <button
                    onClick={handleMic}
                    className={`flex items-center justify-center w-9 h-9 rounded-full text-white transition
                    ${listening
                            ? "bg-red-600 animate-pulse"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    🎤
                </button>
            </div>

            {/* Listening Indicator */}
            {listening && (
                <p className="text-sm text-green-500 animate-pulse">
                    🎧 Listening...
                </p>
            )}
        </div>
    );
})

export default SpeechInput;