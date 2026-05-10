export function getChartStep(maxValue: number) {
  if (maxValue <= 5) {
    return 1;
  }

  if (maxValue <= 10) {
    return 2;
  }

  if (maxValue <= 50) {
    return 5;
  }

  if (maxValue <= 100) {
    return 10;
  }

  if (maxValue <= 200) {
    return 20;
  }

  const magnitude = 10 ** Math.floor(Math.log10(maxValue));
  const normalized = maxValue / magnitude;

  if (normalized <= 2) {
    return magnitude / 2;
  }

  if (normalized <= 5) {
    return magnitude;
  }

  return magnitude * 2;
}

export function getChartTicks(maxValue: number, count = 4) {
  const step = getChartStep(maxValue);
  const minimumSteps = Math.max(count, 1);
  const roundedMax = Math.max(Math.ceil(maxValue / step) * step, step * minimumSteps);
  const totalSteps = Math.round(roundedMax / step);
  const values = Array.from({ length: totalSteps + 1 }, (_, index) => index * step);

  return {
    max: roundedMax || step * count,
    values,
  };
}
