// Main type exports

export type Answer = 'yes' | 'no';

export interface ResponseData {
  answer: Answer;
  sessionId?: string;
  metadata?: {
    dodgeCount?: number;
    timeToDecide?: number;
  };
}

export interface ApiResponse {
  success: boolean;
  responseId?: number;
  message: string;
}

export interface Stats {
  totalResponses: number;
  yesCount: number;
  noCount: number;
  yesPercentage: number;
  lastUpdated: string;
}

export interface Position {
  x: number;
  y: number;
}

// Story/Riddle types
export type StoryStage = 'opening' | 'riddle' | 'reflection' | 'transition' | 'complete';

export interface Choice {
  id: string;
  label: string;
  reflection: string[];
}
