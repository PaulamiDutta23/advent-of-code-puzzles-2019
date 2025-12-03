import { assertEquals } from "@std/assert";
import {
  calculateFuel,
  calculateRequiredFuel,
  solve,
} from "../src/qs1_solution.js";

Deno.test("part 1 : simple test", () => {
  assertEquals(calculateRequiredFuel(12), 2);
});

Deno.test("part 1 : module with mass 14", () => {
  assertEquals(calculateRequiredFuel(14), 2);
});

Deno.test("part 1 : module with mass 1969", () => {
  assertEquals(calculateRequiredFuel(1969), 654);
});

Deno.test("part 1 : module with mass 100756", () => {
  assertEquals(calculateRequiredFuel(100756), 33583);
});

Deno.test("part 1 : simple test for two modules", () => {
  assertEquals(solve("12\n14", calculateRequiredFuel), 4);
});

Deno.test("part 1 : simple test for one module", () => {
  assertEquals(solve("12", calculateRequiredFuel), 2);
});

Deno.test("part 1 : simple test for multi modules", () => {
  assertEquals(solve("12\n14\n1969\n100756", calculateRequiredFuel), 34241);
});

Deno.test("part 1 : large input", () => {
  const input = Deno.readTextFileSync("./data/input.txt");
  assertEquals(solve(input, calculateRequiredFuel), 3297626);
});

Deno.test("part 2 : simple input", () => {
  assertEquals(calculateFuel(12), 2);
});

Deno.test("part 2 : simple test for one module", () => {
  assertEquals(solve("12", calculateFuel), 2);
});

Deno.test("part 2 : simple test for two modules", () => {
  assertEquals(solve("12\n14", calculateFuel), 4);
});

Deno.test("part 2 : large input", () => {
  const input = Deno.readTextFileSync("./data/input.txt");
  assertEquals(solve(input, calculateFuel), 4943578);
});
