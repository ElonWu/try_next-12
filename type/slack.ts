export interface Message {}

export type SlackResponse<T> =
  | (T & { ok: true })
  | { ok: false; error?: string };
