export enum SeverityLevel {
  CRITICAL = 'CRITICAL',
  WARNING = 'WARNING',
  INFO = 'INFO'
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface AlertData {
  id: string;
  incident: string;
  location: string;
  notes?: string;
  formattedMessage: string;
  severity: SeverityLevel;
  timestamp: Date;
  coordinates?: Coordinates;
  isHandled?: boolean;
}

export interface GeminiAnalysisResult {
  formattedMessage: string;
  severity: SeverityLevel;
}