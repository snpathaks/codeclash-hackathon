"use client";

import { Button } from '@/components/ui/button';
import { Eye, Download, Share2 } from 'lucide-react';

export default function SlidePreview() {
  return (
    <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Eye className="w-4 h-4" />
          Preview
        </h3>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" className="hover:bg-gray-700">
            <Download className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" className="hover:bg-gray-700">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="aspect-video bg-gray-700/50 rounded border-2 border-dashed border-gray-600 flex items-center justify-center">
        <div className="text-center">
          <Eye className="w-8 h-8 text-gray-500 mx-auto mb-2" />
          <p className="text-sm text-gray-500">Preview will appear here</p>
        </div>
      </div>
    </div>
  );
}