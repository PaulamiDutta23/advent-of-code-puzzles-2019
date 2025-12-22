import { maxBy, maxOf, withoutAll } from "jsr:@std/collections";
import { INPUTS } from "./inputs.js";

const isSameConstant = (c, m, x, y) => m === Infinity || Math.round(c*1000)/1000 === Math.round((y - m * x)*1000)/1000;

const findPointsOnLine = ([x1, y1], [x2, y2]) => {
  const points = [];
  const startX = Math.min(x1, x2);
  const startY = Math.min(y1, y2);
  const finalX = Math.max(x1, x2);
  const finalY = Math.max(y1, y2);
  const slope = x1 === x2 ? Infinity : (y2 - y1) / (x2 - x1);
  const constant = y1 - slope * x1;
  for (let x = startX; x <= finalX; x++) {
    for (let y = startY; y <= finalY; y++) {
      if (isSameConstant(constant, slope, x, y)) {
        points.push([x, y]);
      }
    }
  }
  return points.slice(1, points.length - 1);
};

const countVisibleAsteroids = (location, _i, locations) => {
  let count = 0;
  const otherLocations = withoutAll(locations, [location]);
  for (const loc of otherLocations) {
    const points = findPointsOnLine(location, loc);
    if (
      !points.some((p) => locations.some((l) => p[0] === l[0] && p[1] === l[1]))
    ) {
      if(location[0] === 8 && location[1] === 3) console.log(loc);
      
      count++;
    }
  }
  return { location, count };
};

const findAsteroidsLoc = (map) => {
  const locations = [];
  const line = map.split("\n");
  for (let y = 0; y < line.length; y++) {
    for (let x = 0; x < line[y].length; x++) {
      if (line[y][x] === "#") {
        locations.push([x, y]);
      }
    }
  }
  return locations;
};

const findNoOfVisibleAsteroids = (map) => {
  const asteroidLocations = findAsteroidsLoc(map);
  const countOfEach = asteroidLocations.map(countVisibleAsteroids);
  return maxBy(countOfEach, (asteroid) => asteroid.count);
};

const input = INPUTS.part2Sample;
console.log(findNoOfVisibleAsteroids(input));
