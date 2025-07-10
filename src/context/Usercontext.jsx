import React, { createContext, useState } from "react";
import run from "../Api"; // AI API function

const DataContext = createContext();

function UserContextProvider({ children }) {
    const [transcript, setTranscript] = useState(""); // User's speech input
    const [responseText, setResponseText] = useState(""); // AI response text
    const [aiSpeaking, setAiSpeaking] = useState(false);
    const [speaking, setspeaking] = useState(false); // ✅ Add this line

    // Function to get AI response and store it
    const airesponse = async (prompt) => {
        try {
            let text = await run(prompt); // Call AI API
            console.log("🤖 AI Response:", text);
            setResponseText(text); // Store AI response
            speak(text); // Speak response
        } catch (error) {
            console.error("❌ AI Error:", error);
        }
    };

    const speak = (text) => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";

        setAiSpeaking(true); // ✅ Start speaking animation
        setspeaking(false);  // ✅ Reset user speaking

        utterance.onend = () => {
            setAiSpeaking(false); // ✅ End animation
        };

        synth.speak(utterance);
    };

    const startSpeechRecognition = () => {
        if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
            console.error("❌ Speech Recognition API not supported in this browser.");
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = (event) => {
            let transcriptText = event.results[0][0].transcript;
            console.log("🎤 Recognized:", transcriptText);
            setTranscript(transcriptText);
            airesponse(transcriptText);
        };

        recognition.onerror = (event) => {
            console.error("❌ Speech recognition error:", event.error);
        };

        recognition.onend = () => {
            setspeaking(false); // ✅ Stop speaking state when done
        };

        setspeaking(true); // ✅ Set speaking state to true
        recognition.start();
    };

    return (
        <DataContext.Provider value={{
            transcript,
            responseText,
            aiSpeaking,
            speaking,
            setspeaking,
            startSpeechRecognition
        }}>
            {children}
        </DataContext.Provider>
    );
}

export default UserContextProvider;
export { DataContext };
