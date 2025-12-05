export const parse = input => {
  return input.split("\n").map(x => x.split(")"));
};

export const arrange = map => 
  map.reduce((structure, orbitRelation) => {
    const parentIndex = structure.findIndex(objects => objects.includes(orbitRelation[0]));
    if(parentIndex < 0) {
      structure.push([orbitRelation[0]]);
      structure.push([orbitRelation[1]]);
      return structure;
    }

    const childIndex = parentIndex + 1;
    
    if(structure[childIndex] === undefined) {
      structure[childIndex] = [];
    }

    return structure[childIndex].push(orbitRelation[1]) && structure;
  },[]);

export const countOrbits = (sum, objects, index) => {
  for (const object of objects) {
    sum += index;
  }
  return sum;
};

export const testCountOrbits = arranged => arranged.reduce(countOrbits, 0);

export const calculateAllOrbits = map => {
  const formattedMap = parse(map);
  const arrangedObjects = arrange(formattedMap);
  const totalOrbits = arrangedObjects.reduce(countOrbits, 0);
  return totalOrbits;
};