export const calculateRequiredFuel = (mass) => {
  return Math.floor(mass / 3) - 2;
};
