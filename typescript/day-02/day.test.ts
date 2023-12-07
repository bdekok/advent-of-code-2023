import { assertEquals } from "../depts.ts";
import { getTestInputOfCurrentDay } from "../utils.ts";
import { exerciseOne, exerciseTwo } from "./day.ts";


Deno.test("Exercise one", async() => {
  const testData = await getTestInputOfCurrentDay(import.meta.url);
  const expected = 8;
  assertEquals(exerciseOne(testData), expected);
});

Deno.test("Exercise two", async() => {
  const testData = await getTestInputOfCurrentDay(import.meta.url);
  const expected = 2286;
  assertEquals(exerciseTwo(testData), expected);
});
