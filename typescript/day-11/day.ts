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

function expandGalaxyAxis(galaxy: string[][]): string[][] {
  let result: string[][] = [];
  for (const row of galaxy) {
    const empty = row.every((col) => col === galaxyType.empty);
    if (empty) {
      result = [...result, row, row];
    } else {
      result = [...result, row];
    }
  }
  return result;
}

function transpose(matrix: string[][]): string[][] {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

function expandGalaxy(galaxy: string[][]): string[][] {
  const verticallyExpandedGalaxy = expandGalaxyAxis(galaxy);
  const horizontallyExpanedGalaxy = expandGalaxyAxis(transpose(verticallyExpandedGalaxy));
  const result = transpose(horizontallyExpanedGalaxy);

  return result;
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
  let distances: number[] = [];
  for (const [x, y] of coordinates) {
    for (const [x2, y2] of coordinates) {
      if (x === x2 && y === y2) {
        continue;
      }
      distances = [...distances, getDistance([x, y], [x2, y2])];
    }
  }
  return distances;
};

export function exerciseOne(input: string): number {
  return (
    getDistancesBetweenStars(getStarCoordinates(expandGalaxy(parseInput(input)))).reduce(
      (acc, cur) => acc + cur,
      0
    ) / 2
  );
}

export function exerciseTwo(input: string): number {
  return 0;
}
