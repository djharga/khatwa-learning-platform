'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Table as TableIcon } from 'lucide-react';

/**
 * Academic Table Component - from agent.md
 * Container: Background #FFFFFF, Border 1px #E5E7EB, Border-radius 14px, elevation-2
 * Header: Background #F7F8FC, Padding space-4, Font 14px semibold, Color #6B7280, uppercase
 * Row: Padding space-4, Border-bottom 1px #F3F4F6, Hover #F9FAFB
 * Cell: Font 16px regular, Color #111827, Padding space-4
 */

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-hidden rounded-[14px] border border-[#E5E7EB] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
    <div className="overflow-x-auto">
      <table
        ref={ref}
        className={cn('w-full caption-bottom text-base', className)}
        {...props}
      />
    </div>
  </div>
));

Table.displayName = 'Table';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      'bg-[#F7F8FC] border-b-2 border-[#E5E7EB] sticky top-0 z-10',
      className
    )}
    {...props}
  />
));

TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('[&_tr:last-child]:border-0', className)}
    {...props}
  />
));

TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn('bg-[#F7F8FC] border-t-2 border-[#E5E7EB] font-medium', className)}
    {...props}
  />
));

TableFooter.displayName = 'TableFooter';

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  initial?: any;
  animate?: any;
  transition?: any;
}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, initial, animate, transition, onDrag, onDragEnd, onDragEnter, onDragExit, onDragLeave, onDragOver, onDragStart, ...props }, ref) => {
    const baseClassName = cn(
      'border-b border-[#F3F4F6] transition-colors duration-150 hover:bg-[#F9FAFB]',
      className
    );
    
    // If motion props are provided, use motion.tr with those props
    if (initial !== undefined || animate !== undefined) {
      return (
        <motion.tr
          ref={ref}
          className={baseClassName}
          initial={initial}
          animate={animate}
          transition={transition}
          whileHover={{ backgroundColor: '#F9FAFB' }}
          {...(props as any)}
        />
      );
    }
    
    // Otherwise use motion.tr with default hover
    return (
      <motion.tr
        ref={ref}
        className={baseClassName}
        whileHover={{ backgroundColor: '#F9FAFB' }}
        transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
        {...(props as any)}
      />
    );
  }
);

TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'h-12 px-4 text-right text-sm font-semibold text-[#6B7280] uppercase tracking-[0.05em] align-middle',
      className
    )}
    {...props}
  />
));

TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn('p-4 align-middle text-base text-[#111827]', className)}
    {...props}
  />
));

TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-sm text-[#6B7280]', className)}
    {...props}
  />
));

TableCaption.displayName = 'TableCaption';

/**
 * Empty Table State - Academic Design from agent.md
 * Icon: 64px, color #D1D5DB
 * Message: "لا توجد بيانات" / "No data available"
 * Centered vertically and horizontally
 * Padding: space-10 (40px)
 */
interface EmptyTableStateProps {
  message?: string;
  description?: string;
  icon?: React.ReactNode;
}

const EmptyTableState: React.FC<EmptyTableStateProps> = ({
  message = 'لا توجد بيانات',
  description = 'لم يتم العثور على أي بيانات لعرضها',
  icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4" dir="rtl">
      {icon || (
        <TableIcon className="w-16 h-16 text-[#D1D5DB] mb-4" aria-hidden="true" />
      )}
      <h3 className="text-lg font-semibold text-[#6B7280] mb-2">{message}</h3>
      {description && (
        <p className="text-sm text-[#9CA3AF] text-center max-w-sm">{description}</p>
      )}
    </div>
  );
};

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  EmptyTableState,
};

