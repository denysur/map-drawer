export type ToolNames = "marker" | "freehand-draw";

export type Marker = {
  id: string;
  color: string | null;
  scale: number;
  rotation: number;
  longitude: number;
  latitude: number;
  icon: MarkerIcon | null;
};

export type Geometry =
  | {
      name: "circle";
      center: number[];
      radius: number;
    }
  | {
      name: "vector" | "open polygon" | "rectangle"; // and others
      vertices: number[][];
    };

export type Draw = {
  id: string;
  color: string | null;
  scale: number;
  geometry: Geometry;
};

export type HistoryType = "add" | "remove" | "edit";
export type HistoryCommit = {
  tool: ToolNames;
  oldState?: Partial<Draw | Marker> & { id: string };
  newState?: Partial<Draw | Marker> & { id: string };
  timestamp: number;
  type: HistoryType;
};

export type HistoryState = {
  timestamp: number | null;
  history: HistoryCommit[];
};

export type ToolState = {
  activeTool: ToolNames | null;
};

export type MarkerState = {
  markers: Marker[];
  selectedMarkerId: Marker["id"] | null;
};

export type DrawState = {
  drawings: Draw[];
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
