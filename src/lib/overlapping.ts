function createEdgesObject(rect: DOMRect) {
  return [
    [rect.x, rect.x + rect.width],
    [rect.y, rect.y + rect.height],
  ];
}

export default function overlapping(rect1: DOMRect, rect2: DOMRect) {
  const r1 = createEdgesObject(rect1);
  const r2 = createEdgesObject(rect2);

  for (let d = 0; d < 2; d++) {
    if (
      !(
        (r1[d][0] < r2[d][0] && r1[d][1] > r2[d][0]) ||
        (r1[d][0] < r2[d][1] && r1[d][1] > r2[d][1]) ||
        (r1[d][0] < r2[d][0] && r1[d][1] > r2[d][1]) ||
        (r1[d][0] > r2[d][0] && r1[d][1] < r2[d][1])
      )
    )
      return false;
  }

  return true;
}
