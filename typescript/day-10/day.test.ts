import { assertEquals } from "../depts.ts";
import { getTestInputOfCurrentDay } from "../utils.ts";
import { exerciseOne } from "./day.ts";

Deno.test("Exercise one - 1",async () => {
  const testData = await getTestInputOfCurrentDay(import.meta.url);
  const expected = 4;
  assertEquals(exerciseOne(testData), expected);
});

Deno.test("Exercise one - 2",async () => {
  const testData = await getTestInputOfCurrentDay(import.meta.url, 'input-test-2.txt');
  const expected = 8;
  assertEquals(exerciseOne(testData), expected);
});
Deno.test("Exercise one - 3",async () => {
  const testData = await getTestInputOfCurrentDay(import.meta.url, 'input-test-3.txt');
  const expected = 13;
  assertEquals(exerciseOne(testData), expected);
});

// 224 too low
// 225 too low
// 226 too low
// 6710 nope
// 6711 nope
// 6710 nope
// 6711 nope
