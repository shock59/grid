export default function checkAnswer(
  houseLocation: Coordinates,
  waterLocation: Coordinates,
  pipes: PipeData[]
) {
  let [pipe, axis, offset] = (() => {
    for (const pipe of pipes) {
      if (pipe.direction == "horizontal") {
        if (
          Math.abs(houseLocation.x - pipe.coordinates.x) == 1 &&
          houseLocation.y == pipe.coordinates.y
        ) {
          return [pipe, "x", pipe.coordinates.x - houseLocation.x];
        }
      }
      if (pipe.direction == "vertical") {
        if (
          Math.abs(houseLocation.y - pipe.coordinates.y) == 1 &&
          houseLocation.x == pipe.coordinates.x
        ) {
          return [pipe, "y", pipe.coordinates.y - houseLocation.y];
        }
      }
      if (["topLeft", "topRight"].includes(pipe.direction)) {
        if (
          houseLocation.y - pipe.coordinates.y == 1 &&
          houseLocation.x == pipe.coordinates.x
        ) {
          return [pipe, "x", pipe.direction == "topLeft" ? -1 : 1];
        }
      }
      if (["bottomLeft", "bottomRight"].includes(pipe.direction)) {
        if (
          houseLocation.y - pipe.coordinates.y == -1 &&
          houseLocation.x == pipe.coordinates.x
        ) {
          return [pipe, "x", pipe.direction == "bottomLeft" ? -1 : 1];
        }
      }
      if (["topLeft", "bottomLeft"].includes(pipe.direction)) {
        if (
          houseLocation.x - pipe.coordinates.x == 1 &&
          houseLocation.y == pipe.coordinates.y
        ) {
          return [pipe, "y", pipe.direction == "topLeft" ? 1 : -1];
        }
      }
      if (["topRight", "bottomRight"].includes(pipe.direction)) {
        if (
          houseLocation.x - pipe.coordinates.x == -1 &&
          houseLocation.y == pipe.coordinates.y
        ) {
          return [pipe, "y", pipe.direction == "topRight" ? 1 : -1];
        }
      }
    }
    return [undefined, "x", 0];
  })();

  if (pipe == undefined) return false;

  if (
    ["topLeft", "topRight", "bottomLeft", "bottomRight"].includes(
      pipe.direction
    )
  )
    offset *= -1;

  while (true) {
    const nextCoordinates: Coordinates = {
      x: pipe!.coordinates.x + (axis == "x" ? offset : 0),
      y: pipe!.coordinates.y + (axis == "y" ? offset : 0),
    };

    if (
      nextCoordinates.x == waterLocation.x &&
      nextCoordinates.y == waterLocation.y
    )
      return true;

    pipe = pipes.find(
      (p) =>
        p.coordinates.x == nextCoordinates.x &&
        p.coordinates.y == nextCoordinates.y
    );
    if (pipe == undefined) return false;

    if (pipe.direction == "horizontal" && axis == "y") return false;
    if (pipe.direction == "vertical" && axis == "x") return false;
    if (
      ["topLeft", "topRight"].includes(pipe.direction) &&
      axis == "y" &&
      offset > 0
    )
      return false;
    if (
      ["bottomLeft", "bottomRight"].includes(pipe.direction) &&
      axis == "y" &&
      offset < 0
    )
      return false;
    if (
      ["topLeft", "bottomLeft"].includes(pipe.direction) &&
      axis == "x" &&
      offset > 0
    )
      return false;
    if (
      ["topRight", "bottomRight"].includes(pipe.direction) &&
      axis == "x" &&
      offset < 0
    )
      return false;

    if (
      ["topLeft", "topRight", "bottomLeft", "bottomRight"].includes(
        pipe.direction
      )
    ) {
      axis = axis == "x" ? "y" : "x";
      if (["topLeft", "bottomRight"].includes(pipe.direction)) offset *= -1;
    }
  }
}
