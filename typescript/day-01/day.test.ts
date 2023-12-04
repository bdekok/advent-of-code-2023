import { assertEquals } from "../depts.ts";
import { exerciseOne, exerciseTwo } from "./day.ts";

Deno.test("Exercise one combines the first digit and the last digit to form a single two-digit number and then sums the lines.", () => {
  const testData = `1abc2
  pqr3stu8vwx
  a1b2c3d4e5f
  treb7uchet`
  const expected = 142;
  assertEquals(exerciseOne(testData), expected);
});

Deno.test("Exercise two combines the first digit  and the last digit to form a single two-digit number and then sums the lines. The digits can be written out in text like 'one'", () => {
  const testData = `two1nine
  eightwothree
  abcone2threexyz
  xtwone3four
  4nineeightseven2
  zoneight234
  7pqrstsixteen`
  const expected = 281;
  assertEquals(exerciseTwo(testData), expected);
});
