export const calculateRequiredFuel = (mass) => {
  return Math.floor(mass / 3) - 2;
};

const parseInput = (input) =>
  input.split("\n").map((module) => parseInt(module));

export const part1Solution = (input) => {
  const modules = parseInput(input);
  const requiredFuelAmounts = [];

  for (const module of modules) {
    requiredFuelAmounts.push(calculateRequiredFuel(module));
  }

  return requiredFuelAmounts.reduce((sum, fuel) => sum + fuel, 0);
};

export const part2Solution = input => {
  
};