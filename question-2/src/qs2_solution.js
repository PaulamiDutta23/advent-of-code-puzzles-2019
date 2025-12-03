export const parse = input => input.split(",").map(value => parseInt(value));

export const part1Solution = input => {
  const opcodes = parse(input);

  for(let i = 0; i < opcodes.length - 1; i++) {
    if(opcodes[i] === 1) {
      opcodes[opcodes[i + 3]] = opcodes[opcodes[i + 1]] + opcodes[opcodes[i + 2]];
      i = i + 3; 
    } else if(opcodes[i] === 2) {
      opcodes[opcodes[i + 3]] = opcodes[opcodes[i + 1]] * opcodes[opcodes[i + 2]];
      i = i + 3; 
    } else if(opcodes[i] === 99) {
      return opcodes.join(",");
    }
  }
  return opcodes.join(",");
};