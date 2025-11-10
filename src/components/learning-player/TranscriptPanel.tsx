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

  const parseTranscript = (text: string) => {
    const lines = text.split('\n').filter((l) => l.trim());
    return lines.map((line, i) => {
      const match = line.match(/\[(\d{2}):(\d{2})\]/);
      if (match) {
        const minutes = parseInt(match[1]);
        const seconds = parseInt(match[2]);
        const total = minutes * 60 + seconds;
        return { index: i, time: total, text: line.replace(/\[\d{2}:\d{2}\]\s*/, '') };
      }
      return { index: i, time: 0, text: line };
    });
  };

  const transcriptLines = parseTranscript(transcript);
  const filteredLines = searchQuery
    ? transcriptLines.filter((l) =>
        l.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : transcriptLines;

  useEffect(() => {
    const current = transcriptLines.findIndex(
      (line) =>
        line.time <= currentTime &&
        (transcriptLines[line.index + 1]?.time || Infinity) > currentTime
    );
    if (current >= 0) {
      setHighlightedIndex(current);
      const el = transcriptRef.current?.querySelector(
        `[data-line-index="${current}"]`
      );
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentTime, transcriptLines]);

  if (!transcript)
    return (
      <div className="p-6 text-center">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
          <FileText className="w-6 h-6 text-gray-400" />
        </div>
        <h3 className="text-xs font-semibold text-gray-800 mb-1.5">
          لا يوجد نص مفرغ
        </h3>
        <p className="text-[10px] text-gray-500">
          لم تتم إضافة النص المفرغ لهذا الدرس بعد.
        </p>
      </div>
    );

  const handleLineClick = (time: number) => onSeek?.(time);

  return (
    <div className="h-full flex flex-col bg-white/80 backdrop-blur-md border-l border-white/40">
      {/* Search */}
      <div className="p-4 border-b border-white/40 bg-white/70 backdrop-blur-lg">
        <div className="relative">
          <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث في النص..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-8 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            >
              ✕
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="mt-2 text-[10px] text-gray-500">
            النتائج: {filteredLines.length} من {transcriptLines.length}
          </p>
        )}
      </div>

      {/* Transcript */}
      <div ref={transcriptRef} className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {filteredLines.map((line) => {
            const isHighlighted = line.index === highlightedIndex;
            const isMatch =
              searchQuery &&
              line.text.toLowerCase().includes(searchQuery.toLowerCase());
            return (
              <div
                key={line.index}
                data-line-index={line.index}
                onClick={() => handleLineClick(line.time)}
                className={`group p-2.5 rounded-lg cursor-pointer border transition-all ${
                  isHighlighted
                    ? 'bg-blue-50 border-blue-300 shadow-sm'
                    : 'bg-white border-gray-200 hover:shadow'
                }`}
              >
                {line.time > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLineClick(line.time);
                    }}
                    className={`flex items-center gap-1.5 mb-1 px-1.5 py-0.5 rounded text-[10px] ${
                      isHighlighted
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Play className="w-2.5 h-2.5" />
                    {Math.floor(line.time / 60)}:
                    {(line.time % 60).toString().padStart(2, '0')}
                  </button>
                )}

                <p
                  className={`text-xs leading-relaxed ${
                    isHighlighted
                      ? 'text-gray-900 font-medium'
                      : 'text-gray-700'
                  } ${isMatch ? 'bg-yellow-100 p-1 rounded' : ''}`}
                  dangerouslySetInnerHTML={{
                    __html: isMatch
                      ? line.text.replace(
                          new RegExp(`(${searchQuery})`, 'gi'),
                          '<mark class="bg-yellow-200 px-0.5 rounded">$1</mark>'
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
