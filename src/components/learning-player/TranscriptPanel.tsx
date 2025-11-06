'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Play } from 'lucide-react';

interface TranscriptPanelProps {
  transcript: string;
  lessonId: string;
  currentTime?: number;
  onSeek?: (time: number) => void;
}

export default function TranscriptPanel({
  transcript,
  lessonId,
  currentTime = 0,
  onSeek,
}: TranscriptPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const transcriptRef = useRef<HTMLDivElement>(null);

  // Parse transcript into lines with timestamps
  const parseTranscript = (text: string) => {
    // Format: [00:12] Text here
    const lines = text.split('\n').filter(line => line.trim());
    return lines.map((line, index) => {
      const timestampMatch = line.match(/\[(\d{2}):(\d{2})\]/);
      if (timestampMatch) {
        const minutes = parseInt(timestampMatch[1]);
        const seconds = parseInt(timestampMatch[2]);
        const timeInSeconds = minutes * 60 + seconds;
        const text = line.replace(/\[\d{2}:\d{2}\]\s*/, '');
        return { time: timeInSeconds, text, index };
      }
      return { time: 0, text: line, index };
    });
  };

  const transcriptLines = parseTranscript(transcript);
  const filteredLines = searchQuery
    ? transcriptLines.filter(line => line.text.toLowerCase().includes(searchQuery.toLowerCase()))
    : transcriptLines;

  // Find current line based on time
  useEffect(() => {
    const currentLine = transcriptLines.findIndex(
      line => line.time <= currentTime && (transcriptLines[line.index + 1]?.time || Infinity) > currentTime
    );
    if (currentLine >= 0) {
      setHighlightedIndex(currentLine);
      // Scroll to current line
      const element = transcriptRef.current?.querySelector(`[data-line-index="${currentLine}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentTime, transcriptLines]);

  const handleLineClick = (time: number) => {
    onSeek?.(time);
  };

  if (!transcript) {
    return (
      <div className="p-6 text-center text-gray-400">
        <p>لا يوجد نص مفرغ متاح لهذا الدرس.</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Search */}
      <div className="p-4 border-b border-gray-700">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث في النص المفرغ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Transcript Content */}
      <div ref={transcriptRef} className="flex-1 overflow-y-auto p-6">
        <div className="space-y-3">
          {filteredLines.map((line) => {
            const isHighlighted = line.index === highlightedIndex;
            const isSearchMatch = searchQuery && line.text.toLowerCase().includes(searchQuery.toLowerCase());

            return (
              <div
                key={line.index}
                data-line-index={line.index}
                onClick={() => handleLineClick(line.time)}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  isHighlighted
                    ? 'bg-blue-600/20 border-2 border-blue-600'
                    : 'bg-gray-800 hover:bg-gray-700 border-2 border-transparent'
                }`}
              >
                {line.time > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLineClick(line.time);
                    }}
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-2 text-sm font-medium"
                  >
                    <Play className="w-4 h-4" />
                    {Math.floor(line.time / 60)}:{(line.time % 60).toString().padStart(2, '0')}
                  </button>
                )}
                <p
                  className={`text-gray-300 leading-relaxed ${
                    isHighlighted ? 'font-medium' : ''
                  } ${isSearchMatch ? 'bg-yellow-500/20' : ''}`}
                  dangerouslySetInnerHTML={{
                    __html: isSearchMatch
                      ? line.text.replace(
                          new RegExp(`(${searchQuery})`, 'gi'),
                          '<mark class="bg-yellow-500/50">$1</mark>'
                        )
                      : line.text,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

