// @ts-ignore
import shapeit from "@amaplex-software/shapeit";
import * as turf from "@turf/turf";

import { EARTH_RADIUS } from "../constants";

import { Arrow, Draw, Geometry } from "../types";

const coordinateCache = new Map<string, [number, number]>(); // this is the cache for lonLatToMetersWithCache function

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
    const circleVertices = generateCirclePoints([centerX, centerY], radius);

    return {
      name: "circle",
      vertices: [...circleVertices, circleVertices[0]],
      center: [centerX, centerY],
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

  const polygonVertices = vertices.map(([x, y]) => [
    centerX + (x - centerX) / scaleFactor,
    centerY + (y - centerY) / scaleFactor,
  ]);

  return {
    ...geometry,
    vertices:
      geometryName === "open polygon"
        ? polygonVertices
        : [...polygonVertices, polygonVertices[0]],
  };
};

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

/**
 * Converts geographic coordinates (longitude, latitude) to meters using the EPSG:3857 projection.
 *
 * @param {number} lon - Longitude in degrees.
 * @param {number} lat - Latitude in degrees.
 * @returns {[number, number]} The projected coordinates in meters (x, y).
 */
export const lonLatToMeters = (lon: number, lat: number): [number, number] => {
  const x = lon * ((EARTH_RADIUS * Math.PI) / 180);
  const y = Math.log(Math.tan(Math.PI / 4 + toRadians(lat) / 2)) * EARTH_RADIUS;
  return [x, y];
};

/**
 * Converts geographic coordinates (longitude, latitude) to meters using the EPSG:3857 projection.
 * This function uses caching to improve performance for repeated coordinate transformations.
 *
 * EPSG:3857 is a popular Web Mercator projection used in web mapping applications.
 *
 * @param {number} lon - Longitude in degrees (ranging from -180 to 180).
 * @param {number} lat - Latitude in degrees (ranging from -85 to 85, to avoid singularities at poles).
 * @returns {[number, number]} The projected coordinates in meters as [x, y].
 *
 * @example
 * const [x, y] = lonLatToMetersWithCache(30.5234, 50.4501);
 * console.log(x, y); // Outputs projected coordinates in meters
 */
export const lonLatToMetersWithCache = (
  lon: number,
  lat: number
): [number, number] => {
  const key = `${lon},${lat}`;
  if (coordinateCache.has(key)) {
    return coordinateCache.get(key)!;
  }

  const result = lonLatToMeters(lon, lat);

  coordinateCache.set(key, result);

  return result;
};

/**
 * Calculates the Euclidean distance between two points in EPSG:3857 projection.
 *
 * @param {[number, number]} coord1 - The first point [x, y] in meters.
 * @param {[number, number]} coord2 - The second point [x, y] in meters.
 * @returns {number} The Euclidean distance between the two points in meters.
 */
export const euclideanDistance = (
  coord1: [number, number],
  coord2: [number, number]
): number => {
  const dx = coord2[0] - coord1[0];
  const dy = coord2[1] - coord1[1];
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Calculates the shortest distance from a point to a polyline in the EPSG:3857 projection.
 *
 * @param {[number, number]} point - The point to measure from [longitude, latitude].
 * @param {[number, number][]} line - The polyline represented as an array of [longitude, latitude] pairs.
 * @returns {number} The minimum distance from the point to the polyline in meters.
 */
export const distancePointToProjectedLine = (
  point: [number, number],
  line: [number, number][]
): number => {
  let minDistance = Infinity;

  const pointMeters = lonLatToMeters(point[0], point[1]);

  for (let i = 1; i < line.length; i++) {
    const A = lonLatToMetersWithCache(line[i - 1][0], line[i - 1][1]);
    const B = lonLatToMetersWithCache(line[i][0], line[i][1]);

    // Compute vector components
    const dX = B[0] - A[0];
    const dY = B[1] - A[1];

    // Calculate projection of the point onto the line segment
    const dXPoint = pointMeters[0] - A[0];
    const dYPoint = pointMeters[1] - A[1];

    const dotProduct = dXPoint * dX + dYPoint * dY;
    const lengthSquared = dX * dX + dY * dY;

    let t = dotProduct / lengthSquared;
    t = Math.max(0, Math.min(1, t)); // Clamp t to stay within the segment bounds

    // Find the closest point on the segment
    const projection = [A[0] + t * dX, A[1] + t * dY] as [number, number];

    // Calculate the distance from the projected point to the original point
    const dProjection = euclideanDistance(pointMeters, projection);

    if (!isNaN(dProjection)) {
      minDistance = Math.min(minDistance, dProjection);
    }
  }

  return minDistance; // Distance in meters
};

/**
 * Finds the draw object that was clicked based on proximity to the line.
 *
 * @param {number[]} clickPoint - The clicked point coordinates [longitude, latitude].
 * @param {Array<Draw[]>} drawings - The list of draw objects with geometries.
 * @param {number} clickThreshold - The click threshold.
 * @returns {Draw | null} The clicked draw object, or null if no draw was found within the threshold.
 *
 * @example
 * const clickedDraw = findClickedDraw([30.5234, 50.4501], drawings, scaleFactor);
 * if (clickedDraw) {
 *   console.log("Clicked draw found:", clickedDraw);
 * }
 */
export const findClickedDraw = (
  clickPoint: [number, number],
  drawings: Draw[],
  clickThreshold: number
): Draw | null => {
  for (const draw of drawings) {
    const distance = distancePointToProjectedLine(
      clickPoint,
      draw.geometry.vertices as [number, number][]
    );

    if (distance < clickThreshold) {
      return draw;
    }
  }

  return null;
};

/**
 * Finds the arrow object that was clicked based on proximity to the line.
 *
 * @param {number[]} clickPoint - The clicked point coordinates [longitude, latitude].
 * @param {Array<Arrow[]>} arrows - The list of draw objects with geometries.
 * @param {number} clickThreshold - The click threshold.
 * @returns {Arrow | null} The clicked draw object, or null if no draw was found within the threshold.
 *
 * @example
 * const clickedDraw = findClickedDraw([30.5234, 50.4501], drawings, scaleFactor);
 * if (clickedDraw) {
 *   console.log("Clicked draw found:", clickedDraw);
 * }
 */
export const findClickedArrow = (
  clickPoint: [number, number],
  arrows: Arrow[],
  clickThreshold: number
): Arrow | null => {
  for (const arrow of arrows) {
    const distance = distancePointToProjectedLine(
      clickPoint,
      arrow.vertices as [number, number][]
    );

    if (distance < clickThreshold) {
      return arrow;
    }
  }

  return null;
};
