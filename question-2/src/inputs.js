const givenInput = Deno.readTextFileSync("./data/input.txt");

export const INPUTS = {
  simpleAdd: { program: "1,0,0,0,99", overrider: [], target: 2 },
  simpleMul: { program: "2,3,0,3,99", overrider: [] },
  simpleSquare: { program: "2,4,4,5,99,0", overrider: [] },
  simpleModificaion: { program: "1,1,1,4,99,5,6,0,99", overrider: [] },
  puzzleInput: {
    program: givenInput,
    overrider: [[1, 12], [2, 2]],
    target: 19690720,
  },
};