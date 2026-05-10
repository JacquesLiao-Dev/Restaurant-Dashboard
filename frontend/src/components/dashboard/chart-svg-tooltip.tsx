type ChartSvgTooltipProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  value: string;
};

export function ChartSvgTooltip({ height, title, value, width, x, y }: ChartSvgTooltipProps) {
  return (
    <g pointerEvents="none" transform={`translate(${x}, ${y})`}>
      <rect fill="rgba(39, 31, 24, 0.94)" height={height} rx="20" width={width} />
      <text
        fill="white"
        fontSize="15"
        fontWeight="600"
        textAnchor="middle"
        x={width / 2}
        y={27}
      >
        {title}
      </text>
      <text
        fill="white"
        fontSize="22"
        fontWeight="700"
        textAnchor="middle"
        x={width / 2}
        y={55}
      >
        {value}
      </text>
    </g>
  );
}
