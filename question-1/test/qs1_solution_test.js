import { assertEquals } from "@std/assert";
import { calculateFuel, calculateRequiredFuel, part1Solution, part2Solution } from "../src/qs1_solution.js";

Deno.test("simple test", () => {
  assertEquals(calculateRequiredFuel(12), 2);
});

Deno.test("module with mass 14", () => {
  assertEquals(calculateRequiredFuel(14), 2);
});

Deno.test("module with mass 1969", () => {
  assertEquals(calculateRequiredFuel(1969), 654);
});

Deno.test("module with mass 100756", () => {
  assertEquals(calculateRequiredFuel(100756), 33583);
});

Deno.test("simple test for two modules", () => {
  assertEquals(part1Solution("12\n14"), 4);
});

Deno.test("simple test for one module", () => {
  assertEquals(part1Solution("12"), 2);
});

Deno.test("simple test for multi modules", () => {
  assertEquals(part1Solution("12\n14\n1969\n100756"), 34241);
});

Deno.test("part 1 : large input", () => {
  const input = Deno.readTextFileSync("./data/input.txt");
  assertEquals(part1Solution(input), 3297626);
});

Deno.test("part 2 : simple input", () => {
  assertEquals(calculateFuel(12), 2);
});

Deno.test("part 2 : simple test for one module", () => {
  assertEquals(part2Solution("12"), 2);
});

Deno.test("part 2 : simple test for two modules", () => {
  assertEquals(part2Solution("12\n14"), 4);
});

Deno.test("part 2 : large input", () => {
  const input = Deno.readTextFileSync("./data/input.txt");
  assertEquals(part2Solution(input), 4943578);
});