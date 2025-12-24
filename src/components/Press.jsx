import React, { useState, useMemo, useCallback } from 'react';
import { ExternalLink } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { FadeIn } from './FadeIn';
import { Lightbox } from './Lightbox';
import wiredMagazine from '../assets/images/photos/wired_magazine.png';
import wiredLogo from '../assets/images/photos/wired_logo.png';
import msftLogo from '../assets/images/photos/msft_logo.png';
import techradarLogo from '../assets/images/photos/techradar_logo.png';
import geekwireLogo from '../assets/images/photos/geekwire.png';
import pressSocial from '../assets/images/photos/press_social.png';
import xcloudBooth from '../assets/images/photos/xcloud_booth.jpeg';
import pressPhotoshoot from '../assets/images/photos/press_photoshoot.jpg';

export function Press() {
  const [lightboxImage, setLightboxImage] = useState(null);

  const pressItems = useMemo(() => [
    { image: wiredMagazine, alt: "Wired Magazine - Xbox Cloud Gaming", title: "Wired", logo: wiredLogo, position: "left center", fit: "cover", url: "https://www.wired.com/story/xbox-cloud-gaming-exclusive/" },
    { image: pressSocial, alt: "Microsoft Blog - Project xCloud", title: "TechRadar", logo: techradarLogo, position: "top", background_color: "white", fit: "contain", url: "https://www.techradar.com/news/prototype-xbox-controllers-for-phones-and-tablets-show-up-in-research-papers" },
    { image: xcloudBooth, alt: "GeekWire - Project xCloud", title: "GeekWire", logo: geekwireLogo, position: "center", fit: "cover", url: "https://www.geekwire.com/2019/microsoft-will-bring-project-xcloud-game-streaming-service-windows-10-pcs/" },
    { image: pressPhotoshoot, alt: "Microsoft marketing photoshoot", title: "Microsoft Blog", logo: msftLogo, position: "center 15%", fit: "cover", url: "https://blogs.microsoft.com/blog/2018/10/08/project-xcloud-gaming-with-you-at-the-center/" },
  ], []);

  const handleImageClick = useCallback((item) => {
    setLightboxImage(item);
  }, []);

  const handleTitleClick = useCallback((url, e) => {
    e.stopPropagation();
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setLightboxImage(null);
  }, []);

  return (
    <>
      <section className="py-12 lg:py-16 px-4 sm:px-6" aria-label="Press coverage">
        <div className="max-w-5xl mx-auto">
          <SectionHeader>Press</SectionHeader>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {pressItems.map((item, index) => (
              <FadeIn key={index} delay={index * 100}>
                <div className="flex flex-col gap-2">
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-slate-300 hover:text-teal-400 focus-visible:text-teal-400 transition-colors flex items-center gap-1.5"
                      onClick={(e) => handleTitleClick(item.url, e)}
                    >
                      {item.logo ? (
                        <img src={item.logo} alt={item.title} className="h-5 object-contain" loading="lazy" />
                      ) : (
                        item.title
                      )}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <div className="text-sm font-medium text-slate-300">
                      {item.logo ? (
                        <img src={item.logo} alt={item.title} className="h-5 object-contain" loading="lazy" />
                      ) : (
                        item.title
                      )}
                    </div>
                  )}
                  <button
                    className="relative rounded-xl border-2 border-slate-800 hover:border-teal-400 focus-visible:border-teal-400 group cursor-pointer overflow-hidden transition-colors w-full"
                    style={{ backgroundColor: item.background_color || '#0f172a' }}
                    onClick={() => handleImageClick(item)}
                    aria-label={`View full image: ${item.alt}`}
                  >
                    <img
                      src={item.image}
                      alt=""
                      role="presentation"
                      className={`w-full h-56 object-${item.fit} transition-all duration-500`}
                      style={{ objectPosition: item.position }}
                      loading="lazy"
                    />
                  </button>
                </div>
              </FadeIn>
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
