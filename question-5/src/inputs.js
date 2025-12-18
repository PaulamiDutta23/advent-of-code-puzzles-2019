const givenInput = Deno.readTextFileSync("data/input.txt");

export const INPUTS = {
  simpleAddWithMode: "1001, 0, 1, 0, 99",
  simpleInput: "03,0,99",
  simpleDisplay: "1104,0,99",
  inputAndDisplay: "3,0,4,0,99",
  modifyToHalt: "1101,100,-1,4,0",
  puzzleInput: givenInput,
  jumpIfFalse: "6,1,3,4,3,3,4,4,4,99",
  smallJumpCase: "3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9",
  jumpInImmediateMode: "3,3,1105,-1,9,1101,0,0,12,4,12,99,1",
  equalsInPositionMode: "3,9,8,9,10,9,4,9,99,-1,8",
  equalsInImmediateMode: "3,3,1108,-1,8,3,4,3,99",
  lessThanInPositionMode: "3,9,7,9,10,9,4,9,99,-1,8",
  lessThanInImmediateMode: "3,3,1107,-1,8,3,4,3,998",
  qs7Demo: "3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0",
};
