export const parse = (input) =>
  input.split(",").map((value) => parseInt(value));
const add = (opcodes, a, b, index) => opcodes[opcodes[index]] = a + b;
const mul = (opcodes, a, b, index) => opcodes[opcodes[index]] = a * b;

const setValueAt = (opcodes, index) => {
  const input = 1;
  opcodes[opcodes[index]] = input;
};

const displayValueFrom = (opcodes, a) => console.log("ins : 4", a);

const opcodeInformation = {
  "01": { operation: add, noOfArgs: 2, nextOpcodeOffset: 4 },
  "02": { operation: mul, noOfArgs: 2, nextOpcodeOffset: 4 },
  "03": { operation: setValueAt, noOfArgs: 0, nextOpcodeOffset: 2 },
  "04": { operation: displayValueFrom, noOfArgs: 1, nextOpcodeOffset: 2 },
};

const determineArgs = (opcodes, modeInfo, args) => {
  const modes = modeInfo.split("").reverse();
  const newArgs = [];
  for (let i = 0; i < args.length; i++) {
    if (modes[i] === "0" || modes[i] === undefined) {
      newArgs.push(opcodes[args[i]]);
    } else if (modes[i] === "1") {
      newArgs.push(args[i]);
    }
  }
  return newArgs;
};

const executeInstruction = (
  opcodes,
  index,
  modeInfo,
  { operation, noOfArgs },
) => {
  const parameters = opcodes.slice(index + 1, index + 1 + noOfArgs);
  const args = determineArgs(opcodes, modeInfo, parameters);

  operation(opcodes, ...args, index + 1 + noOfArgs);
};

export const sprint1 = (input) => {
  const opcodes = parse(input);
  let index = 0;

  while (index < opcodes.length && opcodes[index] !== 99) {
    const opcode = (opcodes[index] % 100).toString().padStart(2, "0");
    const modeInfo = Math.floor(opcodes[index] / 100).toString();
    //const parameters = opcodes.slice(index + 1, index + 1 + noOfArgs);

  //  console.log(opcodeInformation[opcode], opcodeInformation[opcode].nextOpcodeOffset);
    
    executeInstruction(
      opcodes,
      index,
      modeInfo,
      opcodeInformation[opcode],
    );
    index += opcodeInformation[opcode].nextOpcodeOffset;
  }
};
// const something = sprint1("1001, 0, 0, 0, 99");
// console.log(something);
// console.log(sprint1("03,0,99"));
// console.log(sprint1("1104,0,99"));
// console.log(sprint1("3,0,4,0,99"));
// console.log(sprint1(["1101,100,-1,4,0"]));
console.log(sprint1(Deno.readTextFileSync("./data/input.txt")));
