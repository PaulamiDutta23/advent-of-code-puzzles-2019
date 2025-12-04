import { minOf, zip } from "jsr:@std/collections";

const right = (initial, steps, result) => {
  for (let x = initial[0] + 1; x <= initial[0] + parseInt(steps); x++) {
    result.push([x, initial[1]]);
  }

  return result[result.length - 1];
};

const up = (initial, steps, result) => {
  for (let y = initial[1] + 1; y <= initial[1] + parseInt(steps); y++) {
    result.push([initial[0], y]);
  }

  return result[result.length - 1];
};

const left = (initial, steps, result) => {
  for (let x = initial[0] - 1; x >= initial[0] - parseInt(steps); x--) {
    result.push([x, initial[1]]);
  }

  return result[result.length - 1];
};

const down = (initial, steps, result) => {
  for (let y = initial[1] - 1; y >= initial[1] - parseInt(steps); y--) {
    result.push([initial[0], y]);
  }

  return result[result.length - 1];
};

const instructionMapper = {
  R: right,
  U: up,
  L: left,
  D: down,
};

const calculateIntermediatePoints = (instructions) => {
  const o = [0, 0];
  let pointToStart = o;
  const result = [];
  for (const instruction of instructions) {
    pointToStart = instructionMapper[instruction[0]](
      pointToStart,
      instruction.slice(1),
      result,
    );
  }
  return result;
};

const isEqual = (value1, value2) => value1 === value2;

const findIntersectionPoints = (points1, points2) => {
  const intersectionPoints = [];
  for (let i = 0; i < points1.length; i++) {
    for (let j = 0; j < points2.length; j++) {
      if (
        isEqual(points1[i][0], points2[j][0]) &&
        isEqual(points1[i][1], points2[j][1])
      ) {
        intersectionPoints.push(points2[j]);
        break;
      }
    }
  }
  return intersectionPoints;
};

const distBetween = ([a, b], [c, d]) => Math.abs(a - c) + Math.abs(b - d);

const shortestDistance = (points, origin) =>
  points.reduce(
    (dis, point) => {
      const distance = distBetween(point, origin);
      return distance && distance < dis ? distance : dis;
    },
    Infinity,
  );

const findIndices = (points, intersectionPoints) => {
  const result = [];
  for (const point of intersectionPoints) {
    result.push(
      points.findIndex((p) =>
        isEqual(p[0], point[0]) && isEqual(p[1], point[1])
      ) + 1,
    );
  }
  return result;
};

const main = () => {
  // const input = Deno.readTextFileSync("./data/input.txt").split("\n");
  // const wire1 = input[0];
  // const wire2 = input[1];
  // const wire1 = "R75,D30,R83,U83,L12,D49,R71,U7,L72";
  // const wire2 = "U62,R66,U55,R34,D71,R55,D58,R83";
  const wire1 = "R8,U5,L5,D3";
  const wire2 = "U7,R6,D4,L4";
  const points1 = calculateIntermediatePoints(wire1.split(","));
  const points2 = calculateIntermediatePoints(wire2.split(","));
  //console.log(points1);
  // console.log(points2);

  const intersections = findIntersectionPoints(points1, points2);
  // console.log(commons);
  console.log(shortestDistance(intersections, [0, 0]));
  const indicesList1 = findIndices(points1, intersections);
  // console.log(indicesList1);
  const indicesList2 = findIndices(points2, intersections);
  // console.log(indicesList2);
  const distanceList = zip(indicesList1, indicesList2);
  console.log(minOf(distanceList, ([a, b]) => a + b));
};

main();
