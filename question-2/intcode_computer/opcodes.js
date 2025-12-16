const add = (computer, [ input1Loc, input2Loc, outputLoc ]) => {
  const curProgram = computer.program;
  curProgram[outputLoc] = curProgram[input1Loc] + curProgram[input2Loc];
};

const mul = (computer, [ input1Loc, input2Loc, outputLoc ]) => {
  const curProgram = computer.program;
  curProgram[outputLoc] = curProgram[input1Loc] * curProgram[input2Loc];
};

const halt = (computer) => {
  computer.isHalted = true;
};

export const OPCODES = {
  1: { operation: add, stepsToMove: 4 },
  2: { operation: mul, stepsToMove: 4 },
  99: { operation: halt, stepsToMove: 0 },
};