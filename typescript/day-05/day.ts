import { Result } from "../main.ts";
import { getInputOfCurrentDay } from "../utils.ts";

export async function getResults(): Promise<Result> {
  const input = await getInputOfCurrentDay(import.meta.url);
  return {
    exerciseOne: exerciseOne(input),
    exerciseTwo: exerciseTwo(input),
  };
}

function inRange(currentSeedNumber: number, min: number, max: number) {
  return currentSeedNumber >= min && currentSeedNumber < max;
}
function getDestination(sourceNumber: number, min: number, minDestination: number) {
  return sourceNumber - min + minDestination;
}

interface PlantRange {
  min: number;
  max: number;
  destination: number;
}
interface PlantMap {
  [sourceKey: string]: {
    destinationKey: string;
    range: PlantRange[];
  };
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
    const [destination, min, offset] = lineValue.split(" ").map((x) => parseInt(x));
    const plantRange: PlantRange = {
      min,
      max: min + offset,
      destination,
    };

    plantMap[sourceKey].range.push(plantRange);
  }

  return plantMap;
}

const getStartSeeds = (seeds: string): number[] => {
  const [_, seedsString] = seeds.split(": ");
  return seedsString.split(" ").map((seed: string) => parseInt(seed));
};

const getLowestStartSeedsRange = (plantMap: PlantMap, seeds: number[]): number => {
  let lowestSeed = -1;

  for (let seedIndex = 0; seedIndex < seeds.length; seedIndex = seedIndex + 2) {
    const startSeed = seeds[seedIndex];
    const seedLength = seeds[seedIndex + 1];

    for (let seed = startSeed; seed < startSeed + seedLength; seed++) {
      const result: number = traverseSeedWithStack(plantMap, seed);
      if (lowestSeed === -1 || result < lowestSeed) {
        lowestSeed = result;
      }
    }
  }

  return lowestSeed!;
};

const traverseSeedWithStack = (plantMap: PlantMap, seed: number): number => {
  const stack: { key: string; seed: number }[] = [];
  stack.push({ key: startKey, seed });

  while (stack.length > 0) {
    const { key, seed } = stack.pop()!;

    if (key === endKey) {
      return seed;
    }

    const plantWithinRange = plantMap[key].range.find((plant) =>
      inRange(seed, plant.min, plant.max)
    );
    if (plantWithinRange) {
      const { min, destination } = plantWithinRange;
      const newSeed = getDestination(seed, min, destination);
      stack.push({ key: plantMap[key].destinationKey, seed: newSeed });
    } else {
      stack.push({ key: plantMap[key].destinationKey, seed });
    }
  }

  return -1;
};

export function exerciseOne(input: string): number {
  const [start, ...inputRows] = input.trim().split("\n");

  const plantMap = parseInput(inputRows);
  const startSeeds = getStartSeeds(start);

  const result = startSeeds.map((seed) => traverseSeedWithStack(plantMap, seed));

  return Math.min(...result);
}

export function exerciseTwo(input: string): number {
  console.log("start", performance.now());
  const [start, ...inputRows] = input.trim().split("\n");

  const plantMap = parseInput(inputRows);
  const result = getLowestStartSeedsRange(plantMap, getStartSeeds(start));
  console.log("end", performance.now());
  return result;
}
