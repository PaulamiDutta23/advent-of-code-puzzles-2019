// export const parse = input => {
//   return input.split("\n").map(x => x.split(")"));
// };

// export const arrange = map =>
//   map.reduce((structure, orbitRelation) => {
//     const parentIndex = structure.findIndex(objects => objects.includes(orbitRelation[0]));
//     if(parentIndex < 0) {
//       structure.push([orbitRelation[0]]);
//       structure.push([orbitRelation[1]]);
//       return structure;
//     }

//     const childIndex = parentIndex + 1;

//     if(structure[childIndex] === undefined) {
//       structure[childIndex] = [];
//     }

//     return structure[childIndex].push(orbitRelation[1]) && structure;
//   },[]);

// export const countOrbits = (sum, objects, index) => {
//   for (const object of objects) {
//     sum += index;
//   }
//   return sum;
// };

// export const testCountOrbits = arranged => arranged.reduce(countOrbits, 0);

// export const calculateAllOrbits = map => {
//   const formattedMap = parse(map);
//   const arrangedObjects = arrange(formattedMap);
//   const totalOrbits = arrangedObjects.reduce(countOrbits, 0);
//   return totalOrbits;
// };

// const formattedMap = {
//   B: "A",
//   C: "B",
//   D: "C",
//   A: "COM",
//   F: "C",
//   G: "B",
// };

// const formattedMap = {
//   "C": "B",
//   "D": "C",
//   "E": "D",
//   "F": "E",
//   "B": "COM",
//   "G": "B",
//   "H": "G",
//   "I": "D",
//   "J": "E",
//   "K": "J",
//   "L": "K",
//   "YOU" : "K",
//   "SAN" : "I"
// };
//import { kMap } from "../data/input1.js";
import { intersect } from "jsr:@std/collections";

const parse = (input) =>
  input.split("\n").reduce((result, str) => {
    const map = str.split(")");
    return (result[map[1]] = map[0]) && result;
  }, {});

//const formattedMap = parse(kMap);
const input = Deno.readTextFileSync("./data/input.txt");
const formattedMap = parse(input);

// const calculateDistance = (satellite, count) => {
//   if (!(satellite in formattedMap)) {
//     return count;
//   }

//   count++;
//   return calculateDistance(formattedMap[satellite], count);
// };

// const calculateAllOrbits = () => {
//   const distances = [];
//   for (const key in formattedMap) {
//     const count = 0;
//     distances.push(calculateDistance(key, count));
//   }
//   const distance = distances.reduce((sum, d) => sum + d, 0);
//   console.log(distance);
// };

// calculateAllOrbits();

const calculatePath = (planet, planets) => {
  if(planet === "COM") {
    return planets;
  }

  planets.push(planet);
  return calculatePath(formattedMap[planet], planets);
};

const shortestPath = () => {
  const youPathStartsAt = formattedMap.YOU;
  const sanPathStartsAt = formattedMap.SAN;
  const pathOfYou = calculatePath(youPathStartsAt, []);
  const pathOfSan = calculatePath(sanPathStartsAt, []);  
  const intersectingPlanet = intersect(pathOfSan, pathOfYou)[0];
  const positionOfIntersectionInYou = pathOfYou.indexOf(intersectingPlanet);
  const positionOfIntersectionInSan = pathOfSan.indexOf(intersectingPlanet);
  console.log(positionOfIntersectionInYou + positionOfIntersectionInSan);
  
};

shortestPath();