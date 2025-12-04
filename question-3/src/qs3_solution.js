import { minOf, zip } from "jsr:@std/collections";

const right = (init, value, result) => {
  for (let x = init[0] + 1; x <= init[0] + parseInt(value); x++) {
    result.push([x, init[1]]);
  }

  return result[result.length - 1];
};

const up = (init, value, result) => {
  for (let y = init[1] + 1; y <= init[1] + parseInt(value); y++) {
    result.push([init[0], y]);
  }

  return result[result.length - 1];
};

const left = (init, value, result) => {
  for (let x = init[0] - 1; x >= init[0] - parseInt(value); x--) {
    result.push([x, init[1]]);
  }

  return result[result.length - 1];
};

const down = (init, value, result) => {
  for (let y = init[1] - 1; y >= init[1] - parseInt(value); y--) {
    result.push([init[0], y]);
  }

  return result[result.length - 1];
};

const instructions = {
  R: right,
  U: up,
  L: left,
  D: down,
};

const calculateIntermediatePoints = (ins) => {
  const o = [0, 0];
  let ip = o;
  const result = [];
  for (const i of ins) {
    ip = instructions[i[0]](ip, i.slice(1), result);
  }
  return result;
};

const findCommonPoints = (points1, points2) => {
  const common = [];
  for (let i = 0; i < points1.length; i++) {
    for (let j = 0; j < points2.length; j++) {
      if (
        (points1[i][0] === points2[j][0]) && (points1[i][1] === points2[j][1])
      ) {
        common.push(points2[j]);
        break;
      }
    }
  }
  return common;
};

const distBetween = ([a, b], [c, d]) => Math.abs(a - c) + Math.abs(b - d);

const shortestDistance = (points, origin) =>
  points.reduce(
    (dis, point) => {
      const distance = distBetween(point, origin);
      if (distance === 0) {
        return dis;
      }
      return distance < dis ? distance : dis;
    },
    Infinity,
  );

const findIndices = (points, commonPoints) => {
  const result = [];
  for (const common of commonPoints) {
    result.push(
      points.findIndex((point) =>
        point[0] === common[0] && point[1] === common[1]
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

  const commons = findCommonPoints(points1, points2);
  // console.log(commons);
  console.log(shortestDistance(commons, [0, 0]));
  const indicesList1 = findIndices(points1, commons);
  // console.log(indicesList1);
  const indicesList2 = findIndices(points2, commons);
  // console.log(indicesList2);
  const distanceList = zip(indicesList1, indicesList2);
  console.log(minOf(distanceList, ([a, b]) => a + b));
};

main();
