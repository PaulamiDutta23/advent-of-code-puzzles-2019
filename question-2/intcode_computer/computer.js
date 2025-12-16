import { OPCODES } from "./opcodes.js";

const parse = (input) =>
  input.split(",").map((value) => parseInt(value));

export const createComputer = (program) => {
  const modifiedProgram = parse(program);
  return {
    currentPosition: 0,
    program: modifiedProgram,
    isHalted: false,
  };
};

const getArgs = ({program, currentPosition}) => {
  const opcode = program[currentPosition];
  const args = [];
  for(let i = 1; i < OPCODES[opcode].stepsToMove; i++) {
    args.push(program[currentPosition + i]);
  }
  return [opcode, ...args];
};

export const stepForward = (computer) => {
  const [opcode, ...args] = getArgs(computer);
  OPCODES[opcode].operation(computer, args);
  computer.currentPosition += OPCODES[opcode].stepsToMove;
  return computer;
};

export const execute = (computer) => {
  while (!computer.isHalted) {
    stepForward(computer);
  }
};