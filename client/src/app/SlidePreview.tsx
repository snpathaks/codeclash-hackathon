"use client";

import { Slide } from "./page";

export default function SlidePreview({
  slides,
  currentIndex,
}: {
  slides: Slide[];
  currentIndex: number;
}) {
  if (!slides.length) return <div>No slides to preview</div>;

  const slide = slides[currentIndex];

  return (
    <div className="p-4 bg-zinc-800 rounded-md h-full">
      <h2 className="text-lg font-semibold mb-4">Preview</h2>
      <div className="bg-white text-black p-6 rounded shadow">
        <h3 className="text-xl font-bold mb-2">{slide.title}</h3>
        <p className="text-sm whitespace-pre-line">{slide.content}</p>
      </div>
    </div>
  );
}

