import { Result } from "../main.ts";
import { getInputOfCurrentDay } from "../utils.ts";

export async function getResults(): Promise<Result> {
  const input = await getInputOfCurrentDay(import.meta.url);
  return {
    exerciseOne: exerciseOne(input),
    exerciseTwo: exerciseTwo(input),
  };
}

function getWinningNumbers(winningNumbersString: string): number[] {
  return winningNumbersString.match(/\d+/g)!.map((number) => parseInt(number));
}

type ScratchCard = {
  gameIndex: string;
  winningNumbers: number[];
  currentNumbers: number[];
  matchingNumbers: number[];
  amount: number;
};

function getScores(input: string): ScratchCard[] {
  const rows = input.split("\n");

  return rows.map((row) => {
    const [gameIndex, winningNumbersString, currentNumbersString] = row
      .trim()
      .replace(":", "|")
      .split("|");
    const winningNumbers = getWinningNumbers(winningNumbersString);
    const currentNumbers = getWinningNumbers(currentNumbersString);
    const matchingNumbers = winningNumbers.filter((number) => currentNumbers.includes(number));

    return {
      gameIndex,
      winningNumbers,
      currentNumbers,
      matchingNumbers,
      amount: 1,
    };
  });
}

export function exerciseOne(input: string): number {
  return getScores(input).reduce((acc, { matchingNumbers }) => {
    const score = matchingNumbers.reduce((acc) => (acc === 0 ? 1 : acc * 2), 0);
    return acc + score;
  }, 0);
}

export function exerciseTwo(input: string): number {
  const scores = getScores(input);

  return scores.reduce((acc, { matchingNumbers, amount }, scoreIndex) => {
    for (let index = scoreIndex; index < scoreIndex + matchingNumbers.length; index++) {
      const nextScore = scores[index + 1];
      if (nextScore) {
        nextScore.amount = nextScore.amount + amount;
      }
    }
    return acc + amount;
  }, 0);
}
