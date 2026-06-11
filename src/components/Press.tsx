import { useState, useMemo, useCallback, useEffect } from 'react';
import { SectionHeader } from './SectionHeader';
import { Lightbox } from './Lightbox';
import wiredMagazine from '../assets/images/photos/wired_magazine.png';
import pressSocial from '../assets/images/photos/press_social.png';
import xcloudBooth from '../assets/images/photos/xcloud_booth.jpeg';
import pressPhotoshoot from '../assets/images/photos/press_photoshoot.jpg';

interface PressItem {
  image: string;
  alt: string;
  title: string;
  position: string;
  mobilePosition: string;
  fit: 'cover' | 'contain';
  url: string;
  backgroundColor?: string;
}

export function Press() {
  const [lightboxImage, setLightboxImage] = useState<PressItem | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const pressItems = useMemo(
    () => [
      {
        image: wiredMagazine,
        alt: 'Wired Magazine - Xbox Cloud Gaming',
        title: 'Wired',
        position: 'left center',
        mobilePosition: 'left top',
        fit: 'cover' as const,
        url: 'https://www.wired.com/story/xbox-cloud-gaming-exclusive/',
      },
      {
        image: pressSocial,
        alt: 'TechRadar - Project xCloud prototype controllers',
        title: 'TechRadar',
        position: 'top',
        mobilePosition: 'top',
        backgroundColor: 'white',
        fit: 'contain' as const,
        url: 'https://www.techradar.com/news/prototype-xbox-controllers-for-phones-and-tablets-show-up-in-research-papers',
      },
      {
        image: xcloudBooth,
        alt: 'GeekWire - Project xCloud',
        title: 'GeekWire',
        position: 'center',
        mobilePosition: 'top',
        fit: 'cover' as const,
        url: 'https://www.geekwire.com/2019/microsoft-will-bring-project-xcloud-game-streaming-service-windows-10-pcs/',
      },
      {
        image: pressPhotoshoot,
        alt: 'Microsoft Blog - Project xCloud announcement',
        title: 'Microsoft Blog',
        position: 'center 15%',
        mobilePosition: 'top',
        fit: 'cover' as const,
        url: 'https://blogs.microsoft.com/blog/2018/10/08/project-xcloud-gaming-with-you-at-the-center/',
      },
    ],
    []
  );

  const handleImageClick = useCallback((item: PressItem) => {
    setLightboxImage(item);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setLightboxImage(null);
  }, []);

  return (
    <>
      <section
        id="press"
        className="scroll-mt-nav border-t border-line pt-12 lg:pt-16"
        aria-label="Press coverage"
      >
        <div className="container-spec pb-6 sm:pb-8">
          <SectionHeader>Press</SectionHeader>
        </div>
        <div className="container-spec pb-12 lg:pb-16">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {pressItems.map((item, index) => (
              <figure key={item.title} className="group border border-line">
                <button
                  className="block w-full cursor-pointer overflow-hidden"
                  style={{ backgroundColor: item.backgroundColor || '#161917' }}
                  onClick={() => handleImageClick(item)}
                  aria-label={`View full image: ${item.alt}`}
                >
                  <img
                    src={item.image}
                    alt=""
                    role="presentation"
                    className={`h-40 w-full sm:h-56 xl:h-64 ${item.fit === 'contain' ? 'object-contain' : 'object-cover'} transition-opacity duration-300 group-hover:opacity-90`}
                    style={{ objectPosition: isMobile ? item.mobilePosition : item.position }}
                    loading="lazy"
                  />
                </button>
                <figcaption className="flex flex-col gap-1 border-t border-line px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint sm:flex-row sm:items-baseline sm:justify-between sm:gap-2">
                  <span>
                    Fig. {String(index + 2).padStart(2, '0')} — {item.title}
                  </span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whitespace-nowrap text-ink-muted transition-colors hover:text-accent focus-visible:text-accent"
                  >
                    Read ↗
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        image={lightboxImage?.image}
        alt={lightboxImage?.alt}
        isOpen={!!lightboxImage}
        onClose={handleCloseLightbox}
      />
    </>
  );
}
