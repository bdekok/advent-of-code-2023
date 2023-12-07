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

const cardScores: Record<string, number>= {
  'A': 14,
  'K': 13,
  'Q': 12,
  'J': 11,
  'T': 10,
  '9': 9,
  '8': 8,
  '7': 7,
  '6': 6,
  '5': 5,
  '4': 4,
  '3': 3,
  '2': 2,
}

// type CardScorekey = keyof typeof cardScores;
// type CardScore = (typeof cardScores)[keyof typeof cardScores];

type Card = {
  roll: string[];
  type: CardType;
};

const getNumberCount = (roll: string[]): number[] => {
  return Object.values(
    roll.toSorted().reduce((acc, currentNumber, index, array) => {
      const nextNumber = array[index + 1];
      if (!acc[currentNumber]) {
        acc[currentNumber] = 1;
      }
      if (currentNumber === nextNumber) {
        acc[currentNumber] = acc[currentNumber] + 1;
      }
      return acc;
    }, {} as Record<string, number>)
  );
};

const hasXOfAKind = (numberCount: number[], x: number): boolean => {
  return numberCount.some((count) => count === x);
};

const hasTwoPair = (numberCount: number[]): boolean => {
  const result = numberCount.filter((count) => count === 2);
  console.log({ result, numberCount });

  return result.length === 2;
};

const getCard = (roll: string[]): Card => {
  const numberCount = getNumberCount(roll);
  let type: CardType = cardTypes.highCard;

  if (hasXOfAKind(numberCount, 5)) {
    return { roll, type: cardTypes.fiveOfAKind };
  }
  if (hasXOfAKind(numberCount, 4)) {
    return { roll, type: cardTypes.fourOfAKind };
  }
  if (hasXOfAKind(numberCount, 3) && hasXOfAKind(numberCount, 2)) {
    return { roll, type: cardTypes.fullHouse };
  }
  if (hasXOfAKind(numberCount, 3)) {
    return { roll, type: cardTypes.threeOfAKind };
  }
  if (hasTwoPair(numberCount)) {
    return { roll, type: cardTypes.twoPairs };
  }
  if (hasXOfAKind(numberCount, 2)) {
    return { roll, type: cardTypes.pair };
  }
  return {
    roll,
    type,
  };
};

export function exerciseOne(input: string): number {
  const result = input
    .trim()
    .split("\n")
    .map((row: string) => {
      const [cards, score] = row.split(" ");
      const card = getCard(cards.split(""));
      return {
        card,
        score,
      };
    })
    .toSorted((a, b) => {
      if (a.card.type === b.card.type) {
        for (let i = 0; i < a.card.roll.length; i++) {

          const cardScoreA = cardScores[a.card.roll[i]]
          const cardScoreB = cardScores[b.card.roll[i]]
          if (cardScoreA === cardScoreB) {
            continue;
          }
          return cardScoreA > cardScoreB ? -1 : 1;
        }
      }
      return b.card.type - a.card.type;
    }).map((x, index, a) => {
      return {
        ...x,
        rank: a.length - index
      };
    }).toReversed()
    
  

  console.log({result})
  // console.log(getNumberCount(["a", "2", "b", "1", "2"]));
  return result.reduce((acc, { score }, index) => {
    return acc + parseInt(score) * (index + 1);
  }, 0);
}

export function exerciseTwo(input: string): number {}
