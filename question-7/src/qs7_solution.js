import { permutations } from "jsr:@std/collections";
export const parse = (input) =>
  input.split(",").map((value) => parseInt(value));

const add = (opcodes, operand1Adr, operand2Adr, operand3Adr) => {
  opcodes[operand3Adr] = opcodes[operand1Adr] + opcodes[operand2Adr];
};

const mul = (opcodes, operand1Adr, operand2Adr, operand3Adr) => {
  opcodes[operand3Adr] = opcodes[operand1Adr] * opcodes[operand2Adr];
};

const setValueAt = (opcodes, operand1Adr) => {
  opcodes[operand1Adr] = input[0];
  input.shift();
};

const displayValueFrom = (opcodes, operand1Adr) => {
  RESULT_OF_EACH_AMP.push(opcodes[operand1Adr]);
};

const jumpIfTrue = (opcodes, operand1Adr, operand2Adr, ip) => {
  if (opcodes[operand1Adr] !== 0) {
    ip = opcodes[operand2Adr];
    return ip;
  }
};

const jumpIfFalse = (opcodes, operand1Adr, operand2Adr, ip) => {
  if (opcodes[operand1Adr] === 0) {
    ip = opcodes[operand2Adr];
    return ip;
  }
};

const lessThan = (opcodes, operand1Adr, operand2Adr, operand3Adr) => {
  opcodes[operand3Adr] = opcodes[operand1Adr] < opcodes[operand2Adr] ? 1 : 0;
};

const isEquals = (opcodes, operand1Adr, operand2Adr, operand3Adr) => {
  opcodes[operand3Adr] = opcodes[operand1Adr] === opcodes[operand2Adr] ? 1 : 0;
};

const opcodeDetails = {
  "01": { operation: add, noOfArgs: 3, nextIPAfter: 4 },
  "02": { operation: mul, noOfArgs: 3, nextIPAfter: 4 },
  "03": { operation: setValueAt, noOfArgs: 1, nextIPAfter: 2 },
  "04": { operation: displayValueFrom, noOfArgs: 1, nextIPAfter: 2 },
  "05": { operation: jumpIfTrue, noOfArgs: 2, nextIPAfter: 3 },
  "06": { operation: jumpIfFalse, noOfArgs: 2, nextIPAfter: 3 },
  "07": { operation: lessThan, noOfArgs: 3, nextIPAfter: 4 },
  "08": { operation: isEquals, noOfArgs: 3, nextIPAfter: 4 },
};

const positionMode = (index, opcodes) => opcodes[index];
const immediateMode = (index) => index;

const modeSelecter = {
  "0": positionMode,
  "1": immediateMode,
  "undefined": positionMode,
};

const determineAddress = (modesInString, opcodes, start, stop) => {
  const addresses = [];
  const modes = modesInString.split("").reverse();
  let index = 0;

  for (let i = start; i <= stop; i++) {
    const address = modeSelecter[modes[index]](i, opcodes);
    addresses.push(address);
    index++;
  }

  return addresses;
};

const sprint = (input) => {
  const program = parse(input);
  let ip = 0;

  while (ip < program.length && program[ip] !== 99) {
    const opcode = (program[ip] % 100).toString().padStart(2, "0");
    const modes = Math.floor(program[ip] / 100).toString();
    const firstParameterIndex = ip + 1;
    const lastParameterIndex = ip + opcodeDetails[opcode].noOfArgs;
    const addresses = determineAddress(
      modes,
      program,
      firstParameterIndex,
      lastParameterIndex,
    );
    const result = opcodeDetails[opcode].operation(program, ...addresses, ip);
    ip = result !== undefined ? result : ip + opcodeDetails[opcode].nextIPAfter;
  }
  // console.log(RESULT_OF_EACH_AMP[RESULT_OF_EACH_AMP.length-1])
  return RESULT_OF_EACH_AMP[RESULT_OF_EACH_AMP.length-1];
};
const RESULT_OF_EACH_AMP = [];
const input = [];

const amplifier = (phases, inputSignal) => {
  let outputSignal = inputSignal;
  for(const phase of phases) {
    const program = Deno.readTextFileSync("./data/input.txt");
    input[0] = phase;
    input[1] = outputSignal;
    outputSignal = sprint(program);
  }
  return outputSignal;
};

const runAmplifiers = () => {
  const phases = permutations([0, 1, 2, 3, 4]);
  const thrusterSignal = [];
  for (const phase of phases) {
    const signal = amplifier(phase, 0);
    thrusterSignal.push(signal);
  }  
  console.log(Math.max(...thrusterSignal));
};

runAmplifiers();