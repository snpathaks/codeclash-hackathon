"use client";

import { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, Image as ImageIcon, Plus, Sparkles, Type, Square, Circle, X, Edit2 } from 'lucide-react';

interface SlideElement {
  id: string;
  type: 'text' | 'image' | 'shape';
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  style?: any;
}

interface Slide {
  id: number;
  title: string;
  content: string;
  elements: SlideElement[];
}

interface SlideEditorProps {
  hasImage: boolean;
  setHasImage: (value: boolean) => void;
  activeTool: string;
  currentSlide?: Slide;
  onSlideUpdate?: (slide: Slide) => void;
}

export default function SlideEditor({ hasImage, setHasImage, activeTool, currentSlide, onSlideUpdate }: SlideEditorProps) {
  const [dragActive, setDragActive] = useState(false);
  const [showSlide, setShowSlide] = useState(false);
  const [slideTitle, setSlideTitle] = useState(currentSlide?.title || 'Untitled Slide');
  const [editingElement, setEditingElement] = useState<string | null>(null);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const slideRef = useRef<HTMLDivElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setHasImage(true);
      setShowSlide(true);
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

  const updateSlide = (updates: Partial<Slide>) => {
    if (currentSlide && onSlideUpdate) {
      onSlideUpdate({ ...currentSlide, ...updates });
    }
  };

  const addElement = (type: 'text' | 'image' | 'shape', x: number = 100, y: number = 100) => {
    if (!currentSlide) return;

    const newElement: SlideElement = {
      id: `element_${Date.now()}`,
      type,
      content: type === 'text' ? 'Click to edit text' : type === 'shape' ? 'rectangle' : '',
      x,
      y,
      width: type === 'text' ? 200 : 100,
      height: type === 'text' ? 40 : 100,
      style: type === 'shape' ? { backgroundColor: '#3b82f6' } : {}
    };

    updateSlide({
      elements: [...(currentSlide.elements || []), newElement]
    });
  };

  const updateElement = (elementId: string, updates: Partial<SlideElement>) => {
    if (!currentSlide) return;

    updateSlide({
      elements: currentSlide.elements.map(el => 
        el.id === elementId ? { ...el, ...updates } : el
      )
    });
  };

  const deleteElement = (elementId: string) => {
    if (!currentSlide) return;

    updateSlide({
      elements: currentSlide.elements.filter(el => el.id !== elementId)
    });
    setSelectedElement(null);
  };

  const handleSlideClick = (e: React.MouseEvent) => {
    if (activeTool === 'text') {
      const rect = slideRef.current?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        addElement('text', x, y);
      }
    } else if (activeTool === 'shape') {
      const rect = slideRef.current?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        addElement('shape', x, y);
      }
    }
  };

  const handleTitleUpdate = (newTitle: string) => {
    setSlideTitle(newTitle);
    updateSlide({ title: newTitle });
  };

  if (hasImage || showSlide) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="w-full max-w-5xl h-full flex items-center justify-center">
          {/* Slide Container */}
          <div 
            ref={slideRef}
            className="relative bg-white rounded-lg shadow-2xl cursor-crosshair" 
            style={{ width: '960px', height: '540px', aspectRatio: '16/9' }}
            onClick={handleSlideClick}
          >
            {/* Slide Content */}
            <div className="w-full h-full p-12 flex flex-col">
              {/* Title Area */}
              <div className="mb-8">
                <div className="w-full h-16 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-text hover:border-blue-400 transition-colors">
                  <div className="flex items-center gap-2 text-gray-500 w-full px-4">
                    <Type className="w-5 h-5" />
                    <Input
                      value={slideTitle}
                      onChange={(e) => handleTitleUpdate(e.target.value)}
                      className="border-none bg-transparent text-lg font-semibold text-gray-800 focus:outline-none"
                      placeholder="Click to add title"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Elements */}
              {currentSlide?.elements?.map((element) => (
                <div
                  key={element.id}
                  className={`absolute border-2 ${selectedElement === element.id ? 'border-blue-500' : 'border-transparent'} hover:border-blue-300 cursor-pointer`}
                  style={{
                    left: element.x,
                    top: element.y,
                    width: element.width,
                    height: element.height,
                    ...element.style
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedElement(element.id);
                  }}
                >
                  {element.type === 'text' && (
                    <div className="w-full h-full flex items-center">
                      {editingElement === element.id ? (
                        <Input
                          value={element.content}
                          onChange={(e) => updateElement(element.id, { content: e.target.value })}
                          onBlur={() => setEditingElement(null)}
                          onKeyDown={(e) => e.key === 'Enter' && setEditingElement(null)}
                          className="w-full h-full border-none bg-transparent text-gray-800"
                          autoFocus
                        />
                      ) : (
                        <span 
                          className="text-gray-800 w-full"
                          onDoubleClick={() => setEditingElement(element.id)}
                        >
                          {element.content}
                        </span>
                      )}
                    </div>
                  )}
                  
                  {element.type === 'shape' && (
                    <div className="w-full h-full rounded" style={element.style}></div>
                  )}

                  {element.type === 'image' && (
                    <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-gray-500" />
                    </div>
                  )}

                  {/* Element Controls */}
                  {selectedElement === element.id && (
                    <div className="absolute -top-8 right-0 flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 bg-blue-500 hover:bg-blue-600 text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingElement(element.id);
                        }}
                      >
                        <Edit2 className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 bg-red-500 hover:bg-red-600 text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteElement(element.id);
                        }}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}

              {/* Default Content Areas (only show if no custom elements) */}
              {(!currentSlide?.elements || currentSlide.elements.length === 0) && (
                <div className="flex-1 grid grid-cols-2 gap-8">
                  {/* Left Content */}
                  <div className="space-y-4">
                    <div 
                      className="h-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-text hover:border-blue-400 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        addElement('text', 50, 150);
                      }}
                    >
                      <div className="flex items-center gap-2 text-gray-500">
                        <Type className="w-4 h-4" />
                        <span>Add content</span>
                      </div>
                    </div>
                    <div 
                      className="h-20 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-blue-400 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        addElement('shape', 50, 300);
                      }}
                    >
                      <div className="flex items-center gap-2 text-gray-500">
                        <Square className="w-4 h-4" />
                        <span>Add element</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Content */}
                  <div className="space-y-4">
                    <div 
                      className="h-40 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-blue-400 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        addElement('image', 500, 150);
                      }}
                    >
                      <div className="flex flex-col items-center gap-2 text-gray-500">
                        <ImageIcon className="w-8 h-8" />
                        <span>Add image or chart</span>
                      </div>
                    </div>
                    <div 
                      className="h-12 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-text hover:border-blue-400 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        addElement('text', 500, 350);
                      }}
                    >
                      <div className="flex items-center gap-2 text-gray-500">
                        <Circle className="w-4 h-4" />
                        <span>Add bullet point</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Footer/Notes Area */}
              <div className="mt-8">
                <div className="w-full h-8 bg-gray-50 rounded border border-gray-200 flex items-center px-3">
                  <span className="text-xs text-gray-400">Slide notes (optional)</span>
                </div>
              </div>
            </div>

            {/* Slide Number */}
            <div className="absolute bottom-4 right-4 text-xs text-gray-400 bg-white/80 px-2 py-1 rounded">
              Slide {currentSlide?.id || 1}
            </div>

            {/* Tool Instructions */}
            {activeTool !== 'select' && (
              <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded text-sm">
                {activeTool === 'text' && 'Click to add text'}
                {activeTool === 'shape' && 'Click to add shape'}
                {activeTool === 'brush' && 'Draw on the slide'}
                {activeTool === 'crop' && 'Select area to crop'}
              </div>
            )}
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