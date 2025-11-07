'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Play, FileText } from 'lucide-react';

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
      <div className="p-5 text-center">
        <div className="w-12 h-12 bg-gray-100 dark:bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-3">
          <FileText className="w-6 h-6 text-gray-400 dark:text-gray-600" />
        </div>
        <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-300 mb-1.5">لا يوجد نص مفرغ</h3>
        <p className="text-gray-600 dark:text-gray-400 text-[10px]">لم يتم إضافة النص المفرغ لهذا الدرس بعد.</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Search */}
      <div className="p-4 border-b border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-800/50">
        <div className="relative">
          <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث في النص المفرغ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-8 py-1.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              ✕
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="mt-2 text-[10px] text-gray-600 dark:text-gray-400">
            النتائج: {filteredLines.length} من {transcriptLines.length}
          </p>
        )}
      </div>

      {/* Transcript Content */}
      <div ref={transcriptRef} className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {filteredLines.map((line) => {
            const isHighlighted = line.index === highlightedIndex;
            const isSearchMatch = searchQuery && line.text.toLowerCase().includes(searchQuery.toLowerCase());

            return (
              <div
                key={line.index}
                data-line-index={line.index}
                onClick={() => handleLineClick(line.time)}
                className={`group relative p-2.5 rounded-lg cursor-pointer transition-all border ${
                  isHighlighted
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700 shadow-md'
                    : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:shadow-md'
                }`}
              >
                {/* Timestamp badge */}
                {line.time > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLineClick(line.time);
                    }}
                    className={`flex items-center gap-1.5 mb-1.5 px-1.5 py-0.5 rounded text-[10px] font-medium transition-all ${
                      isHighlighted
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    <Play className="w-2.5 h-2.5" />
                    {Math.floor(line.time / 60)}:{(line.time % 60).toString().padStart(2, '0')}
                  </button>
                )}
                
                {/* Text content */}
                <p
                  className={`text-xs leading-relaxed ${
                    isHighlighted ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-700 dark:text-gray-300'
                  } ${isSearchMatch ? 'bg-amber-100 dark:bg-amber-900/20 p-1.5 rounded' : ''}`}
                  dangerouslySetInnerHTML={{
                    __html: isSearchMatch
                      ? line.text.replace(
                          new RegExp(`(${searchQuery})`, 'gi'),
                          '<mark class="bg-amber-300 dark:bg-amber-700 px-0.5 rounded">$1</mark>'
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

