import { useCallback, useState } from 'react';
import { Lightbox } from '../Lightbox';
import wiredMagazine from '../../assets/images/photos/wired_magazine.png';
import pressSocial from '../../assets/images/photos/press_social.png';
import xcloudBooth from '../../assets/images/photos/xcloud_booth.jpeg';
import pressPhotoshoot from '../../assets/images/photos/press_photoshoot.jpg';

/**
 * Press — Section Nº 03. "Press clippings."
 *
 * Scrapbook wall, not a card grid. Four bylines pinned to the page at slight
 * angles with masking-tape strips at the top corners. Wired is the anchor —
 * largest clipping, the only `bg-highlight` phrase in the section sits on
 * its caption. The smaller three are arranged around it at alternating
 * subtle rotations. Margin-red mono annotations are scattered between the
 * clippings to read like hand notes on the corkboard.
 *
 * Inherited from Hero + Experience:
 *  - § Nº 03 folio in accent
 *  - serif heading, italic on trailing word
 *  - h-px w-24 sm:w-32 bg-accent accent rule
 *  - mono caption pattern (Fig. NN · outlet, year)
 *  - end-of-section colophon
 *  - no motion
 *
 * Mobile (<md): the wall metaphor collapses. Clippings stack vertically
 * with a tiny -0.5deg / +0.5deg rotation for character. Annotations stay
 * but reflow into the column.
 */

interface PressItem {
  image: string;
  alt: string;
  outlet: string;
  date: string;
  url: string;
  /** Optional background color for letterboxed logos (e.g. TechRadar) */
  background?: string;
  /** object-fit treatment for the clipping */
  fit?: 'cover' | 'contain';
  /** object-position when fit is 'cover' */
  position?: string;
}

const ANCHOR: PressItem = {
  image: wiredMagazine,
  alt: 'Wired magazine feature on Xbox Cloud Gaming, with a controller floating on a neon background.',
  outlet: 'Wired',
  date: '2020',
  url: 'https://www.wired.com/story/xbox-cloud-gaming-exclusive/',
  fit: 'cover',
  position: 'left center',
};

const CLIPPINGS: PressItem[] = [
  {
    image: xcloudBooth,
    alt: 'GeekWire coverage of Project xCloud — the xCloud booth photographed at a conference.',
    outlet: 'GeekWire',
    date: '2019',
    url: 'https://www.geekwire.com/2019/microsoft-will-bring-project-xcloud-game-streaming-service-windows-10-pcs/',
    fit: 'cover',
    position: 'center',
  },
  {
    image: pressSocial,
    alt: 'TechRadar article on prototype Xbox controllers for phones and tablets.',
    outlet: 'TechRadar',
    date: '2018',
    url: 'https://www.techradar.com/news/prototype-xbox-controllers-for-phones-and-tablets-show-up-in-research-papers',
    fit: 'contain',
    background: '#FFFFFF',
  },
  {
    image: pressPhotoshoot,
    alt: 'Microsoft blog feature — the marketing photoshoot for Project xCloud.',
    outlet: 'Microsoft',
    date: '2018',
    url: 'https://blogs.microsoft.com/blog/2018/10/08/project-xcloud-gaming-with-you-at-the-center/',
    fit: 'cover',
    position: 'center 15%',
  },
];

/**
 * Tape — a small masking-tape strip pinned at the top-left corner of each
 * clipping. Rendered as a rotated rectangle in muted/30 so it reads as
 * translucent paper tape on the cream background. Decorative only.
 */
