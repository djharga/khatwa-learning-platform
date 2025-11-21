import { useState, useCallback } from 'react';
import React from 'react';

/**
 * Configuration object with course ID and callback functions
 */
export interface CourseCardActionsProps {
  /** ID of the course */
  courseId: string;
  /** Whether parent component is in loading state */
  isLoading?: boolean;
  /** Optional bookmark callback */
  onBookmark?: (courseId: string) => void | Promise<void>;
  /** Optional share callback */
  onShare?: (courseId: string) => void | Promise<void>;
  /** Optional enroll callback */
  onEnroll?: (courseId: string) => void | Promise<void>;
  /** Optional ripple effect trigger */
  onRipple?: () => void;
}

/**
 * Return value from useCourseCardActions hook
 */
export interface CourseCardActionsReturn {
  /** Bookmark state */
  isBookmarked: boolean;
  /** Wishlist state */
  isWishlisted: boolean;
  /** Compare state */
  isCompared: boolean;
  /** Whether any action is in progress */
  isLoadingAction: boolean;
  /** Bookmark handler */
  handleBookmark: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  /** Share handler */
  handleShare: (e: React.MouseEvent) => Promise<void>;
  /** Wishlist handler */
  handleWishlist: (e: React.MouseEvent) => Promise<void>;
  /** Compare handler */
  handleCompare: (e: React.MouseEvent) => Promise<void>;
  /** Preview handler */
  handlePreview: (e: React.MouseEvent) => void;
  /** Enroll handler */
  handleEnroll: (e: React.MouseEvent) => Promise<void>;
}

/**
 * Custom hook for managing course card user interactions
 * @param props - Configuration object with course ID and callback functions
 * @returns Object containing action states and memoized event handlers
 */
export function useCourseCardActions(props: CourseCardActionsProps): CourseCardActionsReturn {
  const { courseId, isLoading = false, onBookmark, onShare, onEnroll, onRipple } = props;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isCompared, setIsCompared] = useState(false);
  const [isLoadingAction, setIsLoadingAction] = useState(false);

  const handleBookmark = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (isLoading) return;

      setIsLoadingAction(true);
      try {
        setIsBookmarked(!isBookmarked);
        await onBookmark?.(courseId);
      } catch (error) {
        console.error('Failed to bookmark course:', error);
      } finally {
        setIsLoadingAction(false);
      }
    },
    [isBookmarked, isLoading, onBookmark, courseId]
  );

  const handleShare = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (isLoading) return;

      setIsLoadingAction(true);
      try {
        await onShare?.(courseId);
      } catch (error) {
        console.error('Failed to share course:', error);
      } finally {
        setIsLoadingAction(false);
      }
    },
    [isLoading, onShare, courseId]
  );

  const handleWishlist = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (isLoading) return;

      setIsLoadingAction(true);
      try {
        setIsWishlisted(!isWishlisted);
      } catch (error) {
        console.error('Failed to add to wishlist:', error);
      } finally {
        setIsLoadingAction(false);
      }
    },
    [isWishlisted, isLoading]
  );

  const handleCompare = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (isLoading) return;

      setIsLoadingAction(true);
      try {
        setIsCompared(!isCompared);
      } catch (error) {
        console.error('Failed to add to compare:', error);
      } finally {
        setIsLoadingAction(false);
      }
    },
    [isCompared, isLoading]
  );

  const handlePreview = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Preview course:', courseId);
    },
    [courseId]
  );

  const handleEnroll = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (isLoading) return;

      onRipple?.();

      setIsLoadingAction(true);
      try {
        await onEnroll?.(courseId);
      } catch (error) {
        console.error('Failed to enroll in course:', error);
      } finally {
        setIsLoadingAction(false);
      }
    },
    [isLoading, onEnroll, onRipple, courseId]
  );

  return {
    isBookmarked,
    isWishlisted,
    isCompared,
    isLoadingAction,
    handleBookmark,
    handleShare,
    handleWishlist,
    handleCompare,
    handlePreview,
    handleEnroll,
  };
}
