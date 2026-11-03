// Hero Spotlight Carousel Functionality
(function initHeroSpotlightCarousel() {
    function setupCarousel() {
        const carousel = document.getElementById('hero-spotlight-carousel');
        if (!carousel) return;

        const slides = carousel.querySelectorAll('.hero-spotlight-slide');
        const dots = carousel.querySelectorAll('.hero-carousel-dot');
        const prevBtn = document.getElementById('hero-carousel-prev');
        const nextBtn = document.getElementById('hero-carousel-next');
        const counter = document.getElementById('hero-carousel-counter');
        const progressBar = document.getElementById('hero-carousel-progress');

        if (!slides.length) return;

        let currentIndex = 0;
        const totalSlides = slides.length;
        const slideDuration = 5000; // 5 seconds
        const stepInterval = 50; // update progress every 50ms
        let elapsed = 0;
        let timer = null;
        let isPaused = false;

        function updateSlide(newIndex) {
            // Outgoing slide
            slides[currentIndex].classList.remove('opacity-100');
            slides[currentIndex].classList.add('opacity-0');
            setTimeout(() => {
                slides[currentIndex].classList.add('hidden');
                
                // Incoming slide
                currentIndex = (newIndex + totalSlides) % totalSlides;
                slides[currentIndex].classList.remove('hidden');
                // Trigger reflow for opacity transition
                void slides[currentIndex].offsetWidth;
                slides[currentIndex].classList.remove('opacity-0');
                slides[currentIndex].classList.add('opacity-100');

                // Update counter
                if (counter) counter.textContent = currentIndex + 1;

                // Update dots
                dots.forEach((dot, idx) => {
                    if (idx === currentIndex) {
                        dot.className = 'hero-carousel-dot w-8 h-3 rounded-full bg-brand-500 transition-all duration-300';
                    } else {
                        dot.className = 'hero-carousel-dot w-3 h-3 rounded-full bg-slate-600 hover:bg-slate-400 transition-all duration-300';
                    }
                });
            }, 250);

            // Reset progress
            elapsed = 0;
            if (progressBar) progressBar.style.width = '0%';
        }

        function startTimer() {
            if (timer) clearInterval(timer);
            timer = setInterval(() => {
                if (!isPaused) {
                    elapsed += stepInterval;
                    const pct = Math.min((elapsed / slideDuration) * 100, 100);
                    if (progressBar) progressBar.style.width = pct + '%';

                    if (elapsed >= slideDuration) {
                        updateSlide(currentIndex + 1);
                    }
                }
            }, stepInterval);
        }

        // Navigation button listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                updateSlide(currentIndex + 1);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                updateSlide(currentIndex - 1);
            });
        }

        // Dot button listeners
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const targetIdx = parseInt(e.currentTarget.dataset.slideTarget, 10);
                if (!isNaN(targetIdx) && targetIdx !== currentIndex) {
                    updateSlide(targetIdx);
                }
            });
        });

        // Pause on mouse hover / touch
        carousel.addEventListener('mouseenter', () => { isPaused = true; });
        carousel.addEventListener('mouseleave', () => { isPaused = false; });
        carousel.addEventListener('touchstart', () => { isPaused = true; }, { passive: true });
        carousel.addEventListener('touchend', () => { isPaused = false; }, { passive: true });

        // Touch swipe gestures
        let touchStartX = 0;
        let touchEndX = 0;
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeDiff = touchEndX - touchStartX;
            if (Math.abs(swipeDiff) > 50) {
                if (swipeDiff < 0) {
                    // Swiped Left -> Next
                    updateSlide(currentIndex + 1);
                } else {
                    // Swiped Right -> Prev
                    updateSlide(currentIndex - 1);
                }
            }
        }

        startTimer();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupCarousel);
    } else {
        setupCarousel();
    }
})();
