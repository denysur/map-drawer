export type ToolNames = "fast-marker" | "marker" | "freehand-draw" | "arrow";

export type Theme = "light" | "dark" | "system";

export type Marker = {
  id: string;
  color: string | null;
  scale: number;
  rotation: number;
  longitude: number;
  latitude: number;
  icon: MarkerIcon | DefaultMarkerIcon | null;
};

export type Geometry =
  | { name: "circle"; vertices: [number, number][]; center: [number, number] }
  | {
      name: "vector" | "open polygon" | "rectangle" | "polygon"; // and others
      vertices: [number, number][];
    };

export type Draw = {
  id: string;
  color: string | null;
  weight: number;
  geometry: Geometry;
};

export type Arrow = {
  id: string;
  color: string | null;
  scale: number;
  weight: number;
  scaleFactor: number;
  vertices: [number, number][];
};
export type HistoryType = "add" | "remove" | "edit";

export type HistoryCommit = {
  tool: ToolNames;
  id: string;
  oldState?: Partial<Draw | Marker | Arrow> & { id: string };
  newState?: Partial<Draw | Marker | Arrow> & { id: string };
  timestamp: number;
  type: HistoryType;
};

export type HistoryState = {
  timestamp: number | null;
  history: HistoryCommit[];
};

export type ToolState = { activeTool: ToolNames | null };

export type MarkerState = {
  markers: Marker[];
  selectedMarkerId: Marker["id"] | null;
  iconOnCreating: DefaultMarkerIcon | null;
};

export type DrawState = { drawings: Draw[]; selectedDrawId: string | null };
export type ArrowState = { arrows: Arrow[]; selectedArrowId: string | null };

export type ValidationError = {
  validationError: string;
  invalidFields: string[];
};
export type MarkerIcon = { name: string; url: string; type: "image" };
export type DefaultMarkerIcon = { type: "default"; name: string };
