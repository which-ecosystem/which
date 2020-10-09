const metrics = [
  { name: 'minute', ratio: 60 },
  { name: 'hour', ratio: 60 },
  { name: 'day', ratio: 24 },
  { name: 'week', ratio: 7 },
  { name: 'month', ratio: 4 },
  { name: 'year', ratio: 12 }
];

const PRECISION = 0.75;

const resolve = (value: number, metricIndex = 0): string => {
  // Recursively divide value until it's ready to be presented as a string
  const metric = metrics[metricIndex];
  const nextMetric = metrics[metricIndex + 1];
  const newValue = value / metric.ratio;

  if (newValue < nextMetric.ratio * PRECISION) {
    const rounded = Math.round(newValue);
    const isPlural = rounded > 1;
    const count = isPlural ? rounded : 'a';
    const ending = isPlural ? 's' : '';
    return `${count} ${metric.name}${ending} ago`;
  }
  return resolve(newValue, metricIndex + 1);
};

const compactDateString = (date: Date): string => {
  const now = new Date();
  const diff = (now.valueOf() - date.valueOf()) / 1000;
  if (diff < 60) return 'just now';
  return resolve(diff);
};

export default compactDateString;
