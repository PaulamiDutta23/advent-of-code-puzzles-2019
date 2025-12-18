import { createComputer, execute } from "../../question-2/intcode_computer/computer.js";
import { INPUTS } from "./inputs.js";

const part1 = (input) => {
  const computer = createComputer(input);
  const output = execute(computer);
  return output;
};

const input = INPUTS.puzzleInput;
console.log(part1(input));