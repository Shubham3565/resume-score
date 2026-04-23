import { scoreStrokeColor } from "@/lib/colors";

interface ScoreRingProps {
  /** Score value from 0 to 100. */
  score: number;
  /** Diameter of the SVG in pixels. */
  size?: number;
}

/**
 * Circular SVG ring that fills proportionally to the score.
 */
export default function ScoreRing({ score, size = 92 }: ScoreRingProps) {
  const radius = 38;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * radius;
  const filled = (score / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="-rotate-90"
    >
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        className="stroke-surface-2"
        strokeWidth={7}
      />
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke={scoreStrokeColor(score)}
        strokeWidth={7}
        strokeDasharray={`${filled} ${circumference}`}
        strokeLinecap="round"
      />
    </svg>
  );
}
