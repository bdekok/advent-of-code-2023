import { Result } from "../main.ts";
import { getInputOfCurrentDay } from "../utils.ts";

const endKey = "ZZZ";
const startKey = "AAA";

export async function getResults(): Promise<Result> {
  const input = await getInputOfCurrentDay(import.meta.url);
  return {
    exerciseOne: exerciseOne(input),
    exerciseTwo: exerciseTwo(input),
  };
}

function parseInputToInstructionsAndNodeLineStrings(input: string) {
  const [instructions, ...nodeLines] = input.trim().replace("\n\n", "\n").split("\n");

  return {
    instructions: instructions.trim().split(""),
    nodeLines,
  };
}

function parseNodeLineStringsToNodeMap(input: string[]): Map<string, Record<string, string>> {
  const nodeMap = new Map();
  for (const line of input) {
    const [key, values] = line.split(" = ");
    const [L, R] = values
      .replace("(", "")
      .replace(")", "")
      .split(",")
      .map((x) => x.trim());
    nodeMap.set(key, { L, R });
  }
  return nodeMap;
}

function getNodeMapShortestRoute(
  nodeMap: Map<string, Record<string, string>>,
  instructions: string[]
) {
  let currentNode = nodeMap.get(startKey)!;
  let count = 0;

  while (true) {
    const nextDirection = currentNode[instructions[count % instructions.length]];
    currentNode = nodeMap.get(nextDirection)!;
    count = count + 1;
    if (nextDirection === endKey) {
      return count;
    }

    if (count > 500_000) {
      return -1;
    }
  }
}

export function exerciseOne(input: string): number {
  const { instructions, nodeLines } = parseInputToInstructionsAndNodeLineStrings(input);
  const nodeMap = parseNodeLineStringsToNodeMap(nodeLines);
  return getNodeMapShortestRoute(nodeMap, instructions);
}

export function exerciseTwo(input: string): number {
  return 0;
}
