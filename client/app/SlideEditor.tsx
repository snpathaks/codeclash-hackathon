"use client";

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Upload, Image as ImageIcon, Plus, Sparkles, Type, Square, Circle } from 'lucide-react';

interface SlideEditorProps {
  hasImage: boolean;
  setHasImage: (value: boolean) => void;
}

export default function SlideEditor({ hasImage, setHasImage }: SlideEditorProps) {
  const [dragActive, setDragActive] = useState(false);
  const [showSlide, setShowSlide] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setHasImage(true);
      // Handle file upload logic here
    }
  }, [setHasImage]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: false,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
  });

  const handleStartBlankCanvas = () => {
    setShowSlide(true);
    setHasImage(true);
  };

  if (hasImage || showSlide) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="w-full max-w-5xl h-full flex items-center justify-center">
          {/* Slide Container */}
          <div className="relative bg-white rounded-lg shadow-2xl" style={{ width: '960px', height: '540px', aspectRatio: '16/9' }}>
            {/* Slide Content */}
            <div className="w-full h-full p-12 flex flex-col">
              {/* Title Area */}
              <div className="mb-8">
                <div className="w-full h-16 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-text hover:border-blue-400 transition-colors">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Type className="w-5 h-5" />
                    <span className="text-lg">Click to add title</span>
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 grid grid-cols-2 gap-8">
                {/* Left Content */}
                <div className="space-y-4">
                  <div className="h-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-text hover:border-blue-400 transition-colors">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Type className="w-4 h-4" />
                      <span>Add content</span>
                    </div>
                  </div>
                  <div className="h-20 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-text hover:border-blue-400 transition-colors">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Square className="w-4 h-4" />
                      <span>Add element</span>
                    </div>
                  </div>
                </div>

                {/* Right Content */}
                <div className="space-y-4">
                  <div className="h-40 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-blue-400 transition-colors">
                    <div className="flex flex-col items-center gap-2 text-gray-500">
                      <ImageIcon className="w-8 h-8" />
                      <span>Add image or chart</span>
                    </div>
                  </div>
                  <div className="h-12 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-text hover:border-blue-400 transition-colors">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Circle className="w-4 h-4" />
                      <span>Add bullet point</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer/Notes Area */}
              <div className="mt-8">
                <div className="w-full h-8 bg-gray-50 rounded border border-gray-200 flex items-center px-3">
                  <span className="text-xs text-gray-400">Slide notes (optional)</span>
                </div>
              </div>
            </div>

            {/* Slide Number */}
            <div className="absolute bottom-4 right-4 text-xs text-gray-400 bg-white/80 px-2 py-1 rounded">
              Slide 1
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200
            ${isDragActive || dragActive
              ? 'border-blue-500 bg-blue-500/10'
              : 'border-gray-600 hover:border-gray-500'
            }
          `}
        >
          <input {...getInputProps()} />
          
          <div className="w-12 h-12 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-orange-400" />
          </div>

          <h3 className="text-xl font-semibold mb-2 text-white">
            Start Your Presentation
          </h3>
          
          <p className="text-gray-400 mb-8">
            Click here to type or use the AI prompt on the right
          </p>

          <Button 
            variant="outline" 
            className="bg-gray-700 border-gray-600 hover:bg-gray-600 mb-4"
          >
            <Upload className="w-4 h-4 mr-2" />
            Browse files
          </Button>

          <p className="text-xs text-gray-500 mb-8">
            JPEG, PNG, GIF, WebP up to 50MB
          </p>

          <div className="flex items-center justify-center">
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          <Button
            onClick={handleStartBlankCanvas}
            variant="ghost"
            className="mt-6 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
          >
            <Plus className="w-4 h-4 mr-2" />
            Start with Blank Canvas
          </Button>
        </div>
      </div>
    </div>
  );
}