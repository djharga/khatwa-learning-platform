'use client';

import { Calculator as CalculatorIcon, X } from 'lucide-react';

/**
 * Individual calculator button with consistent styling
 */
interface CalculatorButtonProps {
  value: string;
  onClick?: () => void;
  className?: string;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({ value, onClick, className }) => (
  <button
    onClick={onClick}
    className={`bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 p-3 rounded font-semibold transition-colors ${className || ''}`}
  >
    {value}
  </button>
);

/**
 * Props for the calculator component
 */
interface CalculatorProps {
  /**
   * Handles the close button click
   */
  onClose: (e: React.MouseEvent) => void;
}

/**
 * Floating calculator overlay for exam use. Displays a basic calculator interface with number pad and operations. Currently non-functional - buttons are for display only. Positioned fixed in top-right corner with close button.
 * TODO: Implement button click handlers for actual calculator functionality
 */
export const Calculator: React.FC<CalculatorProps> = ({ onClose }) => (
  <div className="fixed top-20 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-4 border z-50 w-80">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-bold text-primary flex items-center">
        <CalculatorIcon className="w-5 h-5 ml-2" />
        آلة حاسبة
      </h3>
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        aria-label="إغلاق الآلة الحاسبة"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
    <div className="grid grid-cols-4 gap-2">
      {[
        '7',
        '8',
        '9',
        '/',
        '4',
        '5',
        '6',
        '*',
        '1',
        '2',
        '3',
        '-',
        '0',
        '.',
        '=',
        '+',
      ].map((btn) => (
        <CalculatorButton value={btn} key={btn} />
      ))}
      <button className="bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 p-3 rounded font-semibold transition-colors col-span-2">
        مسح
      </button>
    </div>
  </div>
);

export default Calculator;