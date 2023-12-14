import { assertEquals } from "../depts.ts";
import { getTestInputOfCurrentDay } from "../utils.ts";
import { exerciseOne, exerciseTwo } from "./day.ts";

Deno.test("Exercise one",async () => {
  const testData = await getTestInputOfCurrentDay(import.meta.url);
  const expected = 374;
  assertEquals(exerciseOne(testData), expected);
});

Deno.test("Exercise two - 1",async () => {
  const testData = await getTestInputOfCurrentDay(import.meta.url);
  const expected = 1030;
  assertEquals(exerciseTwo(testData, 10), expected);
})

Deno.test("Exercise two - 2",async () => {
  const testData = await getTestInputOfCurrentDay(import.meta.url);
  const expected = 8410;
  assertEquals(exerciseTwo(testData, 100), expected);
})
