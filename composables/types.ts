export interface Lyric {
  id: string;
  title: string;
  artist: string;
  steps: Step[];
}

export interface Step {
  id: number;
  time: number;
  html: string;
}