export type AppTab = 'home' | 'cartas' | 'mem' | 'enq' | 'tm';

export type ContentModalState =
  | { type: 'letter'; index: number }
  | { type: 'memory'; index: number };
