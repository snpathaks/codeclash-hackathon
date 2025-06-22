"use client";

import { Slide } from "./page";

export default function SlideEditor({
  slides,
  currentIndex,
  onChangeSlide,
}: {
  slides: Slide[];
  currentIndex: number;
  onChangeSlide: (slides: Slide[]) => void;
}) {
  if (!slides.length) return <div>No slides to edit</div>;

  const update = (field: keyof Slide, value: string) => {
    const newSlides = [...slides];
    newSlides[currentIndex][field] = value;
    onChangeSlide(newSlides);
  };

  return (
    <div className="p-4 bg-zinc-800 rounded-md h-full">
      <h2 className="text-lg font-semibold mb-4">Edit Slide</h2>
      <input
        className="w-full mb-3 p-2 rounded-md bg-zinc-700 text-white"
        value={slides[currentIndex].title}
        onChange={(e) => update("title", e.target.value)}
        placeholder="Slide Title"
      />
      <textarea
        className="w-full p-2 rounded-md bg-zinc-700 text-white resize-none"
        rows={6}
        value={slides[currentIndex].content}
        onChange={(e) => update("content", e.target.value)}
        placeholder="Slide Content"
      />
    </div>
  );
<<<<<<< Updated upstream
}
=======
}
>>>>>>> Stashed changes
