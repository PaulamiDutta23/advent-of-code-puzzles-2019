export const calculateRequiredFuel = (mass) => Math.floor(mass / 3) - 2;

export const calculateFuel = mass => {
  const fuel = calculateRequiredFuel(mass);
  if(fuel <= 0) {
    return 0;
  }
  return fuel + calculateFuel(fuel);
};

const parseInput = (input) =>
  input.split("\n").map((module) => parseInt(module));

export const part1Solution = (input) => {
  const masses = parseInput(input);
  const requiredFuelAmounts = [];

  for (const mass of masses) {
    requiredFuelAmounts.push(calculateRequiredFuel(mass));
  }

  return requiredFuelAmounts.reduce((sum, fuel) => sum + fuel, 0);
};

export const part2Solution = input => {
  const masses = parseInput(input);
  const requiredFuelAmounts = [];

  for (const mass of masses) {
    requiredFuelAmounts.push(calculateFuel(mass));
  }

  return requiredFuelAmounts.reduce((sum, fuel) => sum + fuel, 0);
};