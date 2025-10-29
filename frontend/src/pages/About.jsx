
import React from "react";
import { Sparkles } from "lucide-react";

export default function About() {
 return (

<div className="min-h-screen bg-linear-to-b from-sky-50 via-white to-slate-100 text-gray-900 flex flex-col items-center justify-center px-6 py-12"> <div className="max-w-3xl text-center space-y-6 border border-sky-100 bg-white/80 rounded-2xl shadow-[0_4px_20px_rgba(56,189,248,0.1)] p-8 backdrop-blur-sm"> <div className="flex justify-center mb-4"> <Sparkles className="text-sky-500 w-10 h-10 animate-pulse" /> </div>

          <h1 className="text-3xl font-bold text-sky-700">
    About <span className="text-sky-500">VibeCommerce</span>
  </h1>

  <p className="text-gray-700 text-lg leading-relaxed">
    Welcome to{" "}
    <span className="text-sky-600 font-semibold">VibeCommerce</span> — your
    go-to destination for stylish apparel and lifestyle essentials. We blend
    creativity, comfort, and sustainability to craft a shopping experience
    that's refreshing, effortless, and inspiring.
  </p>

  <p className="text-gray-600 text-base leading-relaxed">
    At{" "}
    <span className="text-sky-600 font-semibold">VibeCommerce</span>, our
    motto is{" "}
    <span className="text-sky-700 font-medium">
      “Shop the Vibe, Live the Trend.”
    </span>{" "}
    We're more than just an e-commerce brand — we're a movement to celebrate
    individuality, mindful fashion, and modern living. Every collection we
    curate reflects sustainability, comfort, and self-expression.
  </p>

  <p className="text-gray-600 text-base leading-relaxed">
    Whether you're upgrading your wardrobe or discovering your next favorite
    style, we're here to make your journey memorable — one vibe at a time.
    💫
  </p>

  <div className="pt-6">
    <button
      onClick={() => window.history.back()}
      className="bg-linear-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-500 transition-all duration-300 text-white px-6 py-2 rounded-lg shadow-[0_0_15px_rgba(56,189,248,0.3)]"
    >
      Back to Shopping
    </button>
  </div>
</div>

    </div>
  );
}
