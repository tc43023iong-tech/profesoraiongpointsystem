export type ClassID = 'P5A' | 'P5B' | 'P5C';

export interface PointRecord {
  id: string; // unique record UUID
  timestamp: string; // ISO or local formatted string
  itemName: string;
  points: number; // e.g. +2 or -3
}

export interface Student {
  id: number; // roll number / student ID (學號)
  name: string; // name in Chinese (姓名)
  avatarUrl: string; // image url
  pokemonId?: number; // associated Pokemon ID if chosen
  goodScore: number; // accumulated positive points
  careScore: number; // accumulated negative points (stored as absolute value, displayed as negative)
  history: PointRecord[];
}

export interface ScoreItem {
  id: string;
  name: string;
  englishName?: string;
  points: number;
  icon: string; // emoji or lucide icon name
}
