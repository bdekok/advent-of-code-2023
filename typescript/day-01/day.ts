import { Result } from "../main.ts";
import { getInputOfCurrentDay } from "../utils.ts";

export async function getResults(): Promise<Result> {
  const input = await getInputOfCurrentDay(import.meta.url);
  return {
    exerciseOne: exerciseOne(input),
    exerciseTwo: exerciseTwo(input),
  };
}

export function exerciseOne(input: string): number {
  return input
    .split("\n")
    .map((row: string) => row.replace(/[^0-9]/g, ""))
    .map((row: string) => parseInt(row[0] + row[row.length - 1]))
    .reduce((acc: number, val: number) => acc + val, 0);
}

export function exerciseTwo(input: string): number {
  const numberMapping = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };
  return input
    .split("\n")
    .map((row: string) => {
      let numbers = "";
      let letters = "";
      for (const letter of row) {
        letters += letter;

        for (const [key, value] of Object.entries(numberMapping)) {
          if (letters.includes(value) || letters.includes(key)) {
            numbers += value;
            letters = key.substring(1);
          }
        }
      }
      return numbers;
    })
    .map((row: string) => parseInt(row[0] + row[row.length - 1]))
    .reduce((acc: number, val: number) => acc + val, 0);
}
