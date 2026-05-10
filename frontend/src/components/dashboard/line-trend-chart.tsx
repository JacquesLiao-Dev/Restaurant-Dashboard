"use client";

import { useMemo, useState } from "react";

import type { ChartPoint } from "@/features/home/home-analytics";
import { cn } from "@/lib/utils/cn";

import { getChartTicks } from "@/components/dashboard/chart-utils";
import { ChartSvgTooltip } from "@/components/dashboard/chart-svg-tooltip";

type LineTrendChartProps = {
  chartId: string;
  data: ChartPoint[];
  className?: string;
  formatValue?: (value: number) => string;
  formatAxisValue?: (value: number) => string;
};

export function LineTrendChart({
  chartId,
  className,
  data,
  formatValue = (value) => value.toLocaleString("fr-FR"),
  formatAxisValue = (value) => value.toLocaleString("fr-FR"),
}: LineTrendChartProps) {
  const width = 760;
  const height = 368;
  const paddingLeft = 64;
  const paddingRight = 22;
  const paddingTop = 20;
  const paddingBottom = 92;
  const bottom = height - paddingBottom;
  const safeRange = width - paddingLeft - paddingRight;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const maxValue = Math.max(...data.map((point) => point.value), 1);
  const ticks = getChartTicks(maxValue, 4);

  const points = useMemo(
    () =>
      data.map((point, index) => {
        const x = paddingLeft + (safeRange / Math.max(data.length - 1, 1)) * index;
        const y = bottom - (point.value / ticks.max) * (bottom - paddingTop);

        return { ...point, x, y };
      }),
    [bottom, data, paddingLeft, paddingTop, safeRange, ticks.max],
  );

  const linePath = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const areaPath = `${linePath} L ${points.at(-1)?.x ?? width} ${bottom} L ${points[0]?.x ?? paddingLeft} ${bottom} Z`;
  const activePoint = activeIndex !== null ? points[activeIndex] : null;
  const tooltipWidth = 184;
  const tooltipHeight = 68;
  const tooltipX = activePoint
    ? Math.min(Math.max(activePoint.x - tooltipWidth / 2, 12), width - tooltipWidth - 12)
    : 0;
  const tooltipY = activePoint ? Math.max(activePoint.y - tooltipHeight - 20, 12) : 0;
  const segmentWidth = safeRange / Math.max(data.length - 1, 1);

  return (
    <div className={cn("space-y-4", className)} onMouseLeave={() => setActiveIndex(null)}>
      <svg
        aria-labelledby={`${chartId}-title`}
        className="h-[368px] w-full"
        role="img"
        viewBox={`0 0 ${width} ${height}`}
      >
        <title id={`${chartId}-title`}>Evolution des revenus cumules</title>

        <defs>
          <linearGradient id={`${chartId}-fill`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(235, 102, 57, 0.30)" />
            <stop offset="100%" stopColor="rgba(235, 102, 57, 0.02)" />
          </linearGradient>
        </defs>

        {ticks.values.map((tickValue, index) => {
          const y = bottom - (tickValue / ticks.max) * (bottom - paddingTop);

          return (
            <g key={index}>
              <line
                stroke="rgba(73, 55, 43, 0.08)"
                strokeDasharray="4 6"
                strokeWidth="1"
                x1={paddingLeft}
                x2={width - paddingRight}
                y1={y}
                y2={y}
              />
              <text
                fill="rgba(73, 55, 43, 0.72)"
                fontSize="12"
                textAnchor="end"
                x={paddingLeft - 10}
                y={y + 4}
              >
                {formatAxisValue(tickValue)}
              </text>
            </g>
          );
        })}

        <path d={areaPath} fill={`url(#${chartId}-fill)`} />
        <path d={linePath} fill="none" stroke="rgba(235, 102, 57, 1)" strokeLinecap="round" strokeWidth="3.5" />

        {points.map((point, index) => (
          <g key={point.label}>
            <circle
              cx={point.x}
              cy={point.y}
              fill={index === activeIndex ? "rgba(235, 102, 57, 1)" : "white"}
              r={index === activeIndex ? 6 : 5}
              stroke="rgba(235, 102, 57, 1)"
              strokeWidth="3"
            />
            <rect
              aria-label={`${point.label} ${formatValue(point.value)}`}
              fill="transparent"
              height={bottom - paddingTop + 70}
              onBlur={() => setActiveIndex(null)}
              onFocus={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              tabIndex={0}
              width={Math.max(segmentWidth, 32)}
              x={index === 0 ? paddingLeft - Math.max(segmentWidth, 32) / 2 : point.x - Math.max(segmentWidth, 32) / 2}
              y={paddingTop - 12}
            />
          </g>
        ))}

        {activePoint ? (
          <>
            <line
              stroke="rgba(73, 55, 43, 0.22)"
              strokeDasharray="5 6"
              strokeWidth="1.5"
              x1={activePoint.x}
              x2={activePoint.x}
              y1={paddingTop}
              y2={bottom}
            />
            <ChartSvgTooltip
              height={tooltipHeight}
              title={activePoint.label}
              value={formatValue(activePoint.value)}
              width={tooltipWidth}
              x={tooltipX}
              y={tooltipY}
            />
          </>
        ) : null}

        {points.map((point, index) => (
          <g key={`${point.label}-axis`}>
            <text
              fill={index === activeIndex ? "rgba(39, 31, 24, 1)" : "rgba(73, 55, 43, 0.78)"}
              fontSize="13"
              fontWeight={index === activeIndex ? "600" : "500"}
              textAnchor="middle"
              x={point.x}
              y={bottom + 34}
            >
              {point.shortLabel}
            </text>
            <text
              fill={index === activeIndex ? "rgba(39, 31, 24, 1)" : "rgba(73, 55, 43, 0.78)"}
              fontSize="13"
              textAnchor="middle"
              x={point.x}
              y={bottom + 58}
            >
              {point.secondaryLabel ?? point.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
