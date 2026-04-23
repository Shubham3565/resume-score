import { scoreStrokeColor } from "@/lib/colors";

interface ScoreRingProps {
  score: number;
  size?: number;
  dark?: boolean;
}

/**
 * Circular SVG ring that fills proportionally to the score.
 * Supports a dark variant (white track) for use on gradient banners.
 */
export default function ScoreRing({ score, size = 100, dark }: ScoreRingProps) {
  const radius = 40;
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
        stroke={dark ? "rgba(255,255,255,0.12)" : undefined}
        className={dark ? undefined : "stroke-surface-2"}
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
