document.addEventListener('DOMContentLoaded', () => {
  // 1. Letter-by-letter Wordmark Reveal
  const wordmarks = document.querySelectorAll('.wordmark-title');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  wordmarks.forEach((wordmark) => {
    const text = wordmark.getAttribute('data-wordmark') || wordmark.textContent.trim();
    wordmark.textContent = ''; // clear original text

    Array.from(text).forEach((char, index) => {
      const span = document.createElement('span');
      span.className = 'letter';
      span.textContent = char === ' ' ? '\u00A0' : char;

      if (!prefersReducedMotion) {
        span.style.animationDelay = `${0.05 + index * 0.04}s`;
      } else {
        span.style.opacity = '1';
        span.style.transform = 'none';
      }

      wordmark.appendChild(span);
    });
  });

  // 2. IntersectionObserver for Scroll Reveals
  const scrollReveals = document.querySelectorAll('.reveal-on-scroll');
  if (scrollReveals.length > 0) {
    if ('IntersectionObserver' in window && !prefersReducedMotion) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );

      scrollReveals.forEach((el) => observer.observe(el));
    } else {
      scrollReveals.forEach((el) => el.classList.add('visible'));
    }
  }

  // 3. Highlight Active Navigation Link Automatically & Scroll Into View on Mobile
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (
      href === currentPath ||
      (currentPath === '' && href === 'index.html') ||
      (currentPath === 'index.html' && href === 'index.html')
    ) {
      link.classList.add('active');
      // Scroll active link smoothly into view on mobile touch devices
      setTimeout(() => {
        link.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }, 100);
    }
  });
});
