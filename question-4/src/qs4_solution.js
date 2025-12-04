import { includesValue } from "jsr:@std/collections";

const areAllIncreasing = (num) => {
  const sorted = num.split("").toSorted().join("");
  return sorted === num;
};

// const hasAdjacentSameDigit = (num) => {
//   for (let i = 0; i <= num.length - 2; i++) {
//     if (num[i] === num[i + 1]) {
//       return true;
//     }
//   }
//   return false;
// };

const doesContainOnlyOnePair = (num) => {
  const frequency = num.split("").reduce((frequency, key) => {
    frequency[key] = frequency[key] || 0;
    return (frequency[key] += 1) && frequency;
  }, {});
  return includesValue(frequency, 2);
};

const validPassword = (start, end) => {
  let count = 0;
  for (let i = start; i <= end; i++) {
    const numInStr = i.toString();
    const hasIncreasingDigits = areAllIncreasing(numInStr);
    // const hasSameDigit = hasAdjacentSameDigit(numInStr);
    const hasOnePair = doesContainOnlyOnePair(numInStr);
    if (hasIncreasingDigits && hasOnePair) {
      count++;
    }
  }
  console.log(count);
};

validPassword(245318, 765747);
