import type { Timestamp } from "firebase/firestore";

export interface Lyric {
  id?: string;
  title: string;
  artist: string;
  steps: Step[];
  youtube?: string;
  createdBy?: string;
  createdAt?: Timestamp
}

export interface Step {
  id: number;
  time: number;
  html: string;
  editedBy?: string;
  editedAt?: Timestamp
}