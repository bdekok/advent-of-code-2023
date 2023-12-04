import { getResults as dayOneResult } from "./day-01/day.ts";
import { getResults as dayTwoResult } from "./day-02/day.ts";
import { getResults as dayThreeResult } from "./day-03/day.ts";
import { getResults as dayFourResult } from "./day-04/day.ts";

export interface Result {
  exerciseOne: number | string;
  exerciseTwo?: number | string;
}

function printResults(result: Result) {
  console.log(JSON.stringify(result, null, 2));
}

async function getDayResults() {
  const day = prompt("Please put in the day of the month you want the answer to:");
  switch (day) {
    case "1":
      return printResults(await dayOneResult());
    case "2":
      return printResults(await dayTwoResult());
    case "3":
      return printResults(await dayThreeResult());
    case "4":
      return printResults(await dayFourResult());
    default:
      return console.log("We don't know the question, but 42 is the answer");
  }
}

getDayResults();
