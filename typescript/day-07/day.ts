import { Result } from "../main.ts";
import { getInputOfCurrentDay } from "../utils.ts";

export async function getResults(): Promise<Result> {
  const input = await getInputOfCurrentDay(import.meta.url);
  return {
    exerciseOne: exerciseOne(input),
    exerciseTwo: exerciseTwo(input),
  };
}

const cardTypes = {
  fiveOfAKind: 7,
  fourOfAKind: 6,
  fullHouse: 5,
  threeOfAKind: 4,
  twoPairs: 3,
  pair: 2,
  highCard: 1,
} as const;

type CardType = (typeof cardTypes)[keyof typeof cardTypes];

const cardScores: Record<string, number> = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  "9": 9,
  "8": 8,
  "7": 7,
  "6": 6,
  "5": 5,
  "4": 4,
  "3": 3,
  "2": 2,
};

const cardScoresWithJokers: Record<string, number> = {
  ...cardScores,
  J: 1,
};

type Card = {
  roll: string[];
  type: CardType;
};

const getNumberCount = (roll: string[]): Record<string, number> => {
  return roll.toSorted().reduce((acc, currentNumber, index, array) => {
    const nextNumber = array[index + 1];
    if (!acc[currentNumber]) {
      acc[currentNumber] = 1;
    }
    if (currentNumber === nextNumber) {
      acc[currentNumber] = acc[currentNumber] + 1;
    }
    return acc;
  }, {} as Record<string, number>);
};

const hasXOfAKind = (
  numberCount: Record<string, number>,
  x: number,
  withJokers: boolean
): boolean => {
  for (const index in numberCount) {
    const count = numberCount[index];

    if (withJokers && index !== "J" && (count === x || count + numberCount.J === x)) {
      return true;
    }

    if (count === x) {
      return true;
    }
  }
  return false;
};

const hasTwoPair = (numberCount: Record<string, number>): boolean => {
  return (
    Object.values(numberCount).filter((count) => {
      return count === 2;
    }).length === 2
  );
};

function isFullHouse(numberCount: Record<string, number>, withJokers: boolean): boolean {
  const uniqueValues = new Set(Object.keys(numberCount));
  return uniqueValues.size === 2 || withJokers && (uniqueValues.size === 3 && uniqueValues.has("J"));
}
const getCard = (roll: string[], withJokers: boolean): Card => {
  const numberCount = getNumberCount(roll);

  if (hasXOfAKind(numberCount, 5, withJokers)) {
    return { roll, type: cardTypes.fiveOfAKind };
  }
  if (hasXOfAKind(numberCount, 4, withJokers)) {
    return { roll, type: cardTypes.fourOfAKind };
  }
  if (isFullHouse(numberCount, withJokers)) {
    return { roll, type: cardTypes.fullHouse };
  }
  if (hasXOfAKind(numberCount, 3, withJokers)) {
    return { roll, type: cardTypes.threeOfAKind };
  }
  if (hasTwoPair(numberCount)) {
    return { roll, type: cardTypes.twoPairs };
  }
  if (hasXOfAKind(numberCount, 2, withJokers)) {
    return { roll, type: cardTypes.pair };
  }
  return { roll, type: cardTypes.highCard };
};

type GetTotalWinningsArgs = {
  input: string;
  hasJokers: boolean;
};

function getTotalWinnings({ input, hasJokers }: GetTotalWinningsArgs): number {
  const cardScore = hasJokers ? cardScoresWithJokers : cardScores;

  return input
    .trim()
    .split("\n")
    .map((row: string) => {
      const [cards, bid] = row.split(" ");
      const card = getCard(cards.split(""), hasJokers);
      return { card, bid };
    })
    .toSorted((a, b) => {
      if (a.card.type === b.card.type) {
        for (let i = 0; i < a.card.roll.length; i++) {
          const cardScoreA = cardScore[a.card.roll[i]];
          const cardScoreB = cardScore[b.card.roll[i]];
          if (cardScoreA === cardScoreB) {
            continue;
          }
          return cardScoreA > cardScoreB ? -1 : 1;
        }
      }
      return b.card.type - a.card.type;
    })
    .map((x, index, a) => ({ ...x, rank: a.length - index }))
    .reduce((acc, { bid, rank }) => acc + parseInt(bid) * rank, 0);
}

export function exerciseOne(input: string): number {
  return getTotalWinnings({ input, hasJokers: false });
}

export function exerciseTwo(input: string): number {
  return getTotalWinnings({ input, hasJokers: true });
}
