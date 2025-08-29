import { useEffect, useRef } from 'react';

import s from './lazyImagesLoading.module.scss';

export const LazyImagesLoading = () => {
  const imgContainerRef = useRef<HTMLDivElement>(null);

  const callback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.src || '';
        observer.unobserve(img);
      }
    });
  };

  useEffect(() => {
    if (!imgContainerRef.current) return;

    const observer = new IntersectionObserver(callback, {
      root: imgContainerRef.current,
      rootMargin: '0px',
      threshold: 0.5,
    });

    const images = imgContainerRef.current.querySelectorAll('img[data-src]');

    images.forEach((img) => observer.observe(img));

    return () => observer.disconnect();
  }, []);

  return (
    <div className={s.taskContainer} ref={imgContainerRef}>
      <h2>Lazy images loading</h2>
      <div className={s.imagesContainer}>
        {Array.from({ length: 3 }).map((_, i) => (
          <img
            alt={`cat picture ${i + 1}`}
            className={s.image}
            data-src={`images/img-${i + 1}.jpg`}
            key={i}
            src={'images/placeholder.png'}
          />
        ))}
      </div>
    </div>
  );
};
