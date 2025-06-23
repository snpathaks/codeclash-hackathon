import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Upload, 
  Image as ImageIcon, 
  Plus, 
  Sparkles, 
  Type, 
  Square, 
  Circle, 
  X, 
  Edit2,
  Triangle,
  Move,
  List
} from 'lucide-react';
import { Slide, SlideElement } from '@/types/slide';

interface SlideEditorProps {
  hasImage: boolean;
  setHasImage: (value: boolean) => void;
  activeTool: string;
  currentSlide?: Slide;
  onSlideUpdate?: (slide: Slide) => void;
  onToolChange?: (tool: string) => void;
}

export default function SlideEditor({ 
  hasImage, 
  setHasImage, 
  activeTool, 
  currentSlide, 
  onSlideUpdate,
  onToolChange 
}: SlideEditorProps) {
  const [dragActive, setDragActive] = useState(false);
  const [showSlide, setShowSlide] = useState(false);
  const [slideTitle, setSlideTitle] = useState('');
  const [slideNotes, setSlideNotes] = useState('');
  const [editingElement, setEditingElement] = useState<string | null>(null);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const slideRef = useRef<HTMLDivElement>(null);

  // Update local state when currentSlide changes
  useEffect(() => {
    if (currentSlide) {
      setSlideTitle(currentSlide.title);
      setSlideNotes(currentSlide.notes || '');
    }
  }, [currentSlide]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        addElement('image', 100, 100, { imageUrl });
      };
      reader.readAsDataURL(file);
      setHasImage(true);
      setShowSlide(true);
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

  const addElement = (
    type: 'text' | 'image' | 'shape' | 'bulletList', 
    x: number = 100, 
    y: number = 100, 
    extraProps: any = {}
  ) => {
    if (!currentSlide) return;

    let content = 'Click to edit text';
    let width = 200;
    let height = 40;
    let style: any = {};

    switch (type) {
      case 'text':
        content = 'Click to edit text';
        style = { fontSize: '16px', textAlign: 'left', color: '#1f2937' };
        break;
      case 'bulletList':
        content = 'Bullet point 1\nBullet point 2\nBullet point 3';
        height = 80;
        style = { fontSize: '14px', textAlign: 'left', color: '#1f2937', listItems: ['Bullet point 1', 'Bullet point 2', 'Bullet point 3'] };
        break;
      case 'shape':
        content = 'rectangle';
        width = 100;
        height = 100;
        style = { 
          backgroundColor: '#3b82f6', 
          borderRadius: '4px',
          shapeType: 'rectangle'
        };
        break;
      case 'image':
        content = '';
        width = 150;
        height = 150;
        style = { imageUrl: extraProps.imageUrl || '' };
        break;
    }

    const newElement: SlideElement = {
      id: `element_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      content,
      x,
      y,
      width,
      height,
      style: { ...style, ...extraProps }
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
    if (!slideRef.current) return;
    
    const rect = slideRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Deselect element if clicking on empty space
    setSelectedElement(null);

    if (activeTool === 'text') {
      addElement('text', x - 100, y - 20);
      onToolChange?.('select');
    } else if (activeTool === 'shape') {
      addElement('shape', x - 50, y - 50);
      onToolChange?.('select');
    }
  };

  const handleTitleUpdate = (newTitle: string) => {
    setSlideTitle(newTitle);
    updateSlide({ title: newTitle });
  };

  const handleNotesUpdate = (newNotes: string) => {
    setSlideNotes(newNotes);
    updateSlide({ notes: newNotes });
  };

  const handleElementClick = (e: React.MouseEvent, elementId: string) => {
    e.stopPropagation();
    
    if (activeTool === 'eraser') {
      deleteElement(elementId);
      return;
    }
    
    setSelectedElement(elementId);
  };

  const handleElementDoubleClick = (elementId: string) => {
    if (activeTool === 'select') {
      setEditingElement(elementId);
    }
  };

  const handleMouseDown = (e: React.MouseEvent, elementId: string) => {
    if (activeTool === 'select') {
      setDraggedElement(elementId);
      const element = currentSlide?.elements.find(el => el.id === elementId);
      if (element) {
        const rect = slideRef.current?.getBoundingClientRect();
        if (rect) {
          setDragOffset({
            x: e.clientX - rect.left - element.x,
            y: e.clientY - rect.top - element.y
          });
        }
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedElement && slideRef.current) {
      const rect = slideRef.current.getBoundingClientRect();
      const newX = e.clientX - rect.left - dragOffset.x;
      const newY = e.clientY - rect.top - dragOffset.y;
      
      updateElement(draggedElement, { x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setDraggedElement(null);
    setDragOffset({ x: 0, y: 0 });
  };

  const renderShape = (element: SlideElement) => {
    const { shapeType = 'rectangle' } = element.style || {};
    
    if (shapeType === 'circle') {
      return (
        <div 
          className="w-full h-full rounded-full" 
          style={{ backgroundColor: element.style?.backgroundColor || '#3b82f6' }}
        />
      );
    } else if (shapeType === 'triangle') {
      return (
        <div 
          className="w-full h-full flex items-center justify-center"
          style={{ 
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            backgroundColor: element.style?.backgroundColor || '#3b82f6'
          }}
        />
      );
    } else {
      return (
        <div 
          className="w-full h-full" 
          style={{ 
            backgroundColor: element.style?.backgroundColor || '#3b82f6',
            borderRadius: element.style?.borderRadius || '4px'
          }}
        />
      );
    }
  };

  if (hasImage || showSlide) {
    return (
      <div className="flex-1 p-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-5xl h-full flex flex-col items-center justify-center">
          {/* Slide Container */}
          <div 
            ref={slideRef}
            className="relative bg-white rounded-lg shadow-2xl overflow-hidden mb-4" 
            style={{ width: '960px', height: '540px', aspectRatio: '16/9' }}
            onClick={handleSlideClick}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            {/* Slide Content */}
            <div className="w-full h-full p-12 flex flex-col relative">
              {/* Title Area */}
              <div className="mb-8 relative z-10">
                <div className="w-full h-16 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-text hover:border-blue-400 transition-colors">
                  <div className="flex items-center gap-2 text-gray-500 w-full px-4">
                    <Type className="w-5 h-5" />
                    <Input
                      value={slideTitle}
                      onChange={(e) => handleTitleUpdate(e.target.value)}
                      className="border-none bg-transparent text-lg font-semibold text-gray-800 focus:outline-none shadow-none"
                      placeholder="Click to add title"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Elements */}
              {currentSlide?.elements?.map((element) => (
                <div
                  key={element.id}
                  className={`absolute border-2 ${
                    selectedElement === element.id 
                      ? 'border-blue-500 bg-blue-50/20' 
                      : activeTool === 'eraser'
                      ? 'border-red-300 hover:border-red-500 hover:bg-red-50/20'
                      : 'border-transparent hover:border-blue-300'
                  } cursor-pointer transition-all`}
                  style={{
                    left: element.x,
                    top: element.y,
                    width: element.width,
                    height: element.height,
                    zIndex: selectedElement === element.id ? 20 : 10,
                  }}
                  onClick={(e) => handleElementClick(e, element.id)}
                  onDoubleClick={() => handleElementDoubleClick(element.id)}
                  onMouseDown={(e) => handleMouseDown(e, element.id)}
                >
                  {element.type === 'text' && (
                    <div className="w-full h-full flex items-center p-2">
                      {editingElement === element.id ? (
                        <Input
                          value={element.content}
                          onChange={(e) => updateElement(element.id, { content: e.target.value })}
                          onBlur={() => setEditingElement(null)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              setEditingElement(null);
                            }
                            if (e.key === 'Escape') {
                              setEditingElement(null);
                            }
                          }}
                          className="w-full h-full border-none bg-transparent text-gray-800 p-0 shadow-none"
                          style={{ 
                            fontSize: element.style?.fontSize || '16px',
                            textAlign: element.style?.textAlign || 'left',
                            color: element.style?.color || '#1f2937'
                          }}
                          autoFocus
                        />
                      ) : (
                        <span 
                          className="w-full break-words"
                          style={{ 
                            fontSize: element.style?.fontSize || '16px',
                            textAlign: element.style?.textAlign || 'left',
                            color: element.style?.color || '#1f2937'
                          }}
                        >
                          {element.content}
                        </span>
                      )}
                    </div>
                  )}

                  {element.type === 'bulletList' && (
                    <div className="w-full h-full p-2">
                      {editingElement === element.id ? (
                        <Textarea
                          value={element.content}
                          onChange={(e) => updateElement(element.id, { content: e.target.value })}
                          onBlur={() => setEditingElement(null)}
                          className="w-full h-full border-none bg-transparent text-gray-800 p-0 shadow-none resize-none"
                          style={{ 
                            fontSize: element.style?.fontSize || '14px',
                            color: element.style?.color || '#1f2937'
                          }}
                          autoFocus
                        />
                      ) : (
                        <ul className="list-disc list-inside space-y-1">
                          {element.content.split('\n').map((item, index) => (
                            <li 
                              key={index}
                              style={{ 
                                fontSize: element.style?.fontSize || '14px',
                                color: element.style?.color || '#1f2937'
                              }}
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                  
                  {element.type === 'shape' && renderShape(element)}

                  {element.type === 'image' && (
                    <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center overflow-hidden">
                      {element.style?.imageUrl ? (
                        <img 
                          src={element.style.imageUrl} 
                          alt="Slide content" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="w-8 h-8 text-gray-500" />
                      )}
                    </div>
                  )}

                  {/* Element Controls */}
                  {selectedElement === element.id && activeTool === 'select' && (
                    <div className="absolute -top-8 right-0 flex gap-1 z-30">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 bg-blue-500 hover:bg-blue-600 text-white rounded"
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
                        className="h-6 w-6 p-0 bg-red-500 hover:bg-red-600 text-white rounded"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteElement(element.id);
                        }}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  )}

                  {/* Drag Handle */}
                  {selectedElement === element.id && activeTool === 'select' && (
                    <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-500 rounded-full cursor-move z-30">
                      <Move className="w-3 h-3 text-white p-0.5" />
                    </div>
                  )}
                </div>
              ))}

              {/* Default Content Areas (only show if no custom elements) */}
              {(!currentSlide?.elements || currentSlide.elements.length === 0) && (
                <div className="flex-1 grid grid-cols-2 gap-8 relative z-10">
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
                        addElement('bulletList', 500, 350);
                      }}
                    >
                      <div className="flex items-center gap-2 text-gray-500">
                        <List className="w-4 h-4" />
                        <span>Add bullet points</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Slide Number */}
              <div className="absolute bottom-4 right-4 text-xs text-gray-400 bg-white/80 px-2 py-1 rounded z-20">
                Slide {currentSlide?.id || 1}
              </div>

              {/* Tool Instructions */}
              {activeTool !== 'select' && (
                <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded text-sm z-20">
                  {activeTool === 'text' && 'Click to add text'}
                  {activeTool === 'shape' && 'Click to add shape'}
                  {activeTool === 'alignment' && 'Select text to align'}
                  {activeTool === 'crop' && 'Select image to crop'}
                  {activeTool === 'eraser' && 'Click elements to delete'}
                  {activeTool === 'frame' && 'Click to add frame'}
                </div>
              )}
            </div>
          </div>

          {/* Slide Notes */}
          <div className="w-full max-w-5xl">
            <div className="bg-gray-100 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Slide Notes</h3>
              <Textarea
                value={slideNotes}
                onChange={(e) => handleNotesUpdate(e.target.value)}
                placeholder="Add your speaker notes here..."
                className="w-full h-20 bg-white border-gray-300 text-gray-800 text-sm resize-none"
              />
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
            Drop images here, use AI prompts, or start with a blank canvas
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