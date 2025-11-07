declare module 'react-player' {
  import { Component } from 'react';
  
  export interface ReactPlayerProps {
    url: string | string[];
    playing?: boolean;
    loop?: boolean;
    controls?: boolean;
    light?: boolean | string;
    volume?: number;
    muted?: boolean;
    playbackRate?: number;
    width?: string | number;
    height?: string | number;
    style?: React.CSSProperties;
    progressInterval?: number;
    playsinline?: boolean;
    pip?: boolean;
    stopOnUnmount?: boolean;
    fallback?: React.ReactNode;
    wrapper?: React.ComponentType<any>;
    playIcon?: React.ReactNode;
    previewTabIndex?: number;
    config?: {
      youtube?: any;
      vimeo?: any;
      file?: any;
      [key: string]: any;
    };
    onReady?: () => void;
    onStart?: () => void;
    onPlay?: () => void;
    onPause?: () => void;
    onBuffer?: () => void;
    onBufferEnd?: () => void;
    onEnded?: () => void;
    onError?: (error: any) => void;
    onProgress?: (state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => void;
    onDuration?: (duration: number) => void;
    onSeek?: (seconds: number) => void;
  }
  
  export default class ReactPlayer extends Component<ReactPlayerProps> {
    getInternalPlayer(): any;
    seekTo(amount: number, type?: 'seconds' | 'fraction'): void;
    getCurrentTime(): number;
    getSecondsLoaded(): number;
    getDuration(): number;
    getProgress(): { played: number; playedSeconds: number; loaded: number; loadedSeconds: number };
  }
}

