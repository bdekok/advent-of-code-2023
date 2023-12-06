import { assertEquals } from "../depts.ts";
import { getTestInputOfCurrentDay } from "../utils.ts";
import { exerciseOne, exerciseTwo } from "./day.ts";

Deno.test("Exercise one combines the first digit and the last digit to form a single two-digit number and then sums the lines.",async () => {
  const testData = await getTestInputOfCurrentDay(import.meta.url);
  const expected = 288;
  assertEquals(exerciseOne(testData), expected);
});

Deno.test("Exercise one combines the first digit and the last digit to form a single two-digit number and then sums the lines.",async () => {
  const testData = await getTestInputOfCurrentDay(import.meta.url);
  const expected = 71503;
  assertEquals(exerciseTwo(testData), expected);
});
