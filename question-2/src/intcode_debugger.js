import { chunk } from "jsr:@std/collections";
import {
  createComputer,
  INPUTS,
  override,
  stepForward,
} from "./qs2_solution.js";

const displayGrid = (computer) => {
  const grid = chunk(computer.program, 10).map((row) => {
    const max = 10;
    return row.map((ele) => ele.toString().padStart(max, " ")).join("");
  }).join("\n");
  console.log(`
    Program : \n${grid}
    position : ${computer.currentPosition}
    isHalted : ${computer.isHalted}`);
};

export const debug = (input) => {
  let curComputer = createComputer(input.program);
  override(curComputer, input.overrider);
  while (!curComputer.isHalted) {
    console.clear();
    displayGrid(curComputer);
    curComputer = stepForward(curComputer);
    prompt();
  }
};

// debug(INPUTS.puzzleInput);
