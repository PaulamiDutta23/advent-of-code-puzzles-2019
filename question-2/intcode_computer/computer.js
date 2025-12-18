import { OPCODES, RESULT } from "./opcodes.js";

const parse = (input) => input.split(",").map((value) => parseInt(value));

export const createComputer = (program) => {
  const modifiedProgram = parse(program);
  return {
    currentPosition: 0,
    program: modifiedProgram,
    relativeBase: 0,
    isHalted: false,
  };
};

const positionMode = (index, program) => program[index];
const immediateMode = (index) => index;
const relativeMode = (index, program, relativeBase) =>
  relativeBase + program[index];

const MODES = {
  "0": positionMode,
  "1": immediateMode,
  "2": relativeMode,
};

const selectModes = (computer, modesInString, count) => {
  const program = computer.program;
  const pointer = computer.currentPosition;
  const modes = modesInString.split("").reverse();
  const argsLoc = [];
  for (let i = 0; i < count; i++) {
    const loc = MODES[modes[i]](pointer + i + 1,program,computer.relativeBase);
    program[loc] = loc >= program.length ? 0 : program[loc];
    argsLoc.push(loc);
  }
  return argsLoc;
};

const getArgs = (computer) => {
  const instruction = computer.program[computer.currentPosition];
  const opcode = (instruction % 100).toString().padStart(2, "0");
  const noOfArgs = OPCODES[opcode].stepsToMove - 1;
  const modes = Math.floor(instruction / 100).toString().padStart(noOfArgs,"0");
  const args = selectModes(computer, modes, noOfArgs);
  return [opcode, ...args];
};

export const stepForward = (computer) => {
  const [opcode, ...args] = getArgs(computer);
  OPCODES[opcode].operation(computer, args, OPCODES[opcode].stepsToMove);
  return computer;
};

export const execute = (computer) => {
  while (!computer.isHalted) {
    stepForward(computer);
  }
  return RESULT[RESULT.length - 1];
};
