interface ApiMessage {
  message: string;
  instance: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T | null;
  message: string;
  instance: string;
  error?: string | null;
}

export type MessageMap = Record<string, ApiMessage>;