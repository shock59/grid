const pipeDirections: PipeDirection[] = [
  "horizontal",
  "vertical",
  "topLeft",
  "topRight",
  "bottomLeft",
  "bottomRight",
];
const multipleHorizontal: "horizontal"[] = new Array(2).fill("horizontal");
const multipleVertical: "vertical"[] = new Array(2).fill("vertical");

function randomFromArray<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function createNextPipe(
  previousPipe: PipeData,
  nextPipeLocation: Coordinates
): PipeData {
  const goingHorizontal = nextPipeLocation.x != previousPipe.coordinates.x;
  const validDirections: PipeDirection[] = (() => {
    switch (previousPipe.direction) {
      case "horizontal":
        return nextPipeLocation.x > previousPipe.coordinates.x
          ? [...multipleHorizontal, "topRight", "bottomRight"]
          : [...multipleHorizontal, "topLeft", "bottomLeft"];
      case "vertical":
        return nextPipeLocation.y > previousPipe.coordinates.y
          ? [...multipleVertical, "bottomLeft", "bottomRight"]
          : [...multipleVertical, "topLeft", "topRight"];
      case "topLeft":
        return goingHorizontal
          ? [...multipleHorizontal, "topRight", "bottomRight"]
          : [...multipleVertical, "bottomLeft", "bottomRight"];
      case "topRight":
        return goingHorizontal
          ? [...multipleHorizontal, "topLeft", "bottomLeft"]
          : [...multipleVertical, "bottomLeft", "bottomRight"];
      case "bottomLeft":
        return goingHorizontal
          ? [...multipleHorizontal, "topRight", "bottomRight"]
          : [...multipleVertical, "topLeft", "topRight"];
      case "bottomRight":
        return goingHorizontal
          ? [...multipleHorizontal, "topLeft", "bottomLeft"]
          : [...multipleVertical, "topLeft", "topRight"];
    }
  })();
  const direction = randomFromArray(validDirections);
  // const direction = "vertical";
  return { coordinates: nextPipeLocation, direction };
}

export default function createPipes(
  dimensions: { width: number; height: number },
  houseLocation: Coordinates,
  waterLocation: Coordinates
) {
  const pipes: PipeData[] = [];

  const direction = randomFromArray(pipeDirections);
  const randomAxis = Math.random() < 0.5 ? "x" : "y";
  let nextOffsetAxis = (() => {
    switch (direction) {
      case "horizontal":
        return "x";
      case "vertical":
        return "y";
      default:
        return randomAxis;
    }
  })();
  let nextOffsetDistance = Math.random() < 0.5 ? 1 : 1;
  const offsetDistance = (() => {
    switch (direction) {
      case "topLeft":
        return nextOffsetAxis == "x" ? -1 : -1;
      case "topRight":
        return nextOffsetAxis == "x" ? 1 : -1;
      case "bottomLeft":
        return nextOffsetAxis == "x" ? -1 : 1;
      case "bottomRight":
        return nextOffsetAxis == "x" ? 1 : 1;
      default:
        return nextOffsetDistance;
    }
  })();

  let previousPipe: PipeData = {
    coordinates: {
      x: houseLocation.x + (nextOffsetAxis == "x" ? offsetDistance : 0),
      y: houseLocation.y + (nextOffsetAxis == "y" ? offsetDistance : 0),
    },
    direction: direction,
  };
  pipes.push(previousPipe);

  while (true) {
    nextOffsetAxis = ["horizontal", "vertical"].includes(previousPipe.direction)
      ? nextOffsetAxis
      : nextOffsetAxis == "x"
      ? "y"
      : "x";
    nextOffsetDistance = (() => {
      switch (previousPipe.direction) {
        case "topLeft":
          return nextOffsetAxis == "x" ? 1 : 1;
        case "topRight":
          return nextOffsetAxis == "x" ? -1 : 1;
        case "bottomLeft":
          return nextOffsetAxis == "x" ? 1 : -1;
        case "bottomRight":
          return nextOffsetAxis == "x" ? -1 : -1;
        default:
          return nextOffsetDistance;
      }
    })();
    previousPipe = createNextPipe(previousPipe, {
      x:
        previousPipe.coordinates.x +
        (nextOffsetAxis == "x" ? nextOffsetDistance : 0),
      y:
        previousPipe.coordinates.y +
        (nextOffsetAxis == "y" ? nextOffsetDistance : 0),
    });

    if (
      waterLocation.x == previousPipe.coordinates.x &&
      waterLocation.y == previousPipe.coordinates.y
    ) {
      return pipes;
    }

    const overlapping = (() => {
      for (const coordinates of [
        houseLocation,
        ...pipes.map((pipe) => pipe.coordinates),
      ]) {
        if (
          coordinates.x == previousPipe.coordinates.x &&
          coordinates.y == previousPipe.coordinates.y
        )
          return true;
      }
      return false;
    })();
    if (
      overlapping ||
      previousPipe.coordinates.x < 0 ||
      previousPipe.coordinates.x >= dimensions.width ||
      previousPipe.coordinates.y < 0 ||
      previousPipe.coordinates.y >= dimensions.height
    ) {
      return createPipes(dimensions, houseLocation, waterLocation);
    }

    pipes.push(previousPipe);
  }
}
