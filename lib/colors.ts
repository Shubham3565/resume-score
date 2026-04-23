/**
 * Maps a 0-100 score to a Tailwind color class for text.
 *
 * Args:
 *   score: Numeric score between 0 and 100.
 *
 * Returns:
 *   Tailwind text color class string.
 */
export function scoreTextClass(score: number): string {
  if (score >= 75) return "text-green-700 dark:text-green-400";
  if (score >= 55) return "text-blue-700 dark:text-blue-400";
  if (score >= 35) return "text-amber-700 dark:text-amber-400";
  return "text-red-700 dark:text-red-400";
}

/**
 * Maps a 0-100 score to an inline SVG stroke color (hex).
 *
 * Args:
 *   score: Numeric score between 0 and 100.
 *
 * Returns:
 *   CSS hex color string.
 */
export function scoreStrokeColor(score: number): string {
  if (score >= 75) return "#97C459";
  if (score >= 55) return "#378ADD";
  if (score >= 35) return "#EF9F27";
  return "#E24B4A";
}

/**
 * Maps a 0-100 score to a Tailwind background color class for progress bars.
 *
 * Args:
 *   score: Numeric score between 0 and 100.
 *
 * Returns:
 *   Tailwind bg color class string.
 */
export function scoreBarClass(score: number): string {
  if (score >= 75) return "bg-green-500";
  if (score >= 55) return "bg-blue-500";
  if (score >= 35) return "bg-amber-500";
  return "bg-red-500";
}

type Verdict = "Strong Match" | "Good Match" | "Fair Match" | "Weak Match";

/**
 * Maps a verdict string to Tailwind classes for the verdict badge.
 *
 * Args:
 *   verdict: One of the four verdict categories.
 *
 * Returns:
 *   Tailwind class string for background + text color.
 */
export function verdictClasses(verdict: Verdict): string {
  const map: Record<Verdict, string> = {
    "Strong Match": "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400",
    "Good Match": "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400",
    "Fair Match": "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400",
    "Weak Match": "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400",
  };
  return map[verdict];
}
