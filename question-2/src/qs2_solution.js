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

export const sprint1 = (input) => {
  const opcodes = parse(input);
  opcodes[1] = 12;
  opcodes[2] = 2;
  let index = 0;

  while (index < opcodes.length - 1 && opcodes[index] !== 99) {
    executeInstruction(opcodes, index);
    index += 4;
  }

  return opcodes.join(",");
};
