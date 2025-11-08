type DraggableTilePipeOptions = {
  type: "pipe";
  direction:
    | "horizontal"
    | "vertical"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight";
};

type DraggableTileOptions = DraggableTilePipeOptions;
