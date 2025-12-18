import { OPCODES, RESULT } from "./opcodes.js";

const parse = (input) => input.split(",").map((value) => parseInt(value));

export const createComputer = (program) => {
  const modifiedProgram = parse(program);
  return {
    currentPosition: 0,
    program: modifiedProgram,
    isHalted: false,
  };
};

const positionMode = (index, program) => program[index];
const immediateMode = (index) => index;

const modeSelecter = {
  "0": positionMode,
  "1": immediateMode,
};

const selectModes = (program, currentPosition, modesInString, count) => {
  const modes = modesInString.split("").reverse();
  let index = 0;
  const argsLoc = [];
  for (let i = 1; i <= count; i++) {
    const loc = modeSelecter[modes[index++]](currentPosition + i, program);
    argsLoc.push(loc);
  }
  return argsLoc;
};

const getArgs = ({ currentPosition, program }) => {
  const pointer = program[currentPosition];
  const opcode = (pointer % 100).toString().padStart(2, "0");
  const noOfArgs = OPCODES[opcode].stepsToMove - 1;
  const modes = Math.floor(pointer / 100).toString().padStart(
    noOfArgs,
    "0",
  );
  const args = selectModes(program, currentPosition, modes, noOfArgs);
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