export const calculateRequiredFuel = (mass) => Math.floor(mass / 3) - 2;

export const calculateFuel = (mass) => {
  if (mass < 6) {
    return 0;
  }
  return calculateRequiredFuel(mass) +
    calculateFuel(calculateRequiredFuel(mass));
};

const parseInput = (input) =>
  input.split("\n").map((module) => parseInt(module));

export const solve = (input, func) => {
  const masses = parseInput(input);
  const requiredFuelAmounts = [];

  for (const mass of masses) {
    requiredFuelAmounts.push(func(mass));
  }

  return requiredFuelAmounts.reduce((sum, fuel) => sum + fuel, 0);
};
