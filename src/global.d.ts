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

type TileHouseOptions = {
  type: "house";
};

type TileWaterOptions = {
  type: "water";
};

type TileOptions = {
  static: boolean;
} & (TilePipeOptions | TileHouseOptions | TileWaterOptions);
