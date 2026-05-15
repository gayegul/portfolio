import type { ReactNode } from 'react';

/**
 * Chapter — the editorial unit used by the Experience (and reusable for
 * later sections). Renders the 12-col marginalia layout established by Hero:
 *
 *   col-span-2   left rail   (year, place, small mono caps)
 *   col-span-8   main column (chapter title + serif body, max ~640px)
 *   col-span-2   right rail  (impact stat or quiet caption)
 *
 * Children render inside the main column. Right-rail content is opt-in via
 * the `marginalia` prop. Photos / pull quotes that "break the grid" should
 * be siblings inside `children` and use negative margins to bleed right.
 */
interface ChapterProps {
  year: string;
  place?: string;
  marginalia?: ReactNode;
  children: ReactNode;
}

export function Chapter({ year, place, marginalia, children }: ChapterProps) {
  return (
    <article className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-8 lg:gap-x-12">
      {/* LEFT RAIL — year + place */}
      <aside
        className="md:col-span-2 order-1"
        aria-label={`Chapter dates: ${year}`}
      >
        <div className="md:sticky md:top-24 flex flex-col gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Years
            </p>
            <p className="font-mono text-xs text-ink mt-1 tabular-nums">
              {year}
            </p>
          </div>

          {place ? (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Filed from
              </p>
              <p className="font-mono text-xs text-ink mt-1">{place}</p>
            </div>
          ) : null}
        </div>
      </aside>

      {/* MAIN COLUMN — title + body */}
      <div className="md:col-span-8 order-2 min-w-0">{children}</div>

      {/* RIGHT RAIL — marginalia (impact, stat, caption) */}
      <aside
        className="md:col-span-2 order-3"
        aria-label="Chapter notes"
      >
        {marginalia ? (
          <div className="md:sticky md:top-24 flex flex-col gap-6 md:text-right md:items-end">
            {marginalia}
          </div>
        ) : null}
      </aside>
    </article>
  );
}

/**
 * Marginalia — a single label/value pair styled like Hero's rail entries.
 * Reused on right and left rails so spacing stays in sync.
 */
interface MarginaliaProps {
  label: string;
  value: ReactNode;
}

export function Marginalia({ label, value }: MarginaliaProps) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
        {label}
      </p>
      <p className="font-mono text-xs text-ink mt-1">{value}</p>
    </div>
  );
}

export default Chapter;
