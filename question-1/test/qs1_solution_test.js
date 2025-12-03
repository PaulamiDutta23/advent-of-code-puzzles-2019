import { assertEquals } from "@std/assert";
import { calculateRequiredFuel } from "../src/qs1_solution.js";

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
