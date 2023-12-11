import { Result } from "../main.ts";
import { getInputOfCurrentDay } from "../utils.ts";

export async function getResults(): Promise<Result> {
  const input = await getInputOfCurrentDay(import.meta.url);
  return {
    exerciseOne: exerciseOne(input),
    exerciseTwo: exerciseTwo(input),
  };
}


const pipeTypes = {
  vertical: "┃",
  horizontal: "━",
  bottomLeft: "┗",
  bottomRight: "┛",
  topLeft: "┏",
  topRight: "┓",
  ground: ".",
  start: "S",
} as const;

interface Coordinate {
  x: number;
  y: number;
  value: string;
}

interface MazePosition extends Coordinate {
  // value: string;
  isStart: boolean;
  traversedPath: Coordinate[];
}

const mapStringToPipeType = (value: string) => {
  switch (value) {
    case "|":
      return pipeTypes.vertical;
    case "-":
      return pipeTypes.horizontal;
    case "L":
      return pipeTypes.bottomLeft;
    case "J":
      return pipeTypes.bottomRight;
    case "F":
      return pipeTypes.topLeft;
    case "7":
      return pipeTypes.topRight;
    case ".":
      return pipeTypes.ground;
    case "S":
      return pipeTypes.start;
    default:
      throw new Error(`Unknown pipe type ${value}`);
  }
};

function parseInputAndAddPadding(input: string): MazePosition[][] {
  const rows = input.trim().split("\n");
  const padding = ".".repeat(rows[0].length);

  return [padding, ...rows, padding].map((rowValue, y) => {
    return [".", ...rowValue.split(""), "."].map((columnValue, x) => ({
      x,
      y,
      value: mapStringToPipeType(columnValue),
      isStart: columnValue === pipeTypes.start,
      traversedPath: [],
    }));
  });
}

export const traverseMaze = (
  matrix: MazePosition[][],
  start: MazePosition,
  compareFn: (currentValue: MazePosition, neighbourValue: MazePosition) => boolean
) => {
  const queue = [{ ...start }];
  const visited: Set<string> = new Set();
  visited.add(`${start.x},${start.y}`);

  // let longestPathLength = 0;
  const traversedRoutesWithMaxLengths: Map<
    Coordinate,
    { length: number; traversedPath: Coordinate[] }
  > = new Map();
  while (queue.length > 0) {
    const current: MazePosition = queue.shift()!;
    const { x, y, value, traversedPath } = current;


    const topNeighbour = matrix[y][x - 1];
    const rightNeighbour = matrix[y + 1][x];
    const bottomNeighbour = matrix[y][x + 1];
    const leftNeighbour = matrix[y - 1][x];

    for (const neighbour of [topNeighbour, rightNeighbour, bottomNeighbour, leftNeighbour]) {
      const isVisited = visited.has(`${neighbour.x},${neighbour.y}`);
      const isAccessible = compareFn(current, neighbour);

      if (!isVisited && isAccessible) {
        queue.push({ ...neighbour, traversedPath: [...traversedPath, { x, y, value }] });
        visited.add(`${neighbour.x},${neighbour.y}`);
      }
      if (isVisited && isAccessible) {
        const endKey = traversedPath[traversedPath.length - 1];
        const currentValue = traversedRoutesWithMaxLengths.get(endKey);

        const length = traversedPath.length + 1;

        if (!currentValue || currentValue.length < length) {
          traversedRoutesWithMaxLengths.set(endKey, {
            length,
            traversedPath: [...traversedPath, { x, y, value }],
          });
        }
      }
    }
  }
  return Array.from(traversedRoutesWithMaxLengths).map(
    ([endCoordinate, { traversedPath, length }]) => ({
      endCoordinate,
      traversedPath,
      length,
    })
  );
};

function findStartPosition(input: MazePosition[][]): MazePosition {
  for (const row of input) {
    const start: MazePosition | undefined = row.find(({ isStart }) => isStart);
    if (start) {
      return start;
    }
  }

  return input.find((row) => row.some(({ isStart }) => isStart))![0];
}

