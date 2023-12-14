import { getResults as dayOneResult } from "./day-01/day.ts";
import { getResults as dayTwoResult } from "./day-02/day.ts";
import { getResults as dayThreeResult } from "./day-03/day.ts";
import { getResults as dayFourResult } from "./day-04/day.ts";
import { getResults as dayFiveResult } from "./day-05/day.ts";
import { getResults as daySixResult } from "./day-06/day.ts";
import { getResults as daySevenResult } from "./day-07/day.ts";
import { getResults as dayEightResult } from "./day-08/day.ts";
import { getResults as dayNineResult } from "./day-09/day.ts";
import { getResults as dayTenResult } from "./day-10/day.ts";
import { getResults as dayElevenResult } from "./day-11/day.ts";

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
    case "5":
      return printResults(await dayFiveResult());
    case "6":
      return printResults(await daySixResult());
    case "7":
      return printResults(await daySevenResult());
    case "8":
      return printResults(await dayEightResult());
    case "9":
      return printResults(await dayNineResult());
    case "10":
      return printResults(await dayTenResult());
    case "11":
      return printResults(await dayElevenResult());
    default: 
      return console.log("We don't know the question, but 42 is the answer");
  }
}

getDayResults();
