const givenInput = Deno.readTextFileSync("./question-2/data/input.txt");

const INPUTS = {
  simpleAdd: { program: "1,0,0,0,99", overrider: [] },
  simpleMul: { program: "2,3,0,3,99", overrider: [] },
  simpleSquare: { program: "2,4,4,5,99,0", overrider: [] },
  simpleModificaion: { program: "1,1,1,4,99,5,6,0,99", overrider: [] },
  puzzleInput: { program: givenInput, overrider: [[1, 12], [2, 2]] },
};

const input = INPUTS.puzzleInput;

export const parse = (input) =>
  input.split(",").map((value) => parseInt(value));

const createComputer = (program) => {
  return {
    currentPosition: 0,
    program,
    isHalted: false,
  };
};

const override = (computer, values = []) => {
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

const stepForward = (computer) => {
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
  const modifiedProgram = parse(input.program);
  const computer = createComputer(modifiedProgram);
  override(computer, input.overrider);
  execute(computer);
  return computer;
};

console.log(sprint1(input));

export const sprint2 = (input, output) => {
  let opcodes = parse(input);
  const orginialInput = [...opcodes];

  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      const result = sprint1(opcodes, i, j);

      if (result === output) {
        return [i, j];
      }
      opcodes = [...orginialInput];
    }
  }
};
