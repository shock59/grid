function randomIndexFromArray(array: unknown[]): number {
  return Math.floor(Math.random() * array.length);
}

export default function createStaticIndexes(
  length: number,
  staticPercentage: number
) {
  if (length == 0) return [];

  let notStatics = new Array(length).map((_, index) => index);
  let statics: number[] = [];
  for (let i = 0; i < Math.floor(length * staticPercentage); i++) {
    const index = randomIndexFromArray(notStatics);
    notStatics.slice(index, 1);
    statics.push(index);
  }
  return statics;
}
