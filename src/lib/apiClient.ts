/**
 * API Client - Mock Ready
 * واجهة API مبدئية جاهزة للربط مع Backend
 * 
 * يمكن استخدامها مع MSW للـ Mock أو مع Backend الحقيقي
 */

import { ApiResponse, Course, CourseListResponse, CourseDetailResponse, User } from './apiTypes';

const API_PREFIX = '/api';

/**
 * Fetch all courses
 */
export async function fetchCourses(): Promise<ApiResponse<Course[]>> {
  try {
    const res = await fetch(`${API_PREFIX}/courses`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching courses:', error);
    return {
      error: {
        code: 'FETCH_ERROR',
        message: error instanceof Error ? error.message : 'Failed to fetch courses',
      },
    };
  }
}

/**
 * Fetch a single course by ID
 */
export async function fetchCourseById(id: string): Promise<ApiResponse<Course>> {
  try {
    const res = await fetch(`${API_PREFIX}/courses/${id}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching course:', error);
    return {
      error: {
        code: 'FETCH_ERROR',
        message: error instanceof Error ? error.message : 'Failed to fetch course',
      },
    };
  }
}

/**
 * Fetch a course by slug
 */
export async function fetchCourseBySlug(slug: string): Promise<ApiResponse<Course>> {
  try {
    const res = await fetch(`${API_PREFIX}/courses/slug/${slug}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching course by slug:', error);
    return {
      error: {
        code: 'FETCH_ERROR',
        message: error instanceof Error ? error.message : 'Failed to fetch course',
      },
    };
  }
}

/**
 * Fetch student data by ID
 */
export async function fetchStudent(studentId: string): Promise<ApiResponse<User>> {
  try {
    const res = await fetch(`${API_PREFIX}/student/${studentId}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching student:', error);
    return {
      error: {
        code: 'FETCH_ERROR',
        message: error instanceof Error ? error.message : 'Failed to fetch student',
      },
    };
  }
}

/**
 * Create payment intent
 */
export async function createPaymentIntent(planId: string, amount: number): Promise<ApiResponse<{ clientSecret: string }>> {
  try {
    const res = await fetch(`${API_PREFIX}/create-payment-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ planId, amount }),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return {
      error: {
        code: 'FETCH_ERROR',
        message: error instanceof Error ? error.message : 'Failed to create payment intent',
      },
    };
  }
}

/**
 * Subscribe to a plan
 */
export async function subscribe(planId: string, paymentIntentId: string): Promise<ApiResponse<{ success: boolean }>> {
  try {
    const res = await fetch(`${API_PREFIX}/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ planId, paymentIntentId }),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error subscribing:', error);
    return {
      error: {
        code: 'FETCH_ERROR',
        message: error instanceof Error ? error.message : 'Failed to subscribe',
      },
    };
  }
}
