/**
 * MSW Browser Setup
 * إعداد Mock Service Worker للمتصفح
 */

import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// إنشاء worker
export const worker = setupWorker(...handlers);

