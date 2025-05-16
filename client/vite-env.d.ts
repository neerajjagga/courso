/// <reference types="vite/client" />
import { Razorpay } from 'razorpay';

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  interface Window {
    Razorpay: RazorpayInstance;
  }
}