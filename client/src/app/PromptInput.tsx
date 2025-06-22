"use client";

import { useState } from "react";

export default function PromptInput({
  onSubmit,
  isLoading,
}: {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}) {
  const [prompt, setPrompt] = useState("");

  return (
    <div>
      <textarea
        placeholder="Describe your topic or idea..."
        className="w-full p-4 rounded-md bg-zinc-800 text-white resize-none"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
      />
      <button
        onClick={() => onSubmit(prompt)}
        disabled={isLoading || prompt.trim().length === 0}
        className="mt-4 px-6 py-2 rounded-md bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-semibold disabled:opacity-50"
      >
        {isLoading ? "Generating..." : "Build Presentation"}
      </button>
    </div>
  );
}
