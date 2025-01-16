export type ToolNames = "marker" | "polyline" | "polygon";

export type Marker = {
  id: string;
  color: string | null;
  scale: number;
  longitude: number;
  latitude: number;
  icon: string | null;
};

export type ToolState = {
  activeTool: ToolNames | null;
};

export type MarkerState = {
  markers: Marker[];
  selectedMarkerId: Marker["id"] | null;
};

export type ValidationError = {
  validationError: string;
  invalidFields: string[];
};