function Tape({ side = 'left' }: { side?: 'left' | 'right' }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute -top-2 z-10 h-4 w-14 bg-muted/25 ${
        side === 'left' ? '-left-2 -rotate-[8deg]' : '-right-2 rotate-[8deg]'
      }`}
    />
  );
}

/**
 * Clipping — a single press item rendered as a taped paper rectangle.
 * Wrapped in a button so the full surface opens the Lightbox. Hover/focus
 * straightens the rotation and lifts the piece slightly.
 *
 * `rotation` is applied to the wrapper so the tape and clipping rotate
 * together as a single object on the wall.
 */
interface ClippingProps {
  item: PressItem;
  /** Full Tailwind rotation classes — must be literal so Tailwind's JIT picks them up. */
  rotationClass: string;
  figNumber: string;
  onOpen: (item: PressItem) => void;
  className?: string;
  imgClassName?: string;
  tapeSide?: 'left' | 'right';
  /** Whether the caption phrase should carry bg-highlight (anchor only) */
  highlightCaption?: boolean;
}

function Clipping({
  item,
  rotationClass,
  figNumber,
  onOpen,
  className = '',
  imgClassName = 'h-44 sm:h-56',
  tapeSide = 'left',
  highlightCaption = false,
}: ClippingProps) {
  return (
    <figure
      className={`relative ${rotationClass} transition-transform duration-300 ease-out hover:rotate-0 focus-within:rotate-0 hover:-translate-y-0.5 focus-within:-translate-y-0.5 ${className}`}
    >
      <Tape side={tapeSide} />

      <button
        type="button"
        onClick={() => onOpen(item)}
        aria-label={`Open full image: ${item.alt}`}
        className="block w-full bg-paper shadow-[0_1px_0_rgba(26,26,26,0.08),0_8px_18px_-12px_rgba(26,26,26,0.25)] ring-1 ring-ink/10 hover:ring-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      >
        <div
          className="w-full overflow-hidden"
          style={{ backgroundColor: item.background ?? '#EFE9DC' }}
        >
          <img
            src={item.image}
            alt=""
            role="presentation"
            loading="lazy"
            decoding="async"
            className={`block w-full ${imgClassName} object-${item.fit ?? 'cover'}`}
            style={{ objectPosition: item.position }}
          />
        </div>
      </button>

      <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
        <span className="text-ink">{figNumber}</span>
        {' · '}
        {highlightCaption ? (
          <span className="relative inline-block">
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-[0.55em] bg-highlight -z-0"
            />
            <span className="relative z-10">
              {item.outlet}, {item.date}
            </span>
          </span>
        ) : (
          <>
            {item.outlet}, {item.date}
          </>
        )}
        <span aria-hidden="true">{' · '}</span>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted underline decoration-muted/40 underline-offset-2 hover:text-accent hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          read <span aria-hidden="true">→</span>
          <span className="sr-only">
            {` — open ${item.outlet} article in a new tab`}
          </span>
        </a>
      </figcaption>
    </figure>
  );
}

/**
 * Annotation — a handwritten-style mono note rendered in accent-red,
 * pinned absolutely on desktop and inline on mobile.
 */
interface AnnotationProps {
  children: React.ReactNode;
  /** Desktop-only positioning classes — e.g. "md:top-10 md:-right-6" */
  position?: string;
  rotate?: string;
}

function Annotation({
  children,
  position = '',
  rotate = 'md:-rotate-2',
}: AnnotationProps) {
  return (
    <p
      aria-hidden="true"
      className={`pointer-events-none font-mono text-xs text-accent leading-snug max-w-[14ch] ${rotate} md:absolute ${position} my-3 md:my-0`}
    >
      {children}
    </p>
  );
}

export function Press() {
  const [lightboxItem, setLightboxItem] = useState<PressItem | null>(null);

  const handleOpen = useCallback((item: PressItem) => {
    setLightboxItem(item);
  }, []);
  const handleClose = useCallback(() => setLightboxItem(null), []);

  return (
    <>
      <section
        id="press"
        aria-labelledby="press-heading"
        className="relative px-4 sm:px-6 lg:px-10 pt-24 sm:pt-32 lg:pt-40 pb-24 sm:pb-32 scroll-mt-nav"
      >
        <div className="mx-auto max-w-7xl">
          {/* ─── Section header — mirrors Experience ─── */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-8 lg:gap-x-12">
            <div className="md:col-span-2" aria-hidden="true" />
            <div className="md:col-span-10">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent mb-6 sm:mb-8">
                <span aria-hidden="true">§ </span>
                Nº 03 — Press
              </p>

              <h2
                id="press-heading"
                className="font-serif font-medium text-ink leading-[0.95] tracking-tight text-5xl sm:text-6xl md:text-7xl"
              >
                Press <span className="italic">clippings</span>
                <span aria-hidden="true" className="text-accent">.</span>
              </h2>

              <div
                aria-hidden="true"
                className="mt-6 sm:mt-8 h-px w-24 sm:w-32 bg-accent"
              />

              <p className="mt-8 sm:mt-10 font-serif italic text-base sm:text-lg text-muted max-w-xl">
                What other people wrote when the prototype became a product.
              </p>
            </div>
          </div>

          {/* ─── Scrapbook wall ───────────────────────────────────────── */}
          {/*
            Layout strategy:
              - On md+ we use a 12-col grid where the anchor (Wired) spans
                7 cols and the smaller three sit in a 5-col stack on the
                right. Each clipping is independently rotated.
              - Below md the grid collapses to one column. Rotations are
                replaced with a near-zero tilt so the page still reads
                handmade but doesn't get awkward at narrow widths.
          */}
          <div className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-12 gap-x-6 lg:gap-x-10 gap-y-14 md:gap-y-0">

            {/* ── Anchor: Wired ──────────────────────────────────────── */}
            <div className="md:col-span-7 md:col-start-2 relative">
              <Clipping
                item={ANCHOR}
                rotationClass="-rotate-[0.5deg] md:-rotate-[1.5deg]"
                figNumber="Fig. 02"
                onOpen={handleOpen}
                imgClassName="h-64 sm:h-80 md:h-[28rem] lg:h-[32rem]"
                tapeSide="left"
                highlightCaption
              />

              {/* Margin annotation — sits above Wired on desktop */}
              <Annotation
                position="md:-top-4 md:-left-8 lg:-left-14"
                rotate="md:-rotate-3"
              >
                ↓ cover story —
                <br />
                the one that mattered.
              </Annotation>
            </div>

            {/* ── Right stack: three smaller clippings ───────────────── */}
            <div className="md:col-span-3 md:col-start-9 relative flex flex-col gap-12 md:gap-10 md:pt-6">

              <Clipping
                item={CLIPPINGS[0]}
                rotationClass="rotate-[0.5deg] md:rotate-[2deg]"
                figNumber="Fig. 03"
                onOpen={handleOpen}
                imgClassName="h-40 sm:h-48 md:h-44"
                tapeSide="right"
              />

              <Clipping
                item={CLIPPINGS[1]}
                rotationClass="-rotate-[0.5deg] md:-rotate-[1deg]"
                figNumber="Fig. 04"
                onOpen={handleOpen}
                imgClassName="h-40 sm:h-48 md:h-40"
                tapeSide="left"
              />

              <Clipping
                item={CLIPPINGS[2]}
                rotationClass="rotate-[0.5deg] md:rotate-[1.5deg]"
                figNumber="Fig. 05"
                onOpen={handleOpen}
                imgClassName="h-40 sm:h-48 md:h-44"
                tapeSide="right"
              />

              {/* Annotation tucked between the stacked clippings on desktop */}
              <Annotation
                position="md:top-[14.5rem] md:-left-20 lg:-left-28"
                rotate="md:rotate-2"
              >
                ← syndicated to half the
                <br />
                trade press that week
              </Annotation>
            </div>

            {/* One last annotation — bottom of the wall, under Wired */}
            <div
              className="md:col-span-7 md:col-start-2 relative md:-mt-4"
              aria-hidden="true"
            >
              <Annotation
                position="md:relative md:left-[55%] lg:left-[60%]"
                rotate="md:-rotate-1"
              >
                → mom keeps a copy
                <br />
                in the kitchen drawer.
              </Annotation>
            </div>
          </div>

          {/* ─── End-of-section colophon ─── */}
          <div className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-x-8 lg:gap-x-12">
            <div className="md:col-span-2" aria-hidden="true" />
            <div className="md:col-span-8">
              <div aria-hidden="true" className="h-px w-24 sm:w-32 bg-accent" />
              <p className="mt-6 font-mono text-xs text-muted max-w-md">
                <span className="text-ink">end of section —</span>{' '}
                a few bylines, pinned where I can still see them.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Lightbox
        image={lightboxItem?.image}
        alt={lightboxItem?.alt}
        isOpen={!!lightboxItem}
        onClose={handleClose}
      />
    </>
  );
}

export default Press;
