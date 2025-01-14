export type ToolNames = "marker" | "polyline" | "polygon";

export type ToolState = {
  activeTool: ToolNames | null;
};

export type ValidationError = {
  validationError: string;
  invalidFields: string[];
};
