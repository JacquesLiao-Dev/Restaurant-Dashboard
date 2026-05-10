"use client";

import { useMemo, useState } from "react";

import type { ChartPoint } from "@/features/home/home-analytics";
import { cn } from "@/lib/utils/cn";

import { getChartTicks } from "@/components/dashboard/chart-utils";
import { ChartSvgTooltip } from "@/components/dashboard/chart-svg-tooltip";

type BarTrendChartProps = {
  chartId: string;
  data: ChartPoint[];
  className?: string;
  formatValue?: (value: number) => string;
  formatAxisValue?: (value: number) => string;
};

export function BarTrendChart({
  chartId,
  className,
  data,
  formatValue = (value) => `${value}`,
  formatAxisValue = (value) => value.toLocaleString("fr-FR"),
}: BarTrendChartProps) {
  const width = 760;
  const height = 368;
  const paddingLeft = 64;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 92;
  const bottom = height - paddingBottom;
  const safeRange = width - paddingLeft - paddingRight;

  const maxValue = Math.max(...data.map((point) => point.value), 1);
  const ticks = getChartTicks(maxValue, 4);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const points = useMemo(() => {
    const slotWidth = safeRange / Math.max(data.length, 1);
    const barWidth = Math.min(Math.max(slotWidth * 0.56, 28), 72);

    return data.map((point, index) => {
      const x = paddingLeft + slotWidth * index + slotWidth / 2;
      const barHeight = (point.value / ticks.max) * (bottom - paddingTop);

      return {
        ...point,
        x,
        barHeight,
        y: bottom - barHeight,
        slotWidth,
        barWidth,
      };
    });
  }, [bottom, data, paddingLeft, paddingTop, safeRange, ticks.max]);

  const activePoint = activeIndex !== null ? points[activeIndex] : null;
  const tooltipWidth = 184;
  const tooltipHeight = 68;
  const tooltipX = activePoint
    ? Math.min(Math.max(activePoint.x - tooltipWidth / 2, 12), width - tooltipWidth - 12)
    : 0;
  const tooltipY = activePoint ? Math.max(activePoint.y - tooltipHeight - 18, 12) : 0;

  return (
    <div className={cn("space-y-4", className)} onMouseLeave={() => setActiveIndex(null)}>
      <svg
        aria-labelledby={`${chartId}-title`}
        className="h-[368px] w-full"
        role="img"
        viewBox={`0 0 ${width} ${height}`}
      >
        <title id={`${chartId}-title`}>Evolution du volume de commandes</title>

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

        {points.map((point, index) => {
          const isActive = index === activeIndex;
          const trackHeight = bottom - paddingTop;

          return (
            <g key={point.label}>
              <rect
                fill="rgba(248, 241, 224, 0.55)"
                height={trackHeight}
                rx={point.barWidth / 2}
                width={point.barWidth}
                x={point.x - point.barWidth / 2}
                y={paddingTop}
              />
              <rect
                fill={isActive ? "rgba(235, 102, 57, 1)" : "rgba(235, 102, 57, 0.22)"}
                height={Math.max(point.barHeight, point.value > 0 ? 10 : 4)}
                rx={point.barWidth / 2}
                width={point.barWidth}
                x={point.x - point.barWidth / 2}
                y={bottom - Math.max(point.barHeight, point.value > 0 ? 10 : 4)}
              />
              <rect
                aria-label={`${point.label} ${formatValue(point.value)}`}
                fill="transparent"
                height={trackHeight + 70}
                onBlur={() => setActiveIndex(null)}
                onFocus={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                tabIndex={0}
                width={Math.max(point.slotWidth, 42)}
                x={point.x - Math.max(point.slotWidth, 42) / 2}
                y={paddingTop - 12}
              />
            </g>
          );
        })}

        {activePoint ? (
          <ChartSvgTooltip
            height={tooltipHeight}
            title={activePoint.label}
            value={formatValue(activePoint.value)}
            width={tooltipWidth}
            x={tooltipX}
            y={tooltipY}
          />
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
