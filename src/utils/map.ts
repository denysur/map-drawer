// @ts-ignore
import shapeit from "@amaplex-software/shapeit";

import { Geometry } from "../types";
/**
 * Calculates the geometric center (centroid) of a shape given its coordinates.
 *
 * @param {number[][]} coordinates - An array of coordinate pairs, where each element is [x, y].
 * @returns {[number, number]} The center point of the shape as [centerX, centerY].
 *
 * @example
 * const coords = [[0, 0], [10, 0], [10, 10], [0, 10]];
 * const center = getCenterPointOfShape(coords);
 * console.log(center); // [5, 5]
 */
export const getCenterPointOfShape = (coordinates: number[][]) => {
  const centerX =
    coordinates.reduce((acc, curr) => {
      return (acc += curr[0]);
    }, 0) / coordinates.length;
  const centerY =
    coordinates.reduce((acc, curr) => {
      return (acc += curr[1]);
    }, 0) / coordinates.length;

  return [centerX, centerY];
};

/**
 * Calculates the approximate radius of a circle that fits around a given shape.
 * The function determines the average distance from the shape's center point
 * to all given coordinates.
 *
 * @param {number[]} centerPoint - The center of the shape as [x, y].
 * @param {number[][]} coordinates - An array of coordinates representing points of the shape,
 *                                   where each point is an array [x, y].
 * @returns {number} The average radius of the shape.
 *
 * @example
 * const center = [5, 5];
 * const shapeCoords = [[10, 5], [5, 10], [0, 5], [5, 0]];
 * const radius = getCircleRadiusFromRoughShape(center, shapeCoords);
 * console.log(radius); // Output: 5
 */
export const getCircleRadiusFromRoughShape = (
  centerPoint: number[],
  coordinates: number[][]
) => {
  const pointsToRaduses = coordinates.map((point) => {
    return Math.sqrt(
      Math.pow(point[0] - centerPoint[0], 2) +
        Math.pow(point[1] - centerPoint[1], 2)
    );
  });

  const middleRadius =
    pointsToRaduses.reduce((acc, v) => acc + v, 0) / pointsToRaduses.length;

  return middleRadius;
};

/**
 * Detects the shape of a given set of coordinates and scales it up or down based on the provided scale factor.
 * The function scales the coordinates to a reference zoom level, identifies the shape, and scales it back to the expected size.
 *
 * @param {number[][]} coordinates - An array of coordinate pairs representing the shape, where each element is [x, y].
 * @param {number} scaleFactor - The factor by which the coordinates should be scaled up or down.
 * @returns {Geometry} The detected geometry with adjusted coordinates or radius if it's a circle.
 *
 * @example
 * const coords = [[0, 0], [10, 0], [10, 10], [0, 10]];
 * const scale = 2;
 * const shape = shapeDetector(coords, scale);
 * console.log(shape);
 * // Example output:
 * // { name: "polygon", vertices: [[0, 0], [5, 0], [5, 5], [0, 5]] }
 */
export const shapeDetector = (coordinates: number[][], scaleFactor: number) => {
  const [centerX, centerY] = getCenterPointOfShape(coordinates);

  // scale up to zoom 1 to try to define geometry
  const newCoord = coordinates.map(([x, y]) => [
    centerX + (x - centerX) * scaleFactor,
    centerY + (y - centerY) * scaleFactor,
  ]);

  const geometry: Geometry = shapeit(newCoord);
  const { name: geometryName } = geometry;

  // scale down to expected size cirle
  if (geometryName === "circle") {
    return {
      ...geometry,
      center: [centerX, centerY],
      radius: getCircleRadiusFromRoughShape([centerX, centerY], coordinates),
    };
  }

  const { vertices } = geometry;

  return {
    ...geometry,
    vertices: vertices.map(([x, y]) => [
      centerX + (x - centerX) / scaleFactor,
      centerY + (y - centerY) / scaleFactor,
    ]),
  };
};
