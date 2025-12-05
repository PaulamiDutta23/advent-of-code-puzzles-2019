import { assertEquals } from "@std/assert";
import {
  arrange,
  calculateAllOrbits,
  parse,
  testCountOrbits,
} from "../src/qs6_solution.js";

Deno.test("testing arrange with simple data", () => {
  assertEquals(arrange([["COM", "B"], ["B", "C"]]), [["COM"], ["B"], ["C"]]);
});

Deno.test("testing arrange with 2 objects having 1 parent object", () => {
  assertEquals(arrange([["COM", "B"], ["B", "C"], ["B", "D"]]), [
    ["COM"],
    ["B"],
    ["C", "D"],
  ]);
});

Deno.test("testing count orbits with simple data", () => {
  assertEquals(testCountOrbits([["COM"], ["B"], ["C"]]), 3);
});

// Deno.test("testing count orbits with simple data", () => {
//   assertEquals(calculateAllOrbits([["COM", "B"], ["B", "C"]]), 3);
// });

Deno.test("testing parse", () => {
  assertEquals(parse("COM)B\nB)C\nC)D"), [["COM", "B"], ["B", "C"], [
    "C",
    "D",
  ]]);
});

Deno.test("testing count orbits with simple string data", () => {
  assertEquals(calculateAllOrbits("COM)B\nB)C\nC)D"), 6);
});

Deno.test("testing count orbits with simple string data", () => {
  assertEquals(calculateAllOrbits("COM)B\nB)C\nC)D\nD)E\nE)F\nB)G\nG)H\nD)I\nE)J\nJ)K\nK)L"), 42);
});
