import { chunk, minBy } from "jsr:@std/collections";
const parse = (data, height, width) => chunk(data, height * width);

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

const main = (input, height, width) => {
  const imageData = parse(input, height, width);
  const layerWithLeast0 = findLayerWithLeast0(imageData);
  const countOf1 = countOne(layerWithLeast0);
  const countOf2 = countTwo(layerWithLeast0);
  return countOf1 * countOf2;
};
const input = Deno.readTextFileSync("./data/input.txt");

// console.log(main("123456789012", 2, 3));
// console.log(main("123152789012", 2, 3));
console.log(main(input, 6, 25));
