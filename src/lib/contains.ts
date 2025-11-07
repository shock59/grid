export default function contains(
  coordinates: { x: number; y: number },
  box: DOMRectReadOnly
) {
  return (
    box.x <= coordinates.x &&
    box.x + box.width >= coordinates.x &&
    box.y <= coordinates.y &&
    box.y + box.height >= coordinates.y
  );
}
