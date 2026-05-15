/**
 * IntersectionObserver defaults shared by hooks that need to fire on
 * scroll-into-view (currently the CountUp component in v2). Threshold and
 * root margin are tuned so the trigger fires when the element is a touch
 * inside the viewport from the bottom, not the instant its edge crosses 0px.
 *
 * All other timing constants were retired in the v2 "Field Notes" redesign,
 * which deliberately uses almost no motion.
 */
export const INTERSECTION = {
  THRESHOLD: 0.1,
  ROOT_MARGIN: '0px 0px -50px 0px',
} as const;
