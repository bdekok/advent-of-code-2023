import { Result } from "../main.ts";
import { getInputOfCurrentDay } from "../utils.ts";

export async function getResults(): Promise<Result> {
  const input = await getInputOfCurrentDay(import.meta.url);
  return {
    exerciseOne: exerciseOne(input),
    exerciseTwo: exerciseTwo(input),
  };
}

const getWinningCount = (time: number, distanceRecord: number) => {
  let winningSecondsCount = 0;

  for (let passedTime = 0; passedTime < time; passedTime++) {
    const remainingTime = time - passedTime;
    const distance = remainingTime * passedTime;
  
    if (distance > distanceRecord) {
      winningSecondsCount++;
    }
  }
  
  return winningSecondsCount;
};

const parseRowToNumbers = (row: string) =>
  row
    .split(/\D+/)
    .filter(Boolean)
    .map((x) => parseInt(x));

const parseRowToNumber = (row: string) =>
  parseInt(row.match(/\d.+/)?.toString().replaceAll(" ", "")!);

export function exerciseOne(input: string): number {
  const [timeRow, distanceRow] = input.split("\n");
  const times = parseRowToNumbers(timeRow);
  const distances = parseRowToNumbers(distanceRow);

  return times
    .map((time, index) => getWinningCount(time, distances[index]))
    .reduce((acc, cur) => acc * cur, 1);
}

export function exerciseTwo(input: string): number {
  const [timeRow, distanceRow] = input.split("\n");

  return getWinningCount(parseRowToNumber(timeRow), parseRowToNumber(distanceRow));
}
