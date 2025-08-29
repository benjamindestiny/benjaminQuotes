import { useState, useEffect } from "react";
import axios from "axios";
import myPic from "./assets/IMG-20240922-WA0062.jpg";

const Quotes = () => {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "FoCBMYE1NynB5Ci15mxMyg==X8wmDT9IolM6qXwk";

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://api.api-ninjas.com/v1/quotes", {
        headers: {
          "X-Api-Key": API_KEY,
        },
      });
      setQuote(`${res.data[0].quote} — ${res.data[0].author}`);
    } catch (err) {
      console.error("Error fetching quote:", err.response?.data || err.message);
      setQuote("⚠️ Failed to load quote.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="flex items-center gap-12 w-full max-w-6xl">
        {/* Left Side - Profile */}
        <div className="flex flex-col items-center text-center text-white space-y-4">
          <img
            src={myPic}
            className="w-36 mt-0.5 h-37 rounded-full border-4 border-blue-500 shadow-lg object-cover"
          />
          <h2 className="text-2xl font-bold tracking-wide">Benjamin Destiny</h2>
          <p className="text-white/70 text-sm">Web Developer</p>
        </div>

        {/* Right Side - Quotes */}
        <div className="flex-1 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-10 transform transition hover:scale-[1.01] duration-300">
          {/* Header */}
          <h1 className="text-5xl font-bold text-center mb-8 tracking-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Benjamin Quotes
          </h1>

          {/* Quote text */}
          <p className="text-gray-200 text-xl italic text-center leading-relaxed mb-10 transition-opacity duration-500">
            {loading ? "🔄 Fetching Benjamin Quotes..." : quote}
          </p>

          {/* Button */}
          <div className="flex justify-center">
            <button
              onClick={fetchQuote}
              disabled={loading}
              className="px-8 py-3 cursor-pointer rounded-full font-semibold text-lg text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Loading..." : "✨ Get New Quote"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quotes;
