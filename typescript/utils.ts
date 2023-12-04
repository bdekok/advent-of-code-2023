import { dirname, fromFileUrl, resolve } from "./depts.ts";

export async function getInputOfCurrentDay(currentUrl: string, fileName = 'input.txt'): Promise<string> {
  const fullDir =  dirname(fromFileUrl(currentUrl));
  const day =  fullDir.split('/')[fullDir.split('/').length - 1]
  const dayOneFilePath = resolve(day, "input", fileName);
  return await Deno.readTextFile(dayOneFilePath);
}

export async function getTestInputOfCurrentDay(currentUrl: string, fileName = 'input-test.txt'): Promise<string> {
  return await getInputOfCurrentDay(currentUrl, fileName);
}