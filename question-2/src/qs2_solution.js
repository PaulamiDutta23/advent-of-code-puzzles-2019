import { debug } from "./intcode_debugger.js";

const givenInput = Deno.readTextFileSync("./data/input.txt");

export const INPUTS = {
  simpleAdd: { program: "1,0,0,0,99", overrider: [], target: 2 },
  simpleMul: { program: "2,3,0,3,99", overrider: [] },
  simpleSquare: { program: "2,4,4,5,99,0", overrider: [] },
  simpleModificaion: { program: "1,1,1,4,99,5,6,0,99", overrider: [] },
  puzzleInput: {
    program: givenInput,
    overrider: [[1, 12], [2, 2]],
    target: 19690720,
  },
};

const input = INPUTS.puzzleInput;

export const parse = (input) =>
  input.split(",").map((value) => parseInt(value));

export const createComputer = (program) => {
  const modifiedProgram = parse(program);
  return {
    currentPosition: 0,
    program: modifiedProgram,
    isHalted: false,
  };
};

export const override = (computer, values = []) => {
  for (const value of values) {
    const [position, overrideWith] = value;
    computer.program[position] = overrideWith;
  }
};

const determineAddresses = (program, position) => {
  return {
    input1Loc: program[position + 1],
    input2Loc: program[position + 2],
    outputLoc: program[position + 3],
  };
};

const add = (program, { input1Loc, input2Loc, outputLoc }) => {
  program[outputLoc] = program[input1Loc] + program[input2Loc];
};

const mul = (program, { input1Loc, input2Loc, outputLoc }) => {
  program[outputLoc] = program[input1Loc] * program[input2Loc];
};

const halt = (_program, _locations, computer) => {
  computer.isHalted = true;
};

const OPCODES = {
  1: { operation: add, stepsToMove: 4 },
  2: { operation: mul, stepsToMove: 4 },
  99: { operation: halt, stepsToMove: 0 },
};

export const stepForward = (computer) => {
  const curProgram = computer.program;
  const currentPosition = computer.currentPosition;
  const opcode = curProgram[currentPosition];
  const locations = determineAddresses(
    curProgram,
    currentPosition,
  );

  OPCODES[opcode].operation(curProgram, locations, computer);
  computer.currentPosition += OPCODES[opcode].stepsToMove;
  return computer;
};

const execute = (computer) => {
  while (!computer.isHalted) {
    stepForward(computer);
  }
};

export const sprint1 = (input) => {
  const computer = createComputer(input.program);
  override(computer, input.overrider);
  execute(computer);
  return computer.program[0];
};

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
