import { useEffect } from 'react';

export function useGlobalScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target); // Run once
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const observeElements = () => {
      document.querySelectorAll('.scroll-animate:not(.show)').forEach((el) => {
        observer.observe(el);
      });
    };

    // Initial check
    observeElements();

    // Re-check when DOM changes (e.g., dynamic data loading)
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });
    
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
