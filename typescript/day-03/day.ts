import { Result } from "../main.ts";
import { getInputOfCurrentDay } from "../utils.ts";

export async function getResults(): Promise<Result> {
  const input = await getInputOfCurrentDay(import.meta.url);
  return {
    exerciseOne: exerciseOne(input),
    exerciseTwo: exerciseTwo(input),
  };
}

type Coordinate = {
  x: number;
  y: number;
};

type NumberWithIndex = {
  value: string;
  index: number;
};

const numberRegex = /\d+/g;

function findNumbersWithIndices(inputString: string): NumberWithIndex[] {
  const matches: NumberWithIndex[] = [];
  let match;

  while ((match = numberRegex.exec(inputString)) !== null) {
    matches.push({ value: match[0], index: match.index });
  }

  return matches;
}
type NumberInMatrix = {
  value: number;
  neighbours: Coordinate[];
};

function getNumbersInMatrix(rows: string[]): NumberInMatrix[] {
  const result: NumberInMatrix[] = [];
  for (let y = 0; y < rows.length; y++) {
    const row = rows[y].trim();
    const numbersInRow = findNumbersWithIndices(row);

    if (numbersInRow) {
      for (const number of numbersInRow) {
        const numberStartIndex = number.index;
        const numberEndIndex = numberStartIndex + number.value.length;
        const neighbours: Coordinate[] = [];

        for (let x = numberStartIndex; x < numberEndIndex; x++) {
          const isEndOfLine = x === row.length - 1;
          const isStartOfLine = x === 0;
          const isEndOfRow = y === rows.length - 1;
          const isStartOfRow = y === 0;
          const isLastDigit = x === numberEndIndex - 1;
          const isFirstDigit = x === numberStartIndex;

          // Coordinates of the row above
          if (!isStartOfRow) {
            neighbours.push({ x, y: y - 1 });
          }
          // Coordinates of the row below
          if (!isEndOfRow) {
            neighbours.push({ x, y: y + 1 });
          }
          // Coordinates to the left
          if (!isStartOfLine && isFirstDigit) {
            neighbours.push({ x: x - 1, y });
          }
          // Coordinates to the right
          if (!isEndOfLine && isLastDigit) {
            neighbours.push({ x: x + 1, y });
          }
          // Diagonal coordinates to the top left
          if (!isStartOfRow && !isStartOfLine && isFirstDigit) {
            neighbours.push({ x: x - 1, y: y - 1 });
          }
          // Diagonal coordinates to the top right
          if (!isStartOfRow && !isEndOfLine && isLastDigit) {
            neighbours.push({ x: x + 1, y: y - 1 });
          }
          // Diagonal coordinates to the bottom left
          if (!isEndOfRow && !isStartOfLine && isFirstDigit) {
            neighbours.push({ x: x - 1, y: y + 1 });
          }
          // Diagonal coordinates to the bottom right
          if (!isEndOfRow && !isEndOfLine && isLastDigit) {
            neighbours.push({ x: x + 1, y: y + 1 });
          }
        }
        result.push({ value: parseInt(number.value), neighbours });
      }
    }
  }
  return result;
}

export function exerciseOne(input: string): number {
  const rows = input.split("\n");

  return getNumbersInMatrix(rows)
    .filter((number) =>
      number.neighbours.some(({ x, y }) => {
        const neighbouringValue = rows[y].trim().charAt(x);
        const isNumber = numberRegex.test(neighbouringValue);
        const isDot = neighbouringValue === ".";

        return !isNumber && !isDot;
      })
    )
    .reduce((acc, { value }) => {
      return acc + value;
    }, 0);
}

type ValuesWithStars = {
  value: number;
  stars: Coordinate;
};

export function exerciseTwo(input: string): number {
  const rows = input.split("\n");

  return getNumbersInMatrix(rows)
    .reduce((acc, { value, neighbours }) => {
      const stars = neighbours.find(({ x, y }) => {
        const neighbouringValue = rows[y].trim().charAt(x);
        return neighbouringValue === "*";
      });

      if (stars) {
        return [...acc, { value, stars }];
      }
      return acc;
    }, [] as ValuesWithStars[])
    .reduce((acc, current, currentIndex, array) => {
      const duplicateStar = array.find(({ stars }, index) => {
        return stars.x === current.stars.x && stars.y === current.stars.y && index !== currentIndex;
      });
      if (duplicateStar) {
        const dedupeScoreByDividingByTwo = 2;
        return acc + (current.value * duplicateStar.value) / dedupeScoreByDividingByTwo;
      }
      return acc;
    }, 0);
}
