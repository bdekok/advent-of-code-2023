import { assertEquals } from "../depts.ts";
import { getTestInputOfCurrentDay } from "../utils.ts";
import { exerciseOne, exerciseTwo } from "./day.ts";

Deno.test("Exercise one", async () => {
  const testData = await getTestInputOfCurrentDay(import.meta.url);
  const expected = 6440;
  assertEquals(exerciseOne(testData), expected);
});

Deno.test("Exercise two", async () => {
  const testData = await getTestInputOfCurrentDay(import.meta.url);
  const expected = 5905;
  assertEquals(exerciseTwo(testData), expected);
});

Deno.test("Exercise two - extra test all J's", async() => {
  const testData = await getTestInputOfCurrentDay(import.meta.url, 'input-test-2.txt');

  //  2 pair, 4 of a kind 5 of a kind,
  // so 1 * 28 + 2*220 + 3*483 = 1917
  const expected = 1917;
  assertEquals(exerciseTwo(testData), expected);
});

Deno.test("Exercise two - extra test one all J, one 4 J's and one other ", async() => {
  /*
  4JJJJ 483 - 5 of a kind rank 4
  JJJJJ 5   - 5 of a kind rank 3
  KTJJT 220 - 4 of a kind rank 2
  KK677 28  - 2 pair      rank 1

  = 4*483 + 3*5 + 2*220 + 1*28 = 2415
  */
  const testData = await getTestInputOfCurrentDay(import.meta.url, 'input-test-3.txt');
  const expected = 2415;
  assertEquals(exerciseTwo(testData), expected);
})

Deno.test("Three of a kind tests", async() => {
  /*
  4LJKJ 483 - three of a kind   rank 4
  J263J 220 - Three of a kind   rank 3
  JJA34 1   - Three of a kind   rank 2
  KK677 28  - two pair          rank 1

  = 4*483 + 3*220 + 2*1 + 1*28 = 2622
  */

  const testData = await getTestInputOfCurrentDay(import.meta.url, 'input-test-4.txt');
  const expected = 2622;
  assertEquals(exerciseTwo(testData), expected);

})


Deno.test('exercise two - extra test 4 thank you random internet person it were the full houses', async() => {
  const testData = await getTestInputOfCurrentDay(import.meta.url, 'input-test-5.txt');
  const expected = 6839;
  assertEquals(exerciseTwo(testData), expected);
})
