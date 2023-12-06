import { Result } from "../main.ts";
import { getInputOfCurrentDay } from "../utils.ts";

export async function getResults(): Promise<Result> {
  const input = await getInputOfCurrentDay(import.meta.url);
  return {
    exerciseOne: 0,
    exerciseTwo: exerciseTwo(input),
  };
}

class PlantRange {
  minSource: number;
  maxSource: number;
  minDestination: number;

  constructor(minSource: number, offset: number, minDestination: number) {
    this.minSource = minSource;
    this.maxSource = minSource + offset;
    this.minDestination = minDestination;
  }

  inRange(sourceNumber: number) {
    return sourceNumber >= this.minSource && sourceNumber <= this.maxSource;
  }
  getDestination(sourceNumber: number) {
    return sourceNumber - this.minSource + this.minDestination;
  }
}
interface PlantMap {
  [sourceKey: string]: {
    destinationKey: string;
    range: PlantRange[];
  }
}

const startKey = "seed";
const endKey = "location";

function parseInput(inputRows: string[]): PlantMap {
  const plantMap: PlantMap = {};
  let destinationKey = "";
  let sourceKey = startKey;

  for (const line of inputRows) {
    const lineValue = line.trim();
    if (!lineValue) {
      continue;
    }
    const isNewKey = lineValue.includes("map");
    if (isNewKey) {
      [sourceKey, destinationKey] = line.replace(" map:", "").split("-to-");
      plantMap[sourceKey] = {
        destinationKey: destinationKey,
        range: [],
      };
      continue;
    }
    const [minDestination, minSource, offset] = lineValue.split(" ").map((x) => parseInt(x));
    const plantRange = new PlantRange(minSource, offset, minDestination);

    plantMap[sourceKey].range.push(plantRange);
  }

  return plantMap;
}

const getStartSeeds = (seeds: string): number[] => {
  const [_, seedsString] = seeds.split(": ");
  return seedsString.split(" ").map((seed: string) => parseInt(seed));
};

const getStartSeedsRange = (seeds: number[]): number[] => {
  const [firstStart, firstRange, secondStart, secondRange] = seeds;

  const getRange = (start: number, range: number) => new Array(range).fill(0).map((_, index) => start + index)

  return [...getRange(firstStart, firstRange), ...getRange(secondStart, secondRange)];
}

const traverseSeed = (plantMap: PlantMap, key: string, seed: number): number => {
  if (key === endKey) {
    return seed;
  }

  const { range, destinationKey } = plantMap[key];
  const withinRange = range.find((plantRange) => plantRange.inRange(seed));
  if (withinRange) {
    const destination = withinRange.getDestination(seed);
    return traverseSeed(plantMap, destinationKey, destination);
  }
  return traverseSeed(plantMap, destinationKey, seed);
};

const traverseSeedWithStack = (plantMap: PlantMap, seed: number): number => {
  const stack: { key: string; seed: number }[] = [];
  stack.push({ key: startKey, seed });

  while (stack.length > 0) {
    const { key, seed } = stack.pop()!;

    if (key === endKey) {
      return seed;
    }

    const { range, destinationKey } = plantMap[key];
    const withinRange = range.find((plantRange) => plantRange.inRange(seed));

    if (withinRange) {
      const destination = withinRange.getDestination(seed);
      stack.push({ key: destinationKey, seed: destination });
    } else {
      stack.push({ key: destinationKey, seed });
    }
  }

  return -1; 
}


export function exerciseOne(input: string): number {
  const [start, ...inputRows] = input.trim().split("\n");

  const plantMap = parseInput(inputRows);
  const startSeeds = getStartSeeds(start);  
  const results = startSeeds.map((seed) => traverseSeedWithStack(plantMap, seed))

  return Math.min(...results);
}

export function exerciseTwo(input: string): number {
  const [start, ...inputRows] = input.trim().split("\n");

  const plantMap = parseInput(inputRows);
  const startSeeds = getStartSeedsRange(getStartSeeds(start));
 
  let lowestSeed: number | undefined;

  for (const seed of startSeeds) {
    let result: number | undefined = traverseSeedWithStack(plantMap, seed);
    if (!lowestSeed || result < lowestSeed) {
      lowestSeed = result;
    }
    result = undefined;
  }

  return lowestSeed!;
}
