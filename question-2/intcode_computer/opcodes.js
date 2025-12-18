export const RESULT = [];
export const INPUT = [];
const add = (computer, [input1Loc, input2Loc, outputLoc], step) => {
  const curProgram = computer.program;
  curProgram[outputLoc] = curProgram[input1Loc] + curProgram[input2Loc];
  computer.currentPosition += step;
};

const mul = (computer, [input1Loc, input2Loc, outputLoc], step) => {
  const curProgram = computer.program;
  curProgram[outputLoc] = curProgram[input1Loc] * curProgram[input2Loc];
  computer.currentPosition += step;
};

const setValueAt = (computer, [input1Loc], step) => {
  const curProgram = computer.program;
  let input = INPUT[0];

  if (input === undefined) {
    input = +prompt("Enter the input : ");
  }

  curProgram[input1Loc] = input;
  INPUT.shift();
  computer.currentPosition += step;
};

const displayValueFrom = (computer, [input1Loc], step) => {
  const curProgram = computer.program;
  RESULT.push(curProgram[input1Loc]);
  computer.currentPosition += step;
};

const jumpIfTrue = (computer, [input1Loc, input2Loc], step) => {
  const curProgram = computer.program;

  computer.currentPosition = curProgram[input1Loc]
    ? curProgram[input2Loc]
    : computer.currentPosition + step;
};

const jumpIfFalse = (computer, [input1Loc, input2Loc], step) => {
  const curProgram = computer.program;

  computer.currentPosition = curProgram[input1Loc]
    ? computer.currentPosition + step
    : curProgram[input2Loc];
};

const lessThan = (computer, [input1Loc, input2Loc, input3Loc], step) => {
  const curProgram = computer.program;
  curProgram[input3Loc] = curProgram[input1Loc] < curProgram[input2Loc] ? 1 : 0;
  computer.currentPosition += step;
};

const isEquals = (computer, [input1Loc, input2Loc, input3Loc], step) => {
  const curProgram = computer.program;
  curProgram[input3Loc] = curProgram[input1Loc] === curProgram[input2Loc]
  ? 1
  : 0;
  computer.currentPosition += step;
};

const setRelativeBase = (computer,[input1Loc], step) => {
  const curProgram = computer.program;
  computer.relativeBase += curProgram[input1Loc];
  computer.currentPosition += step;
};

const halt = (computer) => {
  computer.isHalted = true;
};

export const OPCODES = {
  "01": { operation: add, stepsToMove: 4 },
  "02": { operation: mul, stepsToMove: 4 },
  "03": { operation: setValueAt, stepsToMove: 2 },
  "04": { operation: displayValueFrom, stepsToMove: 2 },
  "05": { operation: jumpIfTrue, stepsToMove: 3 },
  "06": { operation: jumpIfFalse, stepsToMove: 3 },
  "07": { operation: lessThan, stepsToMove: 4 },
  "08": { operation: isEquals, stepsToMove: 4 },
  "09": { operation: setRelativeBase, stepsToMove: 2 },
  "99": { operation: halt, stepsToMove: 0 },
};
