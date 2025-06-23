import React from "react";
import { Button } from "@/components/ui/button";
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
  Eraser,
} from "lucide-react";
import { createPortal } from "react-dom";

interface ToolPanelProps {
  activeTool: string;
  onToolChange: (tool: string) => void;
  onAlignmentChange: (alignment: "left" | "center" | "right") => void;
  onShapeChange: (shape: "rectangle" | "circle" | "triangle") => void;
  onColorChange: (color: string) => void;
  selectedElement?: any;
  onTableAdd?: (rows: number, cols: number) => void;
}

export default function ToolPanel({
  activeTool,
  onToolChange,
  onAlignmentChange,
  onShapeChange,
  onColorChange,
  selectedElement,
  onTableAdd,
}: ToolPanelProps) {
  const colors = [
    "#3b82f6",
    "#ef4444",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
    "#06b6d4",
    "#84cc16",
  ];

<<<<<<< Updated upstream
  const [rows, setRows] = React.useState(2);
  const [cols, setCols] = React.useState(2);

  if (activeTool === "alignment") {
    return createPortal(
      <div className="absolute left-24 top-32 bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg z-[1000]">
        <h3 className="text-sm font-medium text-white mb-2">Text Alignment</h3>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-gray-700"
            onClick={() => onAlignmentChange("left")}
          >
            <AlignLeft className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-gray-700"
            onClick={() => onAlignmentChange("center")}
          >
            <AlignCenter className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-gray-700"
            onClick={() => onAlignmentChange("right")}
          >
            <AlignRight className="w-4 h-4" />
          </Button>
        </div>
      </div>,
      document.body
    );
  }

  if (activeTool === "shape") {
    return createPortal(
      <div className="absolute left-24 top-32 bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg z-[1000]">
        <h3 className="text-sm font-medium text-white mb-2">Shapes</h3>
        <div className="grid grid-cols-3 gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-gray-700"
            onClick={() => onShapeChange("rectangle")}
          >
            <Square className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-gray-700"
            onClick={() => onShapeChange("circle")}
          >
            <Circle className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-gray-700"
            onClick={() => onShapeChange("triangle")}
          >
            <Triangle className="w-4 h-4" />
          </Button>
        </div>
        <h4 className="text-xs font-medium text-gray-400 mt-3 mb-2">Colors</h4>
        <div className="grid grid-cols-4 gap-1">
          {colors.map((color) => (
            <button
              key={color}
              className="w-6 h-6 rounded border-2 border-gray-600 hover:border-white transition-colors"
              style={{ backgroundColor: color }}
              onClick={() => onColorChange(color)}
            />
          ))}
        </div>
      </div>,
      document.body
    );
  }

  if (activeTool === "text") {
    return createPortal(
      <div className="absolute left-24 top-32 bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg z-[1000]">
        <h3 className="text-sm font-medium text-white mb-2">Text Options</h3>
        <div className="space-y-2">
          <div className="flex gap-2">
=======
  // Only show the panel for relevant tools
  if (!['alignment', 'shape', 'text', 'crop', 'eraser'].includes(activeTool)) {
    return null;
  }

  return (
    <div
      className="absolute left-1/2 top-8 -translate-x-1/2 z-50 max-w-md w-full bg-gray-900/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 flex flex-col gap-6 border border-gray-800 animate-in fade-in slide-in-from-top duration-200"
      style={{ pointerEvents: 'auto' }}
    >
      {/* Header */}
      <div className="mb-2">
        <h2 className="text-lg font-semibold text-white tracking-tight mb-1">
          {activeTool === 'alignment' && 'Text Alignment'}
          {activeTool === 'shape' && 'Shape Options'}
          {activeTool === 'text' && 'Text Options'}
          {activeTool === 'crop' && 'Crop Tool'}
          {activeTool === 'eraser' && 'Eraser'}
        </h2>
        <p className="text-xs text-gray-400">
          {activeTool === 'alignment' && 'Align your text elements'}
          {activeTool === 'shape' && 'Choose a shape and color'}
          {activeTool === 'text' && 'Customize your text'}
          {activeTool === 'crop' && 'Select an image to crop'}
          {activeTool === 'eraser' && 'Click elements to delete them'}
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-700 mb-2" />

      {/* Tool Controls */}
      {(activeTool === 'alignment' || activeTool === 'text') && (
        <section>
          <h3 className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
            <Type className="w-4 h-4" /> Text Alignment
          </h3>
          <div className="flex gap-3">
>>>>>>> Stashed changes
            <Button
              size="icon"
              variant="ghost"
<<<<<<< Updated upstream
              className="text-white hover:bg-gray-700"
              onClick={() => onAlignmentChange("left")}
=======
              className="text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
              onClick={() => onAlignmentChange('left')}
              aria-label="Align Left"
>>>>>>> Stashed changes
            >
              <AlignLeft className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
<<<<<<< Updated upstream
              className="text-white hover:bg-gray-700"
              onClick={() => onAlignmentChange("center")}
=======
              className="text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
              onClick={() => onAlignmentChange('center')}
              aria-label="Align Center"
>>>>>>> Stashed changes
            >
              <AlignCenter className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
<<<<<<< Updated upstream
              className="text-white hover:bg-gray-700"
              onClick={() => onAlignmentChange("right")}
=======
              className="text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
              onClick={() => onAlignmentChange('right')}
              aria-label="Align Right"
>>>>>>> Stashed changes
            >
              <AlignRight className="w-5 h-5" />
            </Button>
          </div>
<<<<<<< Updated upstream
          <div className="grid grid-cols-4 gap-1">
            {colors.map((color) => (
=======
        </section>
      )}

      {activeTool === 'shape' && (
        <section>
          <h3 className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
            <Square className="w-4 h-4" /> Shape
          </h3>
          <div className="flex gap-3 mb-4">
            <Button
              size="icon"
              variant="ghost"
              className="text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
              onClick={() => onShapeChange('rectangle')}
              aria-label="Rectangle"
            >
              <Square className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
              onClick={() => onShapeChange('circle')}
              aria-label="Circle"
            >
              <Circle className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
              onClick={() => onShapeChange('triangle')}
              aria-label="Triangle"
            >
              <Triangle className="w-5 h-5" />
            </Button>
          </div>
          <h4 className="text-xs font-medium text-gray-400 mb-2 flex items-center gap-1">
            <Palette className="w-3 h-3" /> Color
          </h4>
          <div className="flex flex-wrap gap-2">
            {colors.map(color => (
>>>>>>> Stashed changes
              <button
                key={color}
                className="w-7 h-7 rounded-full border-2 border-gray-700 hover:border-blue-400 focus:ring-2 focus:ring-blue-400 transition-colors"
                style={{ backgroundColor: color }}
                onClick={() => onColorChange(color)}
                aria-label={`Color ${color}`}
              />
            ))}
          </div>
<<<<<<< Updated upstream
        </div>
      </div>,
      document.body
    );
  }

  if (activeTool === "crop") {
    return createPortal(
      <div className="absolute left-24 top-32 bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg z-[1000]">
        <h3 className="text-sm font-medium text-white mb-2">Crop Tool</h3>
        <p className="text-xs text-gray-400 mb-2">Select an image to crop</p>
        <Button
          size="sm"
          variant="outline"
          className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
          onClick={() => onToolChange("select")}
        >
          Cancel
        </Button>
      </div>,
      document.body
    );
  }

  if (activeTool === "eraser") {
    return createPortal(
      <div className="absolute left-24 top-32 bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg z-[1000]">
        <h3 className="text-sm font-medium text-white mb-2">Eraser</h3>
        <p className="text-xs text-gray-400 mb-2">
          Click elements to delete them
        </p>
        <Button
          size="sm"
          variant="outline"
          className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
          onClick={() => onToolChange("select")}
        >
          Done
        </Button>
      </div>,
      document.body
    );
  }

  if (activeTool === "table") {
    return createPortal(
      <div className="absolute left-24 top-32 bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg z-[1000]">
        <h3 className="text-sm font-medium text-white mb-2">Insert Table</h3>
        <div className="flex gap-2 mb-2">
          <input
            type="number"
            min={1}
            max={10}
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
            className="w-16 px-2 py-1 rounded bg-gray-700 text-white border border-gray-600"
            placeholder="Rows"
          />
          <span className="text-white">x</span>
          <input
            type="number"
            min={1}
            max={10}
            value={cols}
            onChange={(e) => setCols(Number(e.target.value))}
            className="w-16 px-2 py-1 rounded bg-gray-700 text-white border border-gray-600"
            placeholder="Columns"
          />
        </div>
        <Button
          size="sm"
          variant="outline"
          className="bg-blue-600 border-blue-500 text-white hover:bg-blue-500"
          onClick={() => {
            onTableAdd?.(rows, cols);
            onToolChange("select");
          }}
        >
          Add Table
        </Button>
      </div>,
      document.body
    );
  }

  return null;
}
=======
        </section>
      )}

      {activeTool === 'text' && (
        <section>
          <h4 className="text-xs font-medium text-gray-400 mb-2 flex items-center gap-1">
            <Palette className="w-3 h-3" /> Text Color
          </h4>
          <div className="flex flex-wrap gap-2">
            {colors.map(color => (
              <button
                key={color}
                className="w-7 h-7 rounded-full border-2 border-gray-700 hover:border-blue-400 focus:ring-2 focus:ring-blue-400 transition-colors"
                style={{ backgroundColor: color }}
                onClick={() => onColorChange(color)}
                aria-label={`Color ${color}`}
              />
            ))}
          </div>
        </section>
      )}

      {activeTool === 'crop' && (
        <section>
          <Button
            size="sm"
            variant="outline"
            className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600 mt-2"
            onClick={() => onToolChange('select')}
          >
            Cancel
          </Button>
        </section>
      )}

      {activeTool === 'eraser' && (
        <section>
          <Button
            size="sm"
            variant="outline"
            className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600 mt-2"
            onClick={() => onToolChange('select')}
          >
            Done
          </Button>
        </section>
      )}
    </div>
  );
}
>>>>>>> Stashed changes
