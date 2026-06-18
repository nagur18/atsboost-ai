/**
 * Tiny classNames helper — joins truthy class strings together.
 * Avoids pulling in clsx/tailwind-merge for a project of this size.
 */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
