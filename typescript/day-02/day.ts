import { Result } from "../main.ts";
import { getInputOfCurrentDay } from "../utils.ts";

export async function getResults(): Promise<Result> {
  const input = await getInputOfCurrentDay(import.meta.url);
  return {
    exerciseOne: exerciseOne(input),
    exerciseTwo: exerciseTwo(input),
  };
}

type GameResult = {
  blue: number[];
  red: number[];
  green: number[];
};

type Color = keyof GameResult;

type GameResults = {
  [index: string]: GameResult;
};

function formatToGames(input: string): GameResults {
  return input.split('\n').reduce((acc, current) => {
    const [index, value] = current.replace('Game ', '').split(':');
    const results = value
      .replaceAll(';', ',')
      .split(',')
      .reduce(
        (acc, value) => {
          const [score, color] = value.trim().split(' ');
          const newColorValue = { [color]: [...acc[color as Color], parseInt(score)] };
          return {
            ...acc,
            ...newColorValue,
          };
        },
        { blue: [], red: [], green: [] }
      );
    return {
      ...acc,
      [index]: results,
    };
  }, {});
}

export function exerciseOne(input: string): number {
  const gameResults = formatToGames(input);
  const blueScoreRequired = 14;
  const redScoreRequired = 12;
  const greenScoreRequired = 13;

  return Object.entries(gameResults).reduce((acc, [index, scores]) => {
    const maxBlue = Math.max(...scores.blue);
    const maxRed = Math.max(...scores.red);
    const maxGreen = Math.max(...scores.green);
  
    if (
      maxBlue <= blueScoreRequired &&
      maxRed <= redScoreRequired &&
      maxGreen <= greenScoreRequired
    ) {
      return acc +  parseInt(index);
    }
    return acc; 
  }, 0);
  
}

export function exerciseTwo(input: string): number {
  const gameResults = formatToGames(input);

  return Object.entries(gameResults).reduce((acc, [_, scores]) => {
    const maxBlue = Math.max(...scores.blue);
    const maxRed = Math.max(...scores.red);
    const maxGreen = Math.max(...scores.green);
    
    return acc + (maxBlue * maxRed * maxGreen)
  }, 0);
  }
