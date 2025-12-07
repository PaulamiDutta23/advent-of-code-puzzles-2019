import { chunk, minBy, zip } from "jsr:@std/collections";
const parse = (data, height, width) => chunk(data, height * width);

//part 1

const countZeroesOfEach = (layers) =>
  layers.reduce((layerDetails, layer) => {
    const count = layer.reduce((c, pixel) => {
      c = pixel === "0" ? c + 1 : c;
      return c;
    }, 0);
    const layerInfo = { layer, countOfZero: count };
    return layerDetails.push(layerInfo) && layerDetails;
  }, []);

const countOne = (layer) =>
  layer.reduce((c, pixel) => pixel === "1" ? (c += 1) : c, 0);

const countTwo = (layer) =>
  layer.reduce((c, pixel) => pixel === "2" ? (c += 1) : c, 0);

const findLayerWithLeast0 = (layers) => {
  const layersInDetail = countZeroesOfEach(layers);
  const layerWithLeastZero = minBy(
    layersInDetail,
    (layer) => layer.countOfZero,
  );
  return layerWithLeastZero.layer;
};

const part1 = (input, height, width) => {
  const imageData = parse(input, height, width);
  const layerWithLeast0 = findLayerWithLeast0(imageData);
  const countOf1 = countOne(layerWithLeast0);
  const countOf2 = countTwo(layerWithLeast0);
  return countOf1 * countOf2;
};
const input = Deno.readTextFileSync("./data/input.txt");

console.log(main("123456789012", 2, 3));
console.log(main("123152789012", 2, 3));
console.log(part1(input, 6, 25));

// part 2

const combine = (imageData, height) =>
  imageData.reduce((combined, layer) => {
    for (let i = 0; i < layer.length; i++) {
      combined[i].push(layer[i]);
    }
    return combined;
  }, Array.from({ length: height }, () => []));

 const getColours = pixels => {
  for(const pixel of pixels) {
    if(pixel === "0") return "⬛️";
    if(pixel === "1") return "⬜️";
  }
 }; 


const findVisiblePixels = (mergedPositions, height) =>
  mergedPositions.reduce((result, positions, index) => {
    for (const position of positions) {
      const colour = getColours(position);
      result[index].push(colour);
    }
    return result;
  }, Array.from({ length: height }, () => []));

const part2 = (input, height, width) => {
  const imageData = parse(input, height, width).map((layer) =>
    chunk(layer, width)
  );
  const merged = combine(imageData, height);
  const mergePixelsFromPosition = merged.map((positions) => zip(...positions));
  const visiblePixels = findVisiblePixels(mergePixelsFromPosition, height);
  return visiblePixels.map((pixel) => pixel.join("")).join("\n");
};

// console.log(part2("0222112222120000", 2, 2));
// console.log(part2("021020201011101100", 3, 2));
console.log(part2(input, 6, 25));
