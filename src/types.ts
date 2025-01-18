export type ToolNames = "marker" | "freehand-draw";

export type Marker = {
  id: string;
  color: string | null;
  scale: number;
  longitude: number;
  latitude: number;
  icon: MarkerIcon | null;
};

export type ToolState = {
  activeTool: ToolNames | null;
};

export type MarkerState = {
  markers: Marker[];
  selectedMarkerId: Marker["id"] | null;
};

export type DrawState = {
  draws: [];
  selectedDrawId: string | null;
};

export type ValidationError = {
  validationError: string;
  invalidFields: string[];
};
export type MarkerIcon = {
  name: string;
  url: string;
};
