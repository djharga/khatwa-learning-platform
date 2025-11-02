"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

/**
 * Tabs component system built on Radix UI Tabs primitives. Provides accessible tabbed interfaces with keyboard navigation and ARIA attributes.
 * @note Requires 'use client' directive for client-side interactivity
 */

/**
 * Root tabs component from Radix UI. Manages tab state and keyboard navigation.
 * @note Use with TabsList (for tab buttons) and TabsContent (for tab panels)
 * Keyboard navigation: Arrow keys navigate between tabs, Home/End jump to first/last tab
 * @note Each TabsTrigger and TabsContent must have matching 'value' props
 * @note Use defaultValue for uncontrolled, value + onValueChange for controlled
 * @note Tabs supports vertical orientation via orientation="vertical" prop
 */
const Tabs = TabsPrimitive.Root

/**
 * Container for tab trigger buttons. Renders as a horizontal list with muted background.
 * Default styling: 40px height, rounded corners, muted background, centered items
 * Layout: Uses inline-flex for horizontal tab arrangement
 */
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    // Radix UI handles ARIA attributes (role, aria-selected, aria-controls) automatically
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

/**
 * Individual tab button that switches between tab panels when clicked. Shows active state with background and shadow.
 * Active state: data-[state=active] applies white background, foreground color, and shadow
 * Default styling: Rounded corners, padding, medium font weight, focus ring
 * Disabled state: Pointer events disabled and reduced opacity when disabled
 */
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    // Keyboard navigation: Arrow keys, Home, End, Tab (handled by Radix UI)
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

/**
 * Tab panel content that displays when its associated tab is active. Includes focus ring for keyboard navigation.
 * Visibility: Only visible when corresponding TabsTrigger is active
 * Focus behavior: Focus ring appears when panel receives keyboard focus
 * @example
 * ```typescript
 * <Tabs defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">
 *     Content for tab 1
 *   </TabsContent>
 *   <TabsContent value="tab2">
 *     Content for tab 2
 *   </TabsContent>
 * </Tabs>
 * ```
 */
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    // Focus is automatically managed when switching tabs
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
