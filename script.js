// Shopping Site - Clean JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== Search Form =====
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                console.log('Search:', query);
            }
        });
    }

    // ===== Banner Slider =====
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.banner-dots .dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            dots[i].classList.remove('active');
        });
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function startAutoRotate() {
        slideInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoRotate() {
        clearInterval(slideInterval);
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopAutoRotate();
            startAutoRotate();
        });
    });

    // Touch swipe for banner
    const bannerSlider = document.querySelector('.banner-slider');
    let touchStartX = 0;
    let touchEndX = 0;

    if (bannerSlider) {
        bannerSlider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        bannerSlider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    const prev = (currentSlide - 1 + slides.length) % slides.length;
                    showSlide(prev);
                }
                stopAutoRotate();
                startAutoRotate();
            }
        }

        bannerSlider.addEventListener('mouseenter', stopAutoRotate);
        bannerSlider.addEventListener('mouseleave', startAutoRotate);
    }

    startAutoRotate();

    // ===== Go to Top Button =====
    const goTopBtn = document.querySelector('.go-top');
    
    function toggleGoTop() {
        if (window.pageYOffset > 300) {
            goTopBtn.classList.add('visible');
        } else {
            goTopBtn.classList.remove('visible');
        }
    }

    if (goTopBtn) {
        window.addEventListener('scroll', toggleGoTop);
        goTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== Debounce Scroll =====
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    const debouncedScroll = debounce(toggleGoTop, 100);
    window.addEventListener('scroll', debouncedScroll);

    // ===== Image Lazy Loading =====
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    imageObserver.unobserve(entry.target);
                }
            });
        });

        images.forEach(img => {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            imageObserver.observe(img);
        });
    }

    console.log('Shopping Site Loaded');
});
