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
  // Adjust vertical spacing based on overlap as well
  const verticalSpacing = diameter * (Math.sqrt(3) / 2) * (1 - overlap);

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
            key={i}
            href="#circle-template"
            x={pos.cx}
            y={pos.cy}
          />
        ))}
      </g>
    </svg>
  );
}