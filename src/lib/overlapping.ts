type Edges = [number, number];

const checks: ((r1: Edges, r2: Edges) => boolean)[] = [
  (r1: Edges, r2: Edges) => r1[0] < r2[0] && r1[1] > r2[0],
  (r1: Edges, r2: Edges) => r1[0] < r2[1] && r1[1] > r2[1],
  (r1: Edges, r2: Edges) => r1[0] < r2[0] && r1[1] > r2[1],
  (r1: Edges, r2: Edges) => r1[0] > r2[0] && r1[1] < r2[1],
];

function createEdgesArray(rect: DOMRect): [Edges, Edges] {
  return [
    [rect.x, rect.x + rect.width],
    [rect.y, rect.y + rect.height],
  ];
}

export default function overlapping(rect1: DOMRect, rect2: DOMRect) {
  const r1 = createEdgesArray(rect1);
  const r2 = createEdgesArray(rect2);

  let found = false;
  let total = 0;

  for (let d = 0; d < 2; d++) {
    for (const check of checks) {
      if (!check(r1[d], r2[d])) continue;

      const center1 = {
        x: rect1.x + rect1.width / 2,
        y: rect1.y + rect1.height / 2,
      };
      const center2 = {
        x: rect2.x + rect2.width / 2,
        y: rect2.y + rect2.height / 2,
      };

      total +=
        Math.abs(center1.x - center2.x) + Math.abs(center1.y - center2.y);
      found = true;
      break;
    }

    if (!found) {
      return -1;
    }
    found = false;
  }

  return total;
}
