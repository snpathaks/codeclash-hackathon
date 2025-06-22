"use client";

import { useState } from "react";
import PromptInput from "./PromptInput";
import SlideEditor from "./SlideEditor";
import SlidePreview from "./SlidePreview";

export type Slide = {
  title: string;
  content: string;
};

export default function PresentAIHome() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handlePromptSubmit = async (prompt: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/presentai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setSlides(data.slides || []);
      setCurrentSlide(0);
    } catch (error) {
      console.error("Error processing prompt:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-6">PresentAI</h1>
      <PromptInput onSubmit={handlePromptSubmit} isLoading={isLoading} />

      {slides.length > 0 && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SlideEditor
            slides={slides}
            currentIndex={currentSlide}
            onChangeSlide={(newSlides) => setSlides(newSlides)}
          />
          <SlidePreview slides={slides} currentIndex={currentSlide} />
        </div>
      )}
    </main>
  );
}
