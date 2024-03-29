/// <reference types="react-scripts" />

interface ToDos {
  id: number;
  title: string;
  description: string;
  complete: boolean;
  deadline: string | null;
}

declare function Callback(action: string, data?: ToDos): void;
