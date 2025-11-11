'use client';

import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// أيقونة Word احترافية
export const WordIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M19.5 3H4.5C3.67 3 3 3.67 3 4.5V19.5C3 20.33 3.67 21 4.5 21H19.5C20.33 21 21 20.33 21 19.5V4.5C21 3.67 20.33 3 19.5 3Z"
      fill="#2B579A"
      className="dark:fill-[#2B579A]"
    />
    <path
      d="M7 8L9 16L10.5 12L12 16L14 8H12.5L11 13L9.5 8H7Z"
      fill="white"
    />
    <path
      d="M15 8V16H16.5V12.5L18.5 16H20L17.8 12.2L20 8.5H18.5L16.5 12V8H15Z"
      fill="white"
    />
  </svg>
);

// أيقونة PDF احترافية
export const PDFIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M19.5 3H4.5C3.67 3 3 3.67 3 4.5V19.5C3 20.33 3.67 21 4.5 21H19.5C20.33 21 21 20.33 21 19.5V4.5C21 3.67 20.33 3 19.5 3Z"
      fill="#E53E3E"
      className="dark:fill-[#E53E3E]"
    />
    <path
      d="M8 8H9.5V10.5C9.5 10.5 10.2 9.5 11.5 9.5C12.8 9.5 13.5 10.2 13.5 11.5V14H12V11.5C12 11.2 11.8 11 11.5 11C11.2 11 11 11.2 11 11.5V14H9.5V8H8Z"
      fill="white"
    />
    <path
      d="M14.5 8H16V14H14.5V8Z"
      fill="white"
    />
    <path
      d="M16.5 8H18C18.8 8 19.5 8.7 19.5 9.5V11.5C19.5 12.3 18.8 13 18 13H16.5V8ZM18 11.5C18.3 11.5 18.5 11.3 18.5 11V10C18.5 9.7 18.3 9.5 18 9.5H17.5V11.5H18Z"
      fill="white"
    />
  </svg>
);

// أيقونة فيديو احترافية
export const VideoIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M21 5.5C21 4.67 20.33 4 19.5 4H4.5C3.67 4 3 4.67 3 5.5V18.5C3 19.33 3.67 20 4.5 20H19.5C20.33 20 21 19.33 21 18.5V5.5Z"
      fill="#DC2626"
      className="dark:fill-[#DC2626]"
    />
    <path
      d="M10 8L15 11.5L10 15V8Z"
      fill="white"
    />
    <path
      d="M17 8H19V16H17V8Z"
      fill="white"
      opacity="0.8"
    />
  </svg>
);

// أيقونة صوت احترافية
export const AudioIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 3C10.9 3 10 3.9 10 5V11C10 12.1 10.9 13 12 13C13.1 13 14 12.1 14 11V5C14 3.9 13.1 3 12 3Z"
      fill="#9333EA"
      className="dark:fill-[#9333EA]"
    />
    <path
      d="M19 10V12C19 15.9 15.9 19 12 19C8.1 19 5 15.9 5 12V10H7V12C7 14.8 9.2 17 12 17C14.8 17 17 14.8 17 12V10H19Z"
      fill="#9333EA"
      className="dark:fill-[#9333EA]"
    />
    <path
      d="M12 19V21H14V19H12Z"
      fill="#9333EA"
      className="dark:fill-[#9333EA]"
    />
    <path
      d="M8 19V21H10V19H8Z"
      fill="#9333EA"
      className="dark:fill-[#9333EA]"
    />
    <path
      d="M16 19V21H18V19H16Z"
      fill="#9333EA"
      className="dark:fill-[#9333EA]"
    />
  </svg>
);

