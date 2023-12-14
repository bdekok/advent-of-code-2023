import { assertEquals } from "../depts.ts";
import { getTestInputOfCurrentDay } from "../utils.ts";
import { exerciseOne } from "./day.ts";

Deno.test("Exercise one",async () => {
  const testData = await getTestInputOfCurrentDay(import.meta.url);
  const expected = 374;
  assertEquals(exerciseOne(testData), expected);
});


