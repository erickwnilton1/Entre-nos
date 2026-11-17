export type AppTab = 'home' | 'cartas' | 'mem' | 'enq' | 'pl' | 'tm';

export type ContentModalState =
  | { type: 'letter'; index: number }
  | { type: 'memory'; index: number };
