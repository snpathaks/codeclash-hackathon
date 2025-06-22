"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  MousePointer, 
  Crop, 
  Brush, 
  Type, 
  Square, 
  Eraser, 
  Frame,
  Plus,
  Save,
  Download,
  Undo,
  Redo,
  Image as ImageIcon,
  Upload,
  Sparkles
} from 'lucide-react';
import PromptInput from '@/app/PromptInput';
import SlideEditor from '@/app/SlideEditor';
import SlidePreview from '@/app/SlidePreview';

const tools = [
  { id: 'select', icon: MousePointer, label: 'Select' },
  { id: 'crop', icon: Crop, label: 'Crop' },
  { id: 'brush', icon: Brush, label: 'Brush' },
  { id: 'text', icon: Type, label: 'Text' },
  { id: 'shape', icon: Square, label: 'Shape' },
  { id: 'eraser', icon: Eraser, label: 'Eraser' },
  { id: 'frame', icon: Frame, label: 'Frame' },
];

export default function Home() {
  const [activeTool, setActiveTool] = useState('select');
  const [showAI, setShowAI] = useState(true);
  const [hasImage, setHasImage] = useState(false);

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              presentAi
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="bg-gray-700 border-gray-600 hover:bg-gray-600">
            <Plus className="w-4 h-4 mr-2" />
            New
          </Button>
          <Button variant="outline" size="sm" className="bg-gray-700 border-gray-600 hover:bg-gray-600">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" size="sm" className="bg-gray-700 border-gray-600 hover:bg-gray-600">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Separator orientation="vertical" className="h-6 bg-gray-600" />
          <Button variant="ghost" size="sm" className="hover:bg-gray-700">
            <Undo className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="hover:bg-gray-700">
            <Redo className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Tools */}
        <div className="w-20 bg-gray-800/30 backdrop-blur-sm border-r border-gray-700 flex flex-col items-center py-6 gap-4">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 group relative",
                  activeTool === tool.id
                    ? "bg-blue-500 shadow-lg shadow-blue-500/25"
                    : "hover:bg-gray-700/50"
                )}
                title={tool.label}
              >
                <Icon className="w-5 h-5" />
                <span className="absolute left-16 bg-gray-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {tool.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col bg-gradient-to-br from-gray-900 to-gray-800">
          <SlideEditor hasImage={hasImage} setHasImage={setHasImage} />
        </div>

        {/* Right Sidebar - AI Panel */}
        {showAI && (
          <div className="w-80 bg-gray-800/30 backdrop-blur-sm border-l border-gray-700 flex flex-col">
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <h2 className="font-semibold">AI</h2>
              </div>
              <p className="text-sm text-gray-400">AI Presentation Generation</p>
              <p className="text-xs text-gray-500 mt-1">
                Create presentations from text descriptions using advanced AI
              </p>
            </div>

            <div className="flex-1 p-4">
              <PromptInput />
            </div>

            <div className="p-4 border-t border-gray-700">
              <h3 className="text-sm font-medium mb-3">Quick Inspirations</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors text-sm">
                  Business presentation with sales statistics data
                </button>
                <button className="w-full text-left p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors text-sm">
                  Marketing strategy deck with growth metrics
                </button>
                <button className="w-full text-left p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors text-sm">
                  Product launch presentation with timeline
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}