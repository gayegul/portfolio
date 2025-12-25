export const ANIMATION = {
  STAGGER_DELAY: 150,
  HERO_SUBTITLE_DELAY: 500,
  HERO_DESCRIPTION_DELAY: 700,
  FADE_DURATION: 700,
  TRANSITION_DURATION: 300,
  NAV_SCROLL_THRESHOLD: 100,
} as const;

export const INTERSECTION = {
  THRESHOLD: 0.1,
  ROOT_MARGIN: '0px 0px -50px 0px',
} as const;

interface BlobConfig {
  size: number;
  basePosition: { x: number; y: number };
  drift: { x: number; y: number };
  color: string;
  speed: number;
  rotation: number;
}

export const BLOB_CONFIG: BlobConfig[] = [
  {
    size: 280,
    basePosition: { x: 75, y: 25 },
    drift: { x: -20, y: 40 },
    color: 'rgba(20, 184, 166, 0.12)',
    speed: 1,
    rotation: 360,
  },
  {
    size: 180,
    basePosition: { x: 20, y: 60 },
    drift: { x: 30, y: -20 },
    color: 'rgba(6, 182, 212, 0.1)',
    speed: 0.7,
    rotation: -180,
  },
  {
    size: 120,
    basePosition: { x: 85, y: 70 },
    drift: { x: -40, y: 20 },
    color: 'rgba(20, 184, 166, 0.15)',
    speed: 1.3,
    rotation: 270,
  },
  {
    size: 90,
    basePosition: { x: 10, y: 30 },
    drift: { x: 20, y: 50 },
    color: 'rgba(45, 212, 191, 0.08)',
    speed: 0.5,
    rotation: -90,
  },
  {
    size: 60,
    basePosition: { x: 60, y: 85 },
    drift: { x: -10, y: -30 },
    color: 'rgba(94, 234, 212, 0.12)',
    speed: 1.5,
    rotation: 180,
  },
];

export const SPARKLE_COUNT = 8;

export const LAYOUT = {
  SECTION_SCROLL_MARGIN: '5rem',
  PRESS_IMAGE_HEIGHT: 'h-56',
  HERO_IMAGE_MAX_WIDTH_MOBILE: 'max-w-[220px]',
  HERO_IMAGE_MAX_WIDTH_DESKTOP: 'lg:max-w-[280px]',
} as const;
