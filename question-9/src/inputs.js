const givenInput = Deno.readTextFileSync("data/input.txt");
export const INPUTS = {
  selfCopy: "109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99",
  outputOf16Digit: "1102,34915192,34915192,7,4,7,99,0",
  largeOutput: "104,1125899906842624,99",
  puzzleInput: givenInput,
};
