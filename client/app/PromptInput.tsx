"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Wand2 } from 'lucide-react';

export default function PromptInput() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">
          Describe your presentation
        </label>
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Business presentation with sales statistics data..."
          className="bg-gray-700/50 border-gray-600 focus:border-purple-500 resize-none h-20 text-sm"
        />
      </div>

      <Button
        onClick={handleGenerate}
        disabled={!prompt.trim() || isGenerating}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
      >
        {isGenerating ? (
          <>
            <Wand2 className="w-4 h-4 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 mr-2" />
            Generate Slide
          </>
        )}
      </Button>

      {isGenerating && (
        <div className="space-y-3">
          <div className="h-40 bg-gray-700/30 rounded-lg animate-pulse flex items-center justify-center">
            <div className="text-center">
              <Wand2 className="w-8 h-8 mx-auto mb-2 animate-spin text-purple-500" />
              <p className="text-sm text-gray-400">Creating your presentation...</p>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>
      )}
    </div>
  );
}