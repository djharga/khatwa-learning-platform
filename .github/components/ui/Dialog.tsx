"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Dialog component system built on Radix UI primitives. Provides accessible modal dialogs with overlay, animations, and composition pattern for header, content, and footer.
 * @note Requires 'use client' directive for client-side interactivity
 */

/**
 * Root dialog component from Radix UI. Manages dialog state (open/closed).
 * @note Use with DialogTrigger to open and DialogContent to render the modal
 */
const Dialog = DialogPrimitive.Root

/**
 * Trigger button component that opens the dialog when clicked. Wraps any button or clickable element.
 */
const DialogTrigger = DialogPrimitive.Trigger

/**
 * Portal component that renders dialog content in a React portal (outside the DOM hierarchy). Ensures proper z-index stacking.
 */
const DialogPortal = DialogPrimitive.Portal

/**
 * Close button component that closes the dialog when clicked. Can wrap any button element.
 */
const DialogClose = DialogPrimitive.Close

/**
 * Semi-transparent backdrop overlay that appears behind the dialog. Includes fade-in/out animations.
 * @note Fades in when dialog opens, fades out when dialog closes
 * @note Fixed positioning covering entire viewport with black/80 opacity
 */
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

/**
 * Main dialog content container with animations, close button, and centered positioning. Automatically includes DialogOverlay and renders in a portal.
 * @note Zoom and slide animations on open/close with fade effects
 * @note Includes automatic close button in top-right corner with X icon
 * @example
 * ```typescript
 * <Dialog>
 *   <DialogTrigger asChild>
 *     <Button>Open Dialog</Button>
 *   </DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Dialog Title</DialogTitle>
 *       <DialogDescription>Dialog description</DialogDescription>
 *     </DialogHeader>
 *     Content goes here
 *     <DialogFooter>
 *       <Button>Close</Button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 * ```
 */
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    size?: 'sm' | 'md' | 'lg' | 'full';
  }
>(({ className, children, size = 'md', ...props }, ref) => {
  const maxWidthClass = {
    sm: 'max-w-[400px]',
    md: 'max-w-[600px]',
    lg: 'max-w-[800px]',
    full: 'max-w-[90vw]',
  }[size];

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border border-[#E5E7EB] bg-white rounded-[14px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.16)] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
          maxWidthClass,
          "rtl:left-auto rtl:right-[50%] rtl:translate-x-[50%]",
          "motion-isolate",
          className
        )}
        style={{
          direction: 'rtl',
          textAlign: 'right',
        }}
        {...props}
      >
        {children}
        {/* Automatic close button with screen reader text and focus ring - RTL positioned */}
        <DialogPrimitive.Close 
        className="absolute right-4 top-4 rtl:right-auto rtl:left-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        style={{
          insetInlineEnd: '1rem',
          insetInlineStart: 'auto',
        }}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">إغلاق</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
  )
})
DialogContent.displayName = DialogPrimitive.Content.displayName

// Radix UI handles Escape key to close and focus trapping automatically

/**
 * Header section for dialog title and description. Uses flex column layout with spacing.
 * @note Text centered on mobile, left-aligned on desktop (sm breakpoint)
 */
const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 pb-6 text-right", // Academic: pb-6 (24px padding-bottom)
      className
    )}
    style={{
      textAlign: 'right',
    }}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

/**
 * Footer section for dialog actions and buttons - Academic Design from agent.md
 * Padding: space-6 (24px)
 * Border-top: 1px solid #E5E7EB
 * Display: flex, justify-end
 * Gap: space-3 (12px)
 */
const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-6 border-t border-[#E5E7EB] rtl:sm:justify-end", // Academic: pt-6, border-top, gap-3
      className
    )}
    style={{
      direction: 'rtl',
    }}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

/**
 * Dialog title component. Renders as a heading with large, semibold text.
 * @note Automatically linked to dialog for screen readers via Radix UI
 */
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-[24px] font-semibold leading-[32px] text-[#111827] tracking-tight", // Academic: 24px semibold
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

/**
 * Dialog description component. Provides secondary text below the title.
 * @note Automatically linked to dialog for screen readers via Radix UI
 * @note Small text with muted foreground color
 */
const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-base text-[#6B7280] leading-6", className)} // Academic: 16px regular, color #6B7280
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}