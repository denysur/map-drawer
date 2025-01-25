// @ts-ignore
import shapeit from "@amaplex-software/shapeit";
import * as turf from "@turf/turf";

import { Geometry } from "../types";

/**
 * Calculates the bounding rectangle for a given set of coordinates.
 *
 * @param {number[][]} coordinates - An array of coordinates in [longitude, latitude] format.
 * @returns {number[][]} - The bounding rectangle as an array of corner points:
 *                        [southwest, northwest, northeast, southeast].
 *
 * @example
 * const shapeCoordinates = [
 *   [30.5, 50.45],
 *   [30.6, 50.5],
 *   [30.55, 50.55]
 * ];
 * const boundingBox = getBoundingRectangle(shapeCoordinates);
 * console.log(boundingBox);
 */
export const getBoundingRectangle = (coordinates: number[][]): number[][] => {
  const lons = coordinates.map((coord) => coord[0]);
  const lats = coordinates.map((coord) => coord[1]);

  const minLon = Math.min(...lons);
  const maxLon = Math.max(...lons);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);

  // Return rectangle corners: SW, NW, NE, SE
  return [
    [minLon, minLat], // Southwest
    [minLon, maxLat], // Northwest
    [maxLon, maxLat], // Northeast
    [maxLon, minLat], // Southeast
  ];
};

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
  const boundingRect = getBoundingRectangle(coordinates);

  const centerX = (boundingRect[0][0] + boundingRect[2][0]) / 2;
  const centerY = (boundingRect[0][1] + boundingRect[2][1]) / 2;

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
 * Generates a set of points representing a circle on the Earth's surface.
 *
 * @param { [number, number] } center - The center of the circle as [longitude, latitude].
 * @param { number } radius - The radius of the circle in meters.
 * @param { number } [numPoints=64] - The number of points to approximate the circle (default is 64).
 * @returns { number[][] } - An array of coordinates representing the circle in [longitude, latitude] format.
 *
 * @example
 * const center = [30.5234, 50.4501];  // Kyiv coordinates
 * const radius = 1000;  // 1 km
 * const circlePoints = generateCirclePoints(center, radius);
 * console.log(circlePoints);
 */
export const generateCirclePoints = (
  center: [number, number],
  radius: number,
  numPoints = 64
): number[][] => {
  const from = turf.point(center);
  const to = turf.point([center[0], center[1] + radius]);

  const distance = turf.distance(from, to, { units: "meters" });

  const circle = turf.circle(center, distance, {
    steps: numPoints,
    units: "meters",
  });

  return circle.geometry.coordinates[0];
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

  const geometry:
    | Geometry
    | { name: "circle"; center: number[]; radius: number } = shapeit(newCoord);
  const { name: geometryName } = geometry;

  if (geometryName === "circle") {
    const radius = getCircleRadiusFromRoughShape(
      [centerX, centerY],
      coordinates
    );

    return {
      name: "polygon",
      vertices: generateCirclePoints([centerX, centerY], radius),
    } as Geometry;
  }

  const { vertices } = geometry;

  if (geometryName === "vector") {
    vertices.shift(); // remove first point
    vertices.pop(); // remove last point

    return {
      ...geometry,
      vertices: [
        coordinates[0],
        ...vertices,
        coordinates[coordinates.length - 1],
      ],
    };
  }

  return {
    ...geometry,
    vertices: vertices.map(([x, y]) => [
      centerX + (x - centerX) / scaleFactor,
      centerY + (y - centerY) / scaleFactor,
    ]),
  };
};
