import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Square, 
  Circle, 
  Triangle,
  Palette,
  Type,
  Crop,
  Eraser
} from 'lucide-react';

interface ToolPanelProps {
  activeTool: string;
  onToolChange: (tool: string) => void;
  onAlignmentChange: (alignment: 'left' | 'center' | 'right') => void;
  onShapeChange: (shape: 'rectangle' | 'circle' | 'triangle') => void;
  onColorChange: (color: string) => void;
  selectedElement?: any;
}

export default function ToolPanel({ 
  activeTool, 
  onToolChange, 
  onAlignmentChange, 
  onShapeChange, 
  onColorChange,
  selectedElement 
}: ToolPanelProps) {
  const colors = [
    '#3b82f6', '#ef4444', '#10b981', '#f59e0b', 
    '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'
  ];

  if (activeTool === 'alignment') {
    return (
      <div className="absolute left-24 top-6 bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg z-50">
        <h3 className="text-sm font-medium text-white mb-2">Text Alignment</h3>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-gray-700"
            onClick={() => onAlignmentChange('left')}
          >
            <AlignLeft className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-gray-700"
            onClick={() => onAlignmentChange('center')}
          >
            <AlignCenter className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-gray-700"
            onClick={() => onAlignmentChange('right')}
          >
            <AlignRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  if (activeTool === 'shape') {
    return (
      <div className="absolute left-24 top-6 bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg z-50">
        <h3 className="text-sm font-medium text-white mb-2">Shapes</h3>
        <div className="grid grid-cols-3 gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-gray-700"
            onClick={() => onShapeChange('rectangle')}
          >
            <Square className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-gray-700"
            onClick={() => onShapeChange('circle')}
          >
            <Circle className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-gray-700"
            onClick={() => onShapeChange('triangle')}
          >
            <Triangle className="w-4 h-4" />
          </Button>
        </div>
        <h4 className="text-xs font-medium text-gray-400 mt-3 mb-2">Colors</h4>
        <div className="grid grid-cols-4 gap-1">
          {colors.map(color => (
            <button
              key={color}
              className="w-6 h-6 rounded border-2 border-gray-600 hover:border-white transition-colors"
              style={{ backgroundColor: color }}
              onClick={() => onColorChange(color)}
            />
          ))}
        </div>
      </div>
    );
  }

  if (activeTool === 'text') {
    return (
      <div className="absolute left-24 top-6 bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg z-50">
        <h3 className="text-sm font-medium text-white mb-2">Text Options</h3>
        <div className="space-y-2">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-gray-700"
              onClick={() => onAlignmentChange('left')}
            >
              <AlignLeft className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-gray-700"
              onClick={() => onAlignmentChange('center')}
            >
              <AlignCenter className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-gray-700"
              onClick={() => onAlignmentChange('right')}
            >
              <AlignRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-1">
            {colors.map(color => (
              <button
                key={color}
                className="w-6 h-6 rounded border-2 border-gray-600 hover:border-white transition-colors"
                style={{ backgroundColor: color }}
                onClick={() => onColorChange(color)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeTool === 'crop') {
    return (
      <div className="absolute left-24 top-6 bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg z-50">
        <h3 className="text-sm font-medium text-white mb-2">Crop Tool</h3>
        <p className="text-xs text-gray-400 mb-2">Select an image to crop</p>
        <Button
          size="sm"
          variant="outline"
          className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
          onClick={() => onToolChange('select')}
        >
          Cancel
        </Button>
      </div>
    );
  }

  if (activeTool === 'eraser') {
    return (
      <div className="absolute left-24 top-6 bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg z-50">
        <h3 className="text-sm font-medium text-white mb-2">Eraser</h3>
        <p className="text-xs text-gray-400 mb-2">Click elements to delete them</p>
        <Button
          size="sm"
          variant="outline"
          className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
          onClick={() => onToolChange('select')}
        >
          Done
        </Button>
      </div>
    );
  }

  return null;
}