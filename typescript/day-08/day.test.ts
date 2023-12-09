import { assertEquals } from "../depts.ts";
import { getTestInputOfCurrentDay } from "../utils.ts";
import { exerciseOne } from "./day.ts";

Deno.test("Exercise one - 1", async () => {
  const testData = await getTestInputOfCurrentDay(import.meta.url);
  const expected = 6;
  assertEquals(exerciseOne(testData), expected);
});

Deno.test("Exercise one - 2", async () => {
  const testData = await getTestInputOfCurrentDay(import.meta.url, "input-test-2.txt");
  const expected = 2;
  assertEquals(exerciseOne(testData), expected);
});

Deno.test('Exercise one - answer', async () => {
  const testData = await getTestInputOfCurrentDay(import.meta.url, "input.txt");
  const expected = 22357;
  assertEquals(exerciseOne(testData), expected);
})
