type Coordinates = { x: number; y: number };

type PipeDirection =
  | "horizontal"
  | "vertical"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight";

type PipeData = {
  coordinates: Coordinates;
  direction: PipeDirection;
};

type PipeDataWithStatic = PipeData & {
  static: boolean;
};

type TilePipeOptions = {
  type: "pipe";
  direction: PipeDirection;
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