function canTraverse(current: Coordinate, neighbour: Coordinate) {
  if (neighbour.value === pipeTypes.ground) {
    return false;
  }

  const goesUp = current.y > neighbour.y;
  const goesDown = current.y < neighbour.y;
  const goesLeft = current.x > neighbour.x;
  const goesRight = current.x < neighbour.x;

  const isHorizontalMovement = goesLeft || goesRight;
  const isVerticalMovement = goesUp || goesDown;

  if (current.value === pipeTypes.start) {
    return (
      (isHorizontalMovement && neighbour.value === pipeTypes.horizontal) ||
      (isVerticalMovement && neighbour.value === pipeTypes.vertical) ||
      (goesLeft && neighbour.value === pipeTypes.bottomLeft) ||
      (goesLeft && neighbour.value === pipeTypes.topLeft) ||
      (goesRight && neighbour.value === pipeTypes.bottomRight) ||
      (goesRight && neighbour.value === pipeTypes.topRight) ||
      (goesUp && neighbour.value === pipeTypes.topLeft) ||
      (goesUp && neighbour.value === pipeTypes.topRight) ||
      (goesDown && neighbour.value === pipeTypes.bottomLeft) ||
      (goesDown && neighbour.value === pipeTypes.bottomRight)
    );
  }

  if (current.value === pipeTypes.vertical) {
    return (
      (goesUp && neighbour.value === pipeTypes.topLeft) ||
      (goesUp && neighbour.value === pipeTypes.topRight) ||
      (goesDown && neighbour.value === pipeTypes.bottomLeft) ||
      (goesDown && neighbour.value === pipeTypes.bottomRight) ||
      (isVerticalMovement && neighbour.value === pipeTypes.vertical)
    );
  }

  if (current.value === pipeTypes.horizontal) {
    return (
      (goesLeft && neighbour.value === pipeTypes.topLeft) ||
      (goesLeft && neighbour.value === pipeTypes.bottomLeft) ||
      (goesRight && neighbour.value === pipeTypes.topRight) ||
      (goesRight && neighbour.value === pipeTypes.bottomRight) ||
      (isHorizontalMovement && neighbour.value === pipeTypes.horizontal)
    );
  }

  if (current.value === pipeTypes.bottomRight) {
    // ┘
    return (
      (goesUp && neighbour.value === pipeTypes.topLeft) ||
      (goesLeft && neighbour.value === pipeTypes.topLeft) ||
      (goesUp && neighbour.value === pipeTypes.topRight) ||
      (goesUp && neighbour.value === pipeTypes.vertical) ||
      (goesLeft && neighbour.value === pipeTypes.bottomLeft) ||
      (goesLeft && neighbour.value === pipeTypes.horizontal)
    );
  }
  if (current.value === pipeTypes.topLeft) {
    // ┌
    return (
      (goesRight && neighbour.value === pipeTypes.bottomRight) ||
      (goesDown && neighbour.value === pipeTypes.bottomRight) ||
      (goesRight && neighbour.value === pipeTypes.horizontal) ||
      (goesRight && neighbour.value === pipeTypes.topRight) ||
      (goesDown && neighbour.value === pipeTypes.vertical) ||
      (goesDown && neighbour.value === pipeTypes.bottomLeft)
    );
  }
  if (current.value === pipeTypes.bottomLeft) {
    // └
    return (
      (goesUp && neighbour.value === pipeTypes.topRight) ||
      (goesRight && neighbour.value === pipeTypes.topRight) ||
      (goesRight && neighbour.value === pipeTypes.bottomRight) ||
      (goesRight && neighbour.value === pipeTypes.horizontal) ||
      (goesUp && neighbour.value === pipeTypes.vertical) ||
      (goesUp && neighbour.value === pipeTypes.topLeft)
    );
  }

  if (current.value === pipeTypes.topRight) {
    // ┐
    return (
      (goesDown && neighbour.value === pipeTypes.bottomLeft) ||
      (goesLeft && neighbour.value === pipeTypes.bottomLeft) ||
      (goesDown && neighbour.value === pipeTypes.vertical) ||
      (goesLeft && neighbour.value === pipeTypes.horizontal) ||
      (goesLeft && neighbour.value === pipeTypes.topLeft) ||
      (goesDown && neighbour.value === pipeTypes.bottomRight)
    );
  }
  return false;
}

function getLongestConnectedRoutes(
  routes: {
    endCoordinate: Coordinate;
    traversedPath: Coordinate[];
    length: number;
  }[],
  compareFn: (currentValue: Coordinate, neighbourValue: Coordinate) => boolean = canTraverse
) {
  let longestRoute: Coordinate[] = [];
  let maxLength = 0;
  for (let i = 0; i < routes.length; i++) {
    for (let j = i + 1; j < routes.length; j++) {
      if (routes[i].traversedPath[0] === routes[j].traversedPath[0]) {
        continue;
      }
      const isConnected = compareFn(routes[i].endCoordinate, routes[j].endCoordinate);

      if (isConnected) {
        const newLength = routes[i].length + routes[j].length;
        if (newLength > maxLength) {
          longestRoute = [...routes[i].traversedPath, ...routes[j].traversedPath.toReversed()];
          maxLength = newLength;
        }
      }
    }
  }
  return longestRoute;
}

function printablePath(originalInput: MazePosition[][], path: Coordinate[]) {
  return originalInput
    .map((row) =>
      row
        .map(({ x, y }) => {
          const isPath = path.find((p) => p.x === x && p.y === y);
          if (isPath) {
            return isPath.value;
          }
          return ".";
        })
        .join("")
    )
    .join("\n");
}

export function exerciseOne(input: string): number {
  const parsedInput = parseInputAndAddPadding(input);
  const startPosition = findStartPosition(parsedInput);
  const path = getLongestConnectedRoutes(traverseMaze(parsedInput, startPosition, canTraverse));
  
  console.log(printablePath(parsedInput, path));
  return Math.floor(path.length / 2);
}

export function exerciseTwo(input: string): number {
  return -1;
}
