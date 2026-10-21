export interface VisionResult {
  id: string;
  userId: string;
  imageUrl: string;
  title?: string;
  result: {
    label: string;
    confidence: number;
    description: string;
    material?: string;
    instructions?: string;
  };
  article?: {
    title?: string;
  };
  createdAt: string;
}

export interface VisionHistoryResponse {
  data: VisionResult[];
  total: number;
}
