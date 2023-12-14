import { Result } from "../main.ts";
import { getInputOfCurrentDay } from "../utils.ts";

export async function getResults(): Promise<Result> {
  const input = await getInputOfCurrentDay(import.meta.url);
  return {
    exerciseOne: exerciseOne(input),
    exerciseTwo: exerciseTwo(input),
  };
}

const galaxyType = {
  star: "#",
  empty: ".",
} as const;

type Coordinate = [number, number];

function transpose(matrix: string[][]): string[][] {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

function getEmptyRowIndexes(galaxy: string[][]): number[] {
  let emptyRowIndexes: number[] = [];
  galaxy.forEach((row, y) => {
    const empty = row.every((col) => col === galaxyType.empty);
    if (empty) {
      emptyRowIndexes = [...emptyRowIndexes, y];
    }
  });
  return emptyRowIndexes;
}

function parseInput(input: string): string[][] {
  return input
    .trim()
    .split("\n")
    .map((line) => line.trim().split(""));
}

function getStarCoordinates(galaxy: string[][]): Coordinate[] {
  let result: Coordinate[] = [];
  galaxy.forEach((row, y) => {
    row.forEach((col, x) => {
      if (col === galaxyType.star) {
        result = [...result, [x, y]];
      }
    });
  });
  return result;
}

function getDistance(a: Coordinate, b: Coordinate) {
  const [x1, y1] = a;
  const [x2, y2] = b;
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

const getDistancesBetweenStars = (coordinates: Coordinate[]) => {
  const visited = new Set();
  let distances: number[] = [];
  for (const [x, y] of coordinates) {
    for (const [x2, y2] of coordinates) {
      if (x === x2 && y === y2) {
        continue;
      }
      if(visited.has(`[${x},${y}][${x2},${y2}]`) || visited.has(`[${x2},${y2}][${x},${y}]`)) {
        continue;
      }
      visited.add(`[${x},${y}][${x2},${y2}]`);
      distances = [...distances, (getDistance([x, y], [x2, y2]))];
    }
  }
  return distances;
};

function getExpandedGalaxy(
  coordinates: Coordinate[],
  emptyXIndexes: number[],
  emptyYIndexes: number[],
  offset = 2
): Coordinate[] {
  return coordinates.map(([x, y]) => {
    const emptyXIndexesBefore = emptyXIndexes.filter((index) => index < x);
    const emptyYIndexesBefore = emptyYIndexes.filter((index) => index < y);
    return [x + emptyXIndexesBefore.length * (offset -1), y + emptyYIndexesBefore.length * (offset -1)];
  });
}

export function exerciseOne(input: string): number {
  const galaxy = parseInput(input);
  const emptyYIndexes = getEmptyRowIndexes(galaxy);
  const emptyXIndexes = getEmptyRowIndexes(transpose(galaxy));
  const coordinates = getStarCoordinates(galaxy);
  const expandedCoordinates = getExpandedGalaxy(coordinates, emptyXIndexes, emptyYIndexes);
  const result = getDistancesBetweenStars(expandedCoordinates).reduce((acc, cur) => acc + cur, 0);

  return result;
}

export function exerciseTwo(input: string, offset = 1_000_000): number {
  const galaxy = parseInput(input);
  const emptyYIndexes = getEmptyRowIndexes(galaxy);
  const emptyXIndexes = getEmptyRowIndexes(transpose(galaxy));
  const coordinates = getStarCoordinates(galaxy);
  const expandedCoordinates = getExpandedGalaxy(
    coordinates,
    emptyXIndexes,
    emptyYIndexes,
    offset
  );
  const result = getDistancesBetweenStars(expandedCoordinates).reduce((acc, cur) => acc + cur, 0);

  return result;
}
