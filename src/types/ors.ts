export interface TTextDoc {
  label: string;
  description: string;
}

export interface TDocument {
  textDoc: TTextDoc[];
  attachments: string[];
}

export interface TORSPlan {
  _id: string;
  vehicle: string;
  roadWorthinessScore: string;
  overallTrafficScore: string;
  actionRequired: string;
  documents: TDocument[];
  createdAt: string;
}

export interface TORSPlanResponse {
  success: boolean;
  message: string;
  plans: TORSPlan[];
}
