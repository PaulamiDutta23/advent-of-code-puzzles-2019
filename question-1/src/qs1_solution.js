export const calculateRequiredFuel = (mass) => {
  return Math.floor(mass / 3) - 2;
};

export const part1Solution = (input) => {
  const requiredFuelAmounts = [];
  
  for (const module of input) {
    requiredFuelAmounts.push(calculateRequiredFuel(module));
  }

  return requiredFuelAmounts.reduce((sum, fuel) => sum + fuel, 0);
};
