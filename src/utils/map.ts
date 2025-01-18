// @ts-ignore
import shapeit from "@amaplex-software/shapeit";

import { Geometry } from "../types";

export const shapeDetector = (coordinates: number[][], scaleFactor: number) => {
  // detect the center of initial coordinates
  const initialCenterX =
    coordinates.reduce((acc, curr) => {
      return (acc += curr[0]);
    }, 0) / coordinates.length;
  const initialCenterY =
    coordinates.reduce((acc, curr) => {
      return (acc += curr[1]);
    }, 0) / coordinates.length;

  // scale up to zoom 1 to try to define geometry
  const newCoord = coordinates.map(([x, y]) => [
    initialCenterX + (x - initialCenterX) * scaleFactor,
    initialCenterY + (y - initialCenterY) * scaleFactor,
  ]);

  const geometry: Geometry = shapeit(newCoord);
  const { name: geometryName } = geometry;

  // scale down to expected size cirle
  if (geometryName === "circle") {
    return {
      ...geometry,
      radius: geometry.radius / scaleFactor,
    };
  }

  const { vertices } = geometry;

  // detect the center of defined geometry
  const definetCenterX =
    vertices.reduce((acc, curr) => {
      return (acc += curr[0]);
    }, 0) / vertices.length;
  const definetCenterY =
    vertices.reduce((acc, curr) => {
      return (acc += curr[1]);
    }, 0) / vertices.length;

  return {
    ...geometry,
    vertices: vertices.map(([x, y]) => [
      definetCenterX + (x - definetCenterX) * scaleFactor,
      definetCenterY + (y - definetCenterY) * scaleFactor,
    ]),
  };
};
