import { assertEquals } from "../depts.ts";
import { getTestInputOfCurrentDay } from "../utils.ts";
import { exerciseOne } from "./day.ts";

Deno.test("Exercise one",async () => {
  const testData = await getTestInputOfCurrentDay(import.meta.url);
  const expected = 6440;
  assertEquals(exerciseOne(testData), expected);
});

// Deno.test("Exercise two", () => {
//   const testData = `two1nine
//   eightwothree
//   abcone2threexyz
//   xtwone3four
//   4nineeightseven2
//   zoneight234
//   7pqrstsixteen
//   `
//   const expected = 281;
//   assertEquals(exerciseTwo(testData), expected);
// });
