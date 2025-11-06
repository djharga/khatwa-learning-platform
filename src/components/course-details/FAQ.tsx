'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 lg:p-8 border border-gray-200 dark:border-neutral-700"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
          <HelpCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">أسئلة متكررة</h2>
      </div>

      <div className="space-y-4">
        {items.map((item) => {
          const isExpanded = expandedItems.has(item.id);

          return (
            <div
              key={item.id}
              className="border border-gray-200 dark:border-neutral-600 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-neutral-700/50 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors text-right"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white flex-1">
                  {item.question}
                </h3>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0 mr-3" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 mr-3" />
                )}
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-white dark:bg-neutral-800">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}

