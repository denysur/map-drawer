export type ToolsNames = "marker" | "polyline" | "polygon";

export type AppState = {
  activeTool: ToolsNames | null;
};

export type ValidationError = {
  validationError: string;
  invalidFields: string[];
};
