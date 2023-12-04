import { assertEquals } from "../depts.ts";
import { getTestInputOfCurrentDay } from "../utils.ts";
import { exerciseOne, exerciseTwo } from "./day.ts";



Deno.test("Exercise one", async() => {
  const testData = await getTestInputOfCurrentDay(import.meta.url);
  const expected = 4361;
  assertEquals(exerciseOne(testData), expected);
});

Deno.test("Exercise one - extra testcase 1", () => {
  const testData = 
  `........
   .24..4..
   ......*.`
  const expected = 4
  assertEquals(exerciseOne(testData), expected);
})

Deno.test("Exercise one - extra testcase 2", () => {
  const testData = 
  `........
  .24$-4..
  ......*.`
  const expected = 28
  assertEquals(exerciseOne(testData), expected);
})

Deno.test("Exercise one - extra testcase 3", () => {
  const testData = 
  `11....11
   ..$..$..
   11....11`
  const expected = 44
  assertEquals(exerciseOne(testData), expected);
})

Deno.test("Exercise one - extra testcase 4", () => {
  const testData = 
  `$......$
   .1....1.
   .1....1.
   $......$`
  const expected = 4
  assertEquals(exerciseOne(testData), expected);
})

Deno.test("Exercise one - extra testcase 5", () => {
  const testData = 
  `$......$
   .11..11.
   .11..11.
   $......$`
  const expected = 44
  assertEquals(exerciseOne(testData), expected);
})

Deno.test("Exercise one - extra testcase 6", () => {
  const testData = 
  `$11
   ...
   11$
   ...`
  const expected = 22
  assertEquals(exerciseOne(testData), expected);
})

Deno.test("Exercise one - extra testcase 7", () => {
  const testData = 
  `$..
   .11
   .11
   $..
   ..$
   11.
   11.
   ..$`
  const expected = 44
  assertEquals(exerciseOne(testData), expected);
})

Deno.test("Exercise one - extra testcase 8", () => {
  const testData = 
  `11.$.`
  const expected = 0
  assertEquals(exerciseOne(testData), expected);
})


Deno.test('Exercise one - extra testcase 9', () => {
  const testData = 
  `.......5......
   ..7*..*.....4*
   ...*13*......9
   .......15.....
   ..............
   ..............
   ..............
   ..............
   ..............
   ..............
   21............
   ...*9.........
  `
  const expected = 62
  assertEquals(exerciseOne(testData), expected);
})

Deno.test('Exercise one - extra testcase 10', () => {
  const testData = 
  `.$.11`
  const expected = 0
  assertEquals(exerciseOne(testData), expected);
})

Deno.test('Exercise one - extra testcase 11', () => {
  const testData =
  `12.......*..
   +.........34
   .......-12..
   ..78........
   ..*....60...
   78.........9
   .5.....23..$
   8...90*12...
   ............
   2.2......12.
   .*.........*
   1.1..503+.56`
  const expected = 925
  assertEquals(exerciseOne(testData), expected);
})

Deno.test("Exercise two", async() => {
  const testData = await getTestInputOfCurrentDay(import.meta.url);
  const expected = 467835;
  assertEquals(exerciseTwo(testData), expected);
});
