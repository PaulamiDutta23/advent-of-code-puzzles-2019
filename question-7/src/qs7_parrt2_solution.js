import { permutations } from "jsr:@std/collections";
import {
  createComputer,
  stepForward,
} from "../../question-2/intcode_computer/computer.js";
import { INPUT, RESULT } from "../../question-2/intcode_computer/opcodes.js";
import { INPUTS } from "./inputs.js";
const input = INPUTS.puzzleInput;

const runAmplifier = (phases, output) => {
  let prevLength = RESULT.length;
  const computers = Array.from({ length: 5 }, () => createComputer(input));
  let i = 0;
  INPUT[0] = phases[i];
  INPUT[1] = output;
  let curCom = computers[i];
  while (!computers[i].isHalted) {
    if (RESULT.length > prevLength) {
      prevLength = RESULT.length;
      i = (i + 1) % 5;
      output = RESULT[RESULT.length - 1];
      curCom = computers[i];
      if (curCom.currentPosition === 0) {
        INPUT.push(phases[i]);
      }
      INPUT.push(output);
    }
    stepForward(curCom);
  }
  return RESULT[RESULT.length - 1];
};

const part2 = () => {
  const phases = permutations([5, 6, 7, 8, 9]);
  const thrusterSignal = [];
  for (const phase of phases) {
    const signal = runAmplifier(phase, 0);
    thrusterSignal.push(signal);
  }
  return Math.max(...thrusterSignal);
};

console.log(part2());
