import { Result } from "../main.ts";
import { getInputOfCurrentDay } from "../utils.ts";

export async function getResults(): Promise<Result> {
  const input = await getInputOfCurrentDay(import.meta.url);
  return {
    exerciseOne: exerciseOne(input),
    exerciseTwo: exerciseTwo(input),
  };
}

function processAllNumbersUntilZero(
  input: number[],
  previousRounds: number[][] = [],
  isFirst = true
) {
  const round = input
    .map((value, index, array) => array[index + 1] - value)
    .filter((x) => !isNaN(x));

  const allRounds = isFirst ? [input, round] : [...previousRounds, round];
  const allZero = round.every((x) => x === 0);
  if (allZero) {
    return allRounds;
  }
  return processAllNumbersUntilZero(round, allRounds, false);
}

function parseInput(input: string): number[][] {
  return input
    .trim()
    .split("\n")
    .map((x) => x.split(" ").map((x) => parseInt(x)));
}

function sum(acc: number, value: number) {
  return acc + value;
}

export function exerciseOne(input: string): number {
  return parseInput(input)
    .map((row) =>
      processAllNumbersUntilZero(row).reduce((acc, value) => sum(acc, value[value.length - 1]), 0)
    )
    .reduce(sum, 0);
}

export function exerciseTwo(input: string): number {
  return parseInput(input)
    .map((row) => {
      return processAllNumbersUntilZero(row)
        .toReversed()
        .reduce((acc, _, index, values) => {
          const nextRow = values[index + 1];
          if (!nextRow) {
            return acc;
          }
          return nextRow[0] - acc;
        }, 0);
    })
    .reduce(sum, 0);
}
