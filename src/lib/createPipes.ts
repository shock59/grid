const pipeDirections: PipeDirection[] = [
  "horizontal",
  "vertical",
  "topLeft",
  "topRight",
  "bottomLeft",
  "bottomRight",
];

function randomFromArray<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export default function createPipes(
  dimensions: { width: number; height: number },
  houseLocation: Coordinates,
  waterLocation: Coordinates
) {
  const pipes: { coordinates: Coordinates; direction: PipeDirection }[] = [];
  const pipeDirection = randomFromArray(pipeDirections);
  const randomAxis = Math.random() < 0.5 ? "x" : "y";
  const pipeOffsetAxis = (() => {
    switch (pipeDirection) {
      case "horizontal":
        return "x";
      case "vertical":
        return "y";
      default:
        return randomAxis;
    }
  })();
  const randomOffsetDistance = Math.random() < 0.5 ? 1 : 1;
  const pipeOffsetDistance = (() => {
    switch (pipeDirection) {
      case "topLeft":
        return pipeOffsetAxis == "x" ? -1 : -1;
      case "topRight":
        return pipeOffsetAxis == "x" ? 1 : -1;
      case "bottomLeft":
        return pipeOffsetAxis == "x" ? -1 : 1;
      case "bottomRight":
        return pipeOffsetAxis == "x" ? 1 : 1;
      default:
        return randomOffsetDistance;
    }
  })();
  pipes.push({
    coordinates: {
      x: houseLocation.x + (pipeOffsetAxis == "x" ? pipeOffsetDistance : 0),
      y: houseLocation.y + (pipeOffsetAxis == "y" ? pipeOffsetDistance : 0),
    },
    direction: pipeDirection,
  });
  return pipes;
}
