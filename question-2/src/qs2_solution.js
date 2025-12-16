import { createComputer, execute } from "../intcode_computer/computer.js";
import { INPUTS } from "./inputs.js";
const input = INPUTS.puzzleInput;

export const override = (computer, values = []) => {
  for (const value of values) {
    const [position, overrideWith] = value;
    computer.program[position] = overrideWith;
  }
};

export const sprint1 = (input) => {
  const computer = createComputer(input.program);
  override(computer, input.overrider);
  execute(computer);
  return computer.program[0];
};

console.log(sprint1(input));
export const sprint2 = (input) => {
  let computer = createComputer(input.program);
  const originalInput = { ...computer };
  originalInput.program = [...computer.program];

  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      override(computer, [[1, i], [2, j]]);
      execute(computer);
      if (computer.program[0] === input.target) {
        return [i, j];
      }

      computer = { ...originalInput };
      computer.program = [...originalInput.program];
    }
  }
};

console.log(sprint2(input));
