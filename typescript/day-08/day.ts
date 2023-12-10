import { Result } from "../main.ts";
import { getInputOfCurrentDay } from "../utils.ts";

const endKey = "ZZZ";
const startKey = "AAA";
const ghostStartKeys = "ghost-start";
const ghostStartKey = "A";
const ghostEndKey = "Z";

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

    if (key.slice(-1) === ghostStartKey) {
      const ghostStart = nodeMap.get(ghostStartKeys) || {};
      nodeMap.set(ghostStartKeys, { ...ghostStart, [key]: key });
    }
  }
  return nodeMap;
}

function getNodeMapShortestRoute(
  nodeMap: Map<string, Record<string, string>>,
  instructions: string[],
  startKey: string,
  endKey: string
) {
  let currentNode = nodeMap.get(startKey)!;
  let count = 0;

  while (true) {
    const nextDirection = currentNode[instructions[count % instructions.length]];
    currentNode = nodeMap.get(nextDirection)!;
    count = count + 1;
    if (nextDirection.endsWith(endKey)) {
      return count;
    }

    if (count > 1_000_000) {
      console.error("reached max depth");
      return;
    }
  }
}

export function exerciseOne(input: string): number {
  const { instructions, nodeLines } = parseInputToInstructionsAndNodeLineStrings(input);
  const nodeMap = parseNodeLineStringsToNodeMap(nodeLines);
  return getNodeMapShortestRoute(nodeMap, instructions, startKey, endKey)!;
}

function calculateGreatestCommonDiviser(a: number, b: number): number {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function calculateLowestCommonMultiple(a: number, b: number): number {
  return (a * b) / calculateGreatestCommonDiviser(a, b);
}

function calculateSharedSteps(steps: number[]): number {
  return steps.reduce((acc, step) => calculateLowestCommonMultiple(acc, step), steps[0]);
}

export function exerciseTwo(input: string): number {
  const { instructions, nodeLines } = parseInputToInstructionsAndNodeLineStrings(input);
  const nodeMap = parseNodeLineStringsToNodeMap(nodeLines);

  const startKeys = Object.values(nodeMap.get(ghostStartKeys)!);
  const routeCount = startKeys.map(
    (key) => getNodeMapShortestRoute(nodeMap, instructions, key, ghostEndKey)!
  );
  return calculateSharedSteps(routeCount);
}
