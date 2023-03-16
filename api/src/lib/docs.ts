export interface JSONContent {
  type?: string;
  attrs?: Record<string, unknown>;
  content?: JSONContent[];
  marks?: Array<{
    type: string;
    attrs?: Record<string, unknown>;
    [key: string]: unknown;
  }>;
  text?: string;
  [key: string]: unknown;
}
