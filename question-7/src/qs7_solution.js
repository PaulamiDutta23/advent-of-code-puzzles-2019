import { permutations } from "jsr:@std/collections";
import { INPUTS } from "./inputs.js";
import {
  createComputer,
  execute,
} from "../../question-2/intcode_computer/computer.js";
import { INPUT } from "../../question-2/intcode_computer/opcodes.js";

const runAmplifier = (phases, inputSignal) => {
  let outputSignal = inputSignal;
  for (const phase of phases) {
    const computer = createComputer(input);
    INPUT[0] = phase;
    INPUT[1] = outputSignal;
    outputSignal = execute(computer);
  }
  return outputSignal;
};

const part1 = () => {
  const phases = permutations([0, 1, 2, 3, 4]);
  const thrusterSignal = [];
  for (const phase of phases) {
    const signal = runAmplifier(phase, 0);
    thrusterSignal.push(signal);
  }
  return Math.max(...thrusterSignal);
};

const input = INPUTS.puzzleInput;
console.log(part1());
