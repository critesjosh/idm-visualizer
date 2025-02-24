interface CirclePatternProps {
  size: number;
  rows: number;
  overlap: number;
}

export default function CirclePattern({ size, rows, overlap }: CirclePatternProps) {
  // Calculate dimensions
  const diameter = size;
  const radius = diameter / 2;
  const horizontalSpacing = diameter * (1 - overlap);
  // Calculate vertical spacing based on equilateral triangle geometry
  const verticalSpacing = horizontalSpacing * Math.sqrt(3) / 2;

  // Calculate pattern dimensions
  const circlesPerRow = Math.ceil(800 / horizontalSpacing) + 1;
  const width = circlesPerRow * horizontalSpacing;
  const height = (rows + 0.5) * verticalSpacing;

  // Generate circle positions
  const circles: Array<{ cx: number; cy: number }> = [];

  for (let row = 0; row < rows; row++) {
    const isEvenRow = row % 2 === 0;
    const startX = isEvenRow ? 0 : horizontalSpacing / 2;

    for (let col = 0; col < circlesPerRow; col++) {
      circles.push({
        cx: startX + col * horizontalSpacing,
        cy: row * verticalSpacing
      });
    }
  }

  // Generate triangle vertices (points where 3 circles overlap)
  const triangles: Array<[number, number, number, number, number, number]> = [];

  for (let row = 0; row < rows - 1; row++) {
    const isEvenRow = row % 2 === 0;
    const startX = isEvenRow ? 0 : horizontalSpacing / 2;

    for (let col = 0; col < circlesPerRow - 1; col++) {
      // For each grid cell, calculate upward-pointing triangle
      const x1 = startX + col * horizontalSpacing + horizontalSpacing / 2;
      const y1 = row * verticalSpacing + verticalSpacing / 3;
      const x2 = x1 + horizontalSpacing;
      const y2 = y1;
      const x3 = x1 + horizontalSpacing / 2;
      const y3 = y1 + verticalSpacing;

      triangles.push([x1, y1, x2, y2, x3, y3]);

      // Calculate downward-pointing triangle if not in first row
      if (row > 0) {
        const x4 = x1;
        const y4 = y1;
        const x5 = x2;
        const y5 = y2;
        const x6 = x3;
        const y6 = y1 - verticalSpacing;

        triangles.push([x4, y4, x5, y5, x6, y6]);
      }
    }
  }

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      className="max-w-full"
    >
      <defs>
        <circle
          id="circle-template"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </defs>

      <g className="text-primary/20">
        {circles.map((pos, i) => (
          <use
            key={`circle-${i}`}
            href="#circle-template"
            x={pos.cx}
            y={pos.cy}
          />
        ))}
      </g>

      <g className="text-primary/10">
        {triangles.map((points, i) => (
          <polygon
            key={`triangle-${i}`}
            points={`${points[0]},${points[1]} ${points[2]},${points[3]} ${points[4]},${points[5]}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>

      {/* Add colored nodes at triangle vertices */}
      <g>
        {triangles.map((points, i) => {
          // Calculate row and column position
          const colors = ['#ff0000', '#00ff00', '#0000ff'];
          return (
            <g key={`nodes-${i}`}>
              <circle
                cx={points[0]}
                cy={points[1]}
                r={4}
                fill={colors[(i + 0) % 3]}
              />
              <circle
                cx={points[2]}
                cy={points[3]}
                r={4}
                fill={colors[(i + 1) % 3]}
              />
              <circle
                cx={points[4]}
                cy={points[5]}
                r={4}
                fill={colors[(i + 2) % 3]}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}