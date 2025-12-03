export const parse = (input) =>
  input.split(",").map((value) => parseInt(value));
const add = (a, b) => a + b;
const mul = (a, b) => a * b;

const funtionToPerform = {
  1: add,
  2: mul,
};

const executeInstruction = (opcodes, index) => {
  opcodes[opcodes[index + 3]] = funtionToPerform[opcodes[index]](
    opcodes[opcodes[index + 1]],
    opcodes[opcodes[index + 2]],
  );
};

export const sprint1 = (opcodes, noun, verb) => {
  opcodes[1] = noun;
  opcodes[2] = verb;
  let index = 0;

  while (index < opcodes.length - 1 && opcodes[index] !== 99) {
    executeInstruction(opcodes, index);
    index += 4;
  }

  return opcodes[0];
};

export const sprint2 = (input, output) => {
  let opcodes = parse(input);
  const orginialInput = [...opcodes];

  for(let i = 0; i < 100; i++) {
    for(let j = 0; j < 100; j++) {
      const result = sprint1(opcodes, i, j);

      if(result === output) {
        return [i, j];
      }
      opcodes = [...orginialInput];
    }
  }
};