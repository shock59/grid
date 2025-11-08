type TilePipeOptions = {
  type: "pipe";
  direction:
    | "horizontal"
    | "vertical"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight";
};

type TileOptions = {
  static: boolean;
} & ({ type: "none" } | TilePipeOptions);
