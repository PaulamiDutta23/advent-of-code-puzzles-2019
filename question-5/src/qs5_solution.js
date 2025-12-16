import {
  createComputer,
  execute,
} from "../../question-2/intcode_computer/computer.js";
import { INPUTS } from "./inputs.js";

const input = INPUTS.puzzleInput;

const main = (input) => {
  const computer = createComputer(input);
  execute(computer);
  console.log(computer);
};

main(input);
