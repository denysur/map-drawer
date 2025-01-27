export type ToolNames = "marker" | "freehand-draw" | "arrow";

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
      vertices: number[][];
      center: [number, number];
    }
  | {
      name: "vector" | "open polygon" | "rectangle" | "polygon"; // and others
      vertices: number[][];
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
  scaleFactor: number;
  vertices: number[][];
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
export type ArrowState = {
  arrows: Arrow[];
  selectedArrowId: string | null;
};

export type ValidationError = {
  validationError: string;
  invalidFields: string[];
};
export type MarkerIcon = {
  name: string;
  url: string;
};
